# About

This document describes the design of the quiz feature for AlgoPatterns. It covers the motivation, architecture, data model, and implementation considerations for adding knowledge-testing quizzes at the end of each pattern tutorial section. This is a living document and may be updated as the implementation evolves.

# Overview

AlgoPatterns is an educational platform for learning algorithm patterns through code templates, insights, and tutorials. The primary design goals for the quiz feature are **knowledge retention**, **engagement**, and **progress tracking**. Users should be able to test their understanding after reading a tutorial, receive immediate feedback with explanations, and track their mastery over time.

The entry point for quizzes is the "Test Your Knowledge" card displayed at the end of each pattern tutorial section. When a user clicks "Start Quiz," a modal dialog opens presenting 15 questions covering all aspects of the pattern: conceptual understanding, code output prediction, complexity analysis, bug identification, and pattern recognition. Each question includes a detailed explanation shown after the user answers, reinforcing learning through immediate feedback.

Quizzes are stored in CockroachDB with a three-table structure: `quiz_questions` stores the question bank, `quiz_attempts` tracks each quiz session, and `quiz_responses` stores individual question responses. This separation allows for detailed analytics while keeping queries efficient. Users can retake quizzes unlimited times, with each attempt recorded separately for progress tracking.

AlgoPatterns achieves knowledge retention:
- Questions cover multiple cognitive levels: recall, comprehension, application, and analysis
- Immediate explanations reinforce correct understanding and correct misconceptions
- Spaced repetition opportunities through unlimited retakes
- Visual feedback (correct/incorrect indicators) creates memorable learning moments

AlgoPatterns achieves engagement:
- Modal-based quiz experience creates focused, distraction-free testing
- Progress bar shows advancement through the quiz
- Color-coded feedback (green for correct, visual states for options)
- Question variety (MCQ, true/false, code output, fill-in-blank) maintains interest

AlgoPatterns achieves progress tracking:
- Each attempt is recorded with timestamp and score
- Per-question response data enables weakness identification
- Historical scores show improvement over time
- Completion status integrates with pattern progress tracking

# Architecture

AlgoPatterns implements a layered architecture for the quiz feature. The highest level of abstraction is the React component layer (QuizModal, QuizCard), which handles user interactions and rendering. It depends on the QuizContext for state management, which communicates with the QuizService for API calls. The backend follows the standard handler-service-repository pattern used throughout the AlgoPatterns codebase.

```
┌───────────────────────────────────────────────────────────────────┐
│                       Frontend (Next.js 16)                       │
│                                                                   │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐         │
│  │  QuizCard    │    │  QuizModal   │    │    Quiz      │         │
│  │  (Trigger)   │───▶│  (Questions) │───▶│   Context    │         │
│  └──────────────┘    └──────────────┘    └──────────────┘         │
│                             │                    │                │
│                             ▼                    │                │
│                      ┌──────────────┐            │                │
│                      │   Question   │            │                │
│                      │  Components  │            │                │
│                      │ MCQ/TF/Code  │            │                │
│                      └──────────────┘            │                │
│                                                  │                │
└──────────────────────────────────────────────────┼────────────────┘
                                                   │
                                                   │ HTTPS
                                                   ▼
┌───────────────────────────────────────────────────────────────────┐
│                          Backend (Go)                             │
│                                                                   │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐         │
│  │    Quiz      │    │    Quiz      │    │    Quiz      │         │
│  │   Handler    │───▶│   Service    │───▶│  Repository  │         │
│  └──────────────┘    └──────────────┘    └──────────────┘         │
│         │                                        │                │
│         ▼                                        │                │
│  ┌──────────────┐                                │                │
│  │     Auth     │                                │                │
│  │  Middleware  │                                │                │
│  │  (Optional)  │                                │                │
│  └──────────────┘                                │                │
│                                                  │                │
└──────────────────────────────────────────────────┼────────────────┘
                                                   │
                                                   │ SQL
                                                   ▼
                        ┌─────────────────────────────────────┐
                        │            CockroachDB              │
                        │                                     │
                        │  ┌─────────────┐  ┌──────────────┐  │
                        │  │    quiz     │  │    quiz      │  │
                        │  │  questions  │  │   attempts   │  │
                        │  └─────────────┘  └──────────────┘  │
                        │           ┌──────────────┐          │
                        │           │    quiz      │          │
                        │           │  responses   │          │
                        │           └──────────────┘          │
                        └─────────────────────────────────────┘
```

The QuizCard component appears at the end of each pattern tutorial section, showing a "Test Your Knowledge" prompt with the question count. When clicked, it triggers the QuizModal which fetches questions and manages the quiz session.

The QuizModal is the primary quiz interface. It displays one question at a time with:
- Progress bar at the top showing completion percentage
- Question counter ("Question 2 of 15")
- Flag button for bookmarking questions to review
- Question text with optional code snippet
- Answer options (varies by question type)
- Explanation panel (shown after answering)
- Navigation buttons (Back, Next Question)

The QuizContext maintains quiz state including current question index, user answers, and timing. It handles API communication for fetching questions and submitting responses.

# Question Types

The quiz system supports multiple question types to test different aspects of understanding:

| Type | Description | UI Rendering |
|------|-------------|--------------|
| `multiple-choice` | Standard 4-option MCQ | Radio buttons with numbered options |
| `true-false` | Binary true/false statement | Two large buttons |
| `code-output` | Predict the output of code | Code block + 4 options |
| `fill-blank` | Complete missing code/text | Text input with validation |
| `identify-bug` | Find the bug in code | Code block + 4 descriptions |
| `code-trace` | Track variable state through execution | Code block + state options |
| `ordering` | Arrange items in correct order | Drag-and-drop or numbered selection |

Each question type has a corresponding React component that handles rendering and answer validation:

```typescript
interface BaseQuestion {
  id: string;
  type: QuestionType;
  difficulty: 'easy' | 'medium' | 'hard';
  questionText: string;
  codeSnippet?: string;
  explanation: string;
  displayOrder: number;
}

interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice' | 'code-output' | 'identify-bug' | 'code-trace';
  options: string[];
  correctAnswer: number; // Index of correct option
}

interface TrueFalseQuestion extends BaseQuestion {
  type: 'true-false';
  correctAnswer: boolean;
}

interface FillBlankQuestion extends BaseQuestion {
  type: 'fill-blank';
  correctAnswer: string;
  acceptableAnswers?: string[]; // Alternative accepted answers
}

interface OrderingQuestion extends BaseQuestion {
  type: 'ordering';
  options: string[];
  correctOrder: number[]; // Indices in correct order
}
```

# Quiz Flow

The quiz follows a linear flow with immediate feedback:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Quiz Card     │────▶│   Start Quiz    │────▶│  Question 1/15  │
│ "Start Quiz"    │     │  Fetch Questions│     │  Display MCQ    │
└─────────────────┘     └─────────────────┘     └────────┬────────┘
                                                         │
                                                         ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ Question 2/15   │◀────│  Show Answer    │◀────│  User Selects   │
│ Auto-advance or │     │  + Explanation  │     │  an Option      │
│ Next button     │     │  Correct/Wrong  │     │                 │
└────────┬────────┘     └─────────────────┘     └─────────────────┘
         │
         ▼ (repeat for all questions)
         
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Quiz Complete  │────▶│  Save Results   │────▶│  Results View   │
│  All answered   │     │  to Database    │     │  Score + Review │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

**Key behaviors:**
1. Questions are shown one at a time (not paginated list)
2. After selecting an answer, immediate feedback is shown (correct/incorrect + explanation)
3. User can navigate back to review previous answers (read-only)
4. "Next Question" button advances to the next unanswered question
5. Quiz can be closed and resumed (state saved in context)
6. On completion, results are saved and summary is shown

# Data Model

The quiz data model uses three tables to separate concerns: questions, attempts, and responses.

```sql
-- Quiz questions bank
CREATE TABLE IF NOT EXISTS quiz_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- Content association
    pattern_id VARCHAR(50) NOT NULL,           -- e.g., 'stack', 'two-pointers'
    section_slug VARCHAR(100),                 -- e.g., 'fundamentals', null for pattern-wide
    
    -- Question content
    question_type VARCHAR(20) NOT NULL 
        CHECK (question_type IN ('multiple-choice', 'true-false', 'code-output', 
                                  'fill-blank', 'identify-bug', 'code-trace', 'ordering')),
    difficulty VARCHAR(10) NOT NULL 
        CHECK (difficulty IN ('easy', 'medium', 'hard')),
    question_text TEXT NOT NULL,
    code_snippet TEXT,                         -- Optional code block
    
    -- Answer data (JSON for flexibility across question types)
    options JSONB,                             -- Array of option strings
    correct_answer JSONB NOT NULL,             -- Index, boolean, string, or array depending on type
    acceptable_answers JSONB,                  -- Alternative correct answers for fill-blank
    
    -- Feedback
    explanation TEXT NOT NULL,
    
    -- Ordering and metadata
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for fetching questions by pattern/section
CREATE INDEX idx_quiz_questions_pattern 
    ON quiz_questions(pattern_id, section_slug, is_active, display_order);

-- Quiz attempts (one per quiz session)
CREATE TABLE IF NOT EXISTS quiz_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,  -- Nullable for anonymous users
    
    -- Quiz identification
    pattern_id VARCHAR(50) NOT NULL,
    section_slug VARCHAR(100),
    
    -- Attempt metadata
    total_questions INT NOT NULL,
    correct_count INT NOT NULL DEFAULT 0,
    score_percentage DECIMAL(5, 2),            -- Calculated: (correct/total) * 100
    
    -- Timing
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    time_taken_seconds INT,                    -- Total time in seconds
    
    -- Status
    status VARCHAR(20) NOT NULL DEFAULT 'in_progress'
        CHECK (status IN ('in_progress', 'completed', 'abandoned')),
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for user's quiz history
CREATE INDEX idx_quiz_attempts_user 
    ON quiz_attempts(user_id, pattern_id, created_at DESC);

-- Individual question responses
CREATE TABLE IF NOT EXISTS quiz_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    attempt_id UUID NOT NULL REFERENCES quiz_attempts(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
    
    -- Response data
    selected_answer JSONB NOT NULL,            -- User's answer (index, boolean, string, etc.)
    is_correct BOOLEAN NOT NULL,
    
    -- Timing
    time_taken_ms INT,                         -- Time spent on this question
    
    -- Metadata
    answered_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    UNIQUE(attempt_id, question_id)
);

-- Index for analyzing question difficulty
CREATE INDEX idx_quiz_responses_question 
    ON quiz_responses(question_id, is_correct);
```

**Design decisions:**

1. **Nullable user_id**: Allows anonymous users to take quizzes. Results are saved but not associated with an account. If the user later signs in, we could offer to associate anonymous attempts.

2. **Separate attempts and responses**: Allows tracking both session-level metrics (total score, time) and question-level analytics (which questions are hardest).

3. **JSONB for answers**: Different question types have different answer formats (integer index, boolean, string, array). JSONB provides flexibility without schema changes.

4. **section_slug nullable**: Allows pattern-wide quizzes in addition to section-specific ones.

5. **is_active flag**: Soft-delete for questions allows removing outdated questions without losing response history.

# API Design

The quiz API follows REST conventions and is consistent with the existing AlgoPatterns API style. Most endpoints work for both authenticated and anonymous users.

**Get Quiz Questions**

```
GET /api/v1/quiz/questions/{pattern_id}?section={section_slug}
```

Returns all active questions for a pattern (optionally filtered by section). Questions are returned in `display_order` with correct answers excluded.

Response:
```json
{
  "success": true,
  "data": {
    "pattern_id": "stack",
    "section_slug": "fundamentals",
    "total_questions": 15,
    "questions": [
      {
        "id": "uuid-1",
        "type": "multiple-choice",
        "difficulty": "easy",
        "question_text": "What does LIFO stand for?",
        "options": ["Last In, First Out", "Last In, Final Out", ...],
        "display_order": 1
      },
      ...
    ]
  }
}
```

**Start Quiz Attempt**

```
POST /api/v1/quiz/attempts
Content-Type: application/json
Authorization: Bearer <token>  (optional)

{
  "pattern_id": "stack",
  "section_slug": "fundamentals",
  "total_questions": 15
}
```

Creates a new attempt record and returns the attempt ID. For anonymous users, the attempt is created without a user_id.

Response:
```json
{
  "success": true,
  "data": {
    "attempt_id": "uuid-attempt-1",
    "started_at": "2026-05-17T10:00:00Z"
  }
}
```

**Submit Question Response**

```
POST /api/v1/quiz/attempts/{attempt_id}/responses
Content-Type: application/json

{
  "question_id": "uuid-1",
  "selected_answer": 0,
  "time_taken_ms": 5200
}
```

Validates the answer against the correct answer and returns feedback.

Response:
```json
{
  "success": true,
  "data": {
    "is_correct": true,
    "correct_answer": 0,
    "explanation": "LIFO means Last In, First Out - the most recently added element is removed first."
  }
}
```

**Complete Quiz Attempt**

```
PATCH /api/v1/quiz/attempts/{attempt_id}/complete
Content-Type: application/json

{
  "time_taken_seconds": 420
}
```

Marks the attempt as completed and calculates final score.

Response:
```json
{
  "success": true,
  "data": {
    "attempt_id": "uuid-attempt-1",
    "total_questions": 15,
    "correct_count": 12,
    "score_percentage": 80.00,
    "time_taken_seconds": 420,
    "completed_at": "2026-05-17T10:07:00Z"
  }
}
```

**Get User Quiz History**

```
GET /api/v1/quiz/attempts?pattern_id={pattern_id}&limit=10
Authorization: Bearer <token>
```

Returns paginated list of user's quiz attempts for a pattern.

Response:
```json
{
  "success": true,
  "data": {
    "attempts": [
      {
        "id": "uuid-attempt-1",
        "pattern_id": "stack",
        "section_slug": "fundamentals",
        "score_percentage": 80.00,
        "completed_at": "2026-05-17T10:07:00Z"
      },
      ...
    ],
    "best_score": 93.33,
    "total_attempts": 3
  }
}
```

**Get Question Analytics (Admin)**

```
GET /api/v1/quiz/analytics/questions/{question_id}
Authorization: Bearer <admin_token>
```

Returns analytics for a specific question (correct rate, average time, etc.).

# Frontend Implementation

The frontend implementation centers on three key components: `QuizCard`, `QuizModal`, and question-type-specific components.

**QuizCard Component**

The QuizCard appears at the end of each tutorial section, prompting users to test their knowledge.

```tsx
interface QuizCardProps {
  patternId: string;
  sectionSlug?: string;
  questionCount: number;
}

function QuizCard({ patternId, sectionSlug, questionCount }: QuizCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <div className="bg-gradient-to-r from-teal-900/30 to-teal-800/30 
                      rounded-xl border border-teal-700/30 p-6 mt-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-teal-900/50 
                            flex items-center justify-center">
              <QuestionMarkIcon className="w-6 h-6 text-teal-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                Test Your Knowledge
              </h3>
              <p className="text-gray-400 text-sm">
                Take a quick {questionCount} question quiz to test what you've learned.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 
                       hover:bg-teal-500 text-white rounded-full font-medium
                       transition-colors"
          >
            <EditIcon className="w-4 h-4" />
            Start Quiz
          </button>
        </div>
      </div>
      
      <QuizModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        patternId={patternId}
        sectionSlug={sectionSlug}
      />
    </>
  );
}
```

**QuizModal Component**

The QuizModal is the primary quiz interface, managing question navigation and state.

```tsx
interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  patternId: string;
  sectionSlug?: string;
}

function QuizModal({ isOpen, onClose, patternId, sectionSlug }: QuizModalProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Map<string, Answer>>(new Map());
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch questions and start attempt on mount
  useEffect(() => {
    if (!isOpen) return;
    
    const initQuiz = async () => {
      setIsLoading(true);
      const [questionsRes, attemptRes] = await Promise.all([
        quizService.getQuestions(patternId, sectionSlug),
        quizService.startAttempt(patternId, sectionSlug)
      ]);
      setQuestions(questionsRes.questions);
      setAttemptId(attemptRes.attempt_id);
      setIsLoading(false);
    };
    
    initQuiz();
  }, [isOpen, patternId, sectionSlug]);
  
  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const hasAnswered = answers.has(currentQuestion?.id);
  
  const handleAnswer = async (answer: any) => {
    if (!attemptId || !currentQuestion) return;
    
    const startTime = Date.now();
    const response = await quizService.submitResponse(attemptId, {
      question_id: currentQuestion.id,
      selected_answer: answer,
      time_taken_ms: Date.now() - startTime
    });
    
    setAnswers(prev => new Map(prev).set(currentQuestion.id, {
      selected: answer,
      isCorrect: response.is_correct,
      correctAnswer: response.correct_answer,
      explanation: response.explanation
    }));
    
    setShowExplanation(true);
  };
  
  const handleNext = () => {
    setShowExplanation(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Quiz complete - show results
      completeQuiz();
    }
  };
  
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-xl w-full max-w-2xl max-h-[90vh] 
                        overflow-hidden flex flex-col">
          {/* Progress bar */}
          <div className="h-1 bg-gray-800">
            <div 
              className="h-full bg-teal-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <span className="text-teal-400 font-medium">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-white">
                <FlagIcon className="w-5 h-5" />
              </button>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-white">
                <XIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Question content */}
          <div className="flex-1 overflow-y-auto p-6">
            {currentQuestion && (
              <QuestionRenderer
                question={currentQuestion}
                answer={answers.get(currentQuestion.id)}
                onAnswer={handleAnswer}
                disabled={hasAnswered}
              />
            )}
            
            {/* Explanation panel */}
            {showExplanation && answers.get(currentQuestion?.id) && (
              <ExplanationPanel 
                answer={answers.get(currentQuestion.id)!}
              />
            )}
          </div>
          
          {/* Footer navigation */}
          <div className="flex items-center justify-between p-4 border-t border-gray-800">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 px-4 py-2 text-gray-400 
                         hover:text-white disabled:opacity-50"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back
            </button>
            
            {hasAnswered && (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 
                           hover:bg-teal-500 text-white rounded-lg font-medium"
              >
                {currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
                <ArrowRightIcon className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
}
```

**Question Renderer Components**

Each question type has a dedicated component for rendering.

```tsx
function MultipleChoiceQuestion({ 
  question, 
  answer, 
  onAnswer, 
  disabled 
}: QuestionProps) {
  return (
    <div className="space-y-4">
      <p className="text-lg text-white">{question.questionText}</p>
      
      {question.codeSnippet && (
        <pre className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
          <code>{question.codeSnippet}</code>
        </pre>
      )}
      
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = answer?.selected === index;
          const isCorrect = answer?.correctAnswer === index;
          const showResult = answer !== undefined;
          
          return (
            <button
              key={index}
              onClick={() => !disabled && onAnswer(index)}
              disabled={disabled}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all",
                !showResult && "border-gray-700 hover:border-gray-600",
                showResult && isCorrect && "border-green-500 bg-green-500/10",
                showResult && isSelected && !isCorrect && "border-red-500 bg-red-500/10",
                showResult && !isSelected && !isCorrect && "border-gray-700 opacity-60"
              )}
            >
              <span className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium",
                !showResult && "bg-gray-800 text-gray-400",
                showResult && isCorrect && "bg-green-500 text-white",
                showResult && isSelected && !isCorrect && "bg-red-500 text-white"
              )}>
                {index + 1}
              </span>
              <span className="flex-1 text-white">{option}</span>
              {showResult && isCorrect && (
                <CheckIcon className="w-5 h-5 text-green-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TrueFalseQuestion({ question, answer, onAnswer, disabled }: QuestionProps) {
  return (
    <div className="space-y-6">
      <p className="text-lg text-white">{question.questionText}</p>
      
      <div className="grid grid-cols-2 gap-4">
        {[true, false].map((value, index) => {
          const isSelected = answer?.selected === value;
          const isCorrect = answer?.correctAnswer === value;
          const showResult = answer !== undefined;
          
          return (
            <button
              key={String(value)}
              onClick={() => !disabled && onAnswer(value)}
              disabled={disabled}
              className={cn(
                "flex items-center gap-3 p-4 rounded-xl border-2 transition-all",
                !showResult && "border-gray-700 hover:border-gray-600",
                showResult && isCorrect && "border-green-500 bg-green-500/10",
                showResult && isSelected && !isCorrect && "border-red-500 bg-red-500/10"
              )}
            >
              <span className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center text-sm",
                "bg-gray-800 text-gray-400"
              )}>
                {index + 1}
              </span>
              <span className="text-white font-medium">
                {value ? 'True' : 'False'}
              </span>
              {showResult && isSelected && (
                isCorrect 
                  ? <CheckIcon className="w-5 h-5 text-green-500 ml-auto" />
                  : <XIcon className="w-5 h-5 text-red-500 ml-auto" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

**Explanation Panel**

Shows feedback after answering:

```tsx
function ExplanationPanel({ answer }: { answer: Answer }) {
  return (
    <div className={cn(
      "mt-6 p-4 rounded-xl",
      answer.isCorrect 
        ? "bg-green-900/30 border border-green-700/30"
        : "bg-red-900/30 border border-red-700/30"
    )}>
      <div className="flex items-center gap-2 mb-2">
        {answer.isCorrect ? (
          <>
            <CheckCircleIcon className="w-5 h-5 text-green-400" />
            <span className="font-medium text-green-400">Correct!</span>
          </>
        ) : (
          <>
            <XCircleIcon className="w-5 h-5 text-red-400" />
            <span className="font-medium text-red-400">Incorrect</span>
          </>
        )}
      </div>
      <p className="text-gray-300">{answer.explanation}</p>
    </div>
  );
}
```

# Quiz Results View

After completing all questions, a results summary is shown:

```tsx
function QuizResults({ 
  attempt, 
  questions, 
  answers,
  onRetake,
  onClose 
}: QuizResultsProps) {
  const correctCount = Array.from(answers.values())
    .filter(a => a.isCorrect).length;
  const percentage = (correctCount / questions.length) * 100;
  
  return (
    <div className="text-center py-8">
      {/* Score circle */}
      <div className="relative w-32 h-32 mx-auto mb-6">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-gray-800"
          />
          <circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={`${percentage * 2.83} 283`}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            className={percentage >= 70 ? "text-green-500" : "text-yellow-500"}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-white">
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-2">
        {percentage >= 80 ? 'Excellent!' : 
         percentage >= 60 ? 'Good job!' : 'Keep practicing!'}
      </h3>
      <p className="text-gray-400 mb-6">
        You got {correctCount} out of {questions.length} questions correct
      </p>
      
      {/* Action buttons */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={onRetake}
          className="px-6 py-2.5 border border-gray-600 text-white 
                     rounded-lg hover:bg-gray-800 transition-colors"
        >
          Retake Quiz
        </button>
        <button
          onClick={onClose}
          className="px-6 py-2.5 bg-teal-600 text-white rounded-lg 
                     hover:bg-teal-500 transition-colors"
        >
          Continue Learning
        </button>
      </div>
      
      {/* Question review list */}
      <div className="mt-8 text-left">
        <h4 className="text-sm font-medium text-gray-400 mb-4">
          Review your answers
        </h4>
        <div className="space-y-2">
          {questions.map((q, i) => {
            const answer = answers.get(q.id);
            return (
              <button
                key={q.id}
                onClick={() => scrollToQuestion(i)}
                className="w-full flex items-center gap-3 p-3 rounded-lg
                           bg-gray-800/50 hover:bg-gray-800 transition-colors"
              >
                <span className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-xs",
                  answer?.isCorrect ? "bg-green-500" : "bg-red-500"
                )}>
                  {answer?.isCorrect ? '✓' : '✗'}
                </span>
                <span className="text-gray-300 text-sm truncate">
                  {q.questionText}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
```

# Anonymous User Support

Quizzes work for both authenticated and anonymous users with these differences:

| Feature | Authenticated | Anonymous |
|---------|--------------|-----------|
| Take quiz | Yes | Yes |
| See immediate feedback | Yes | Yes |
| Save attempt to DB | Yes (with user_id) | Yes (user_id = null) |
| View quiz history | Yes | No (lost on page refresh) |
| Track progress across sessions | Yes | No |
| Associate with account later | N/A | Planned |

For anonymous users, we store attempts in localStorage as a fallback and persist to the database without a user_id. This allows:
1. Quiz analytics to include all attempts (for question quality metrics)
2. Potential future "claim your progress" flow when signing up

```typescript
// Store anonymous attempt locally
const saveAnonymousAttempt = (attempt: AttemptResult) => {
  const stored = localStorage.getItem('anonymousQuizAttempts') || '[]';
  const attempts = JSON.parse(stored);
  attempts.push({
    ...attempt,
    savedAt: Date.now()
  });
  // Keep last 20 attempts
  localStorage.setItem(
    'anonymousQuizAttempts', 
    JSON.stringify(attempts.slice(-20))
  );
};
```

# Progress Integration

Quiz completion integrates with the existing pattern progress tracking:

```typescript
// In ProgressContext
const updatePatternProgress = (patternId: string, sectionSlug: string) => {
  // Existing section completion logic
  // ...
  
  // Add quiz completion bonus
  const quizScore = getLatestQuizScore(patternId, sectionSlug);
  if (quizScore !== null) {
    // Section is "mastered" if quiz score >= 80%
    if (quizScore >= 80) {
      markSectionMastered(patternId, sectionSlug);
    }
  }
};
```

The progress indicator can show:
- Section read (checkmark)
- Quiz attempted (quiz icon)
- Section mastered (star) - read + quiz score >= 80%

# Security Considerations

**Answer Validation**: All answer validation happens server-side. The frontend never receives correct answers until after submission. This prevents cheating by inspecting network requests.

```go
// Handler: Submit Response
func (h *QuizHandler) SubmitResponse(c *gin.Context) {
    // Validate attempt exists and belongs to user (if authenticated)
    // Fetch question from DB (includes correct_answer)
    // Compare submitted answer with correct_answer
    // Return is_correct + explanation
}
```

**Rate Limiting**: Quiz submission endpoints are rate-limited to prevent brute-force answer guessing:
- 60 responses per minute per IP
- 10 new attempts per hour per user

**Input Validation**: All inputs are validated:
- `pattern_id` must match existing pattern
- `question_id` must exist and be active
- `selected_answer` type must match question type

**No Answer Leakage**: Questions endpoint excludes `correct_answer` and `explanation` fields. These are only returned after submitting a response.

# Performance Considerations

**Question Loading**: Questions are fetched once when the quiz modal opens. With 15-20 questions per quiz, this is a single small request (~5KB).

**Response Submission**: Each answer submission is a lightweight request. Responses are processed immediately with minimal database operations (single insert + single select).

**Caching**: Questions can be cached aggressively since they change infrequently:
- CDN cache: 1 hour
- Browser cache: 5 minutes
- React state: Duration of quiz session

**Database**: The `idx_quiz_questions_pattern` index ensures efficient question lookup. The unique constraint on `(attempt_id, question_id)` prevents duplicate responses without additional queries.

# Analytics and Metrics

The quiz system enables several analytics capabilities:

**Question Quality Metrics**:
- Correct rate per question (identify too easy/hard questions)
- Average time per question (identify confusing questions)
- Skip rate (if implemented)

**User Learning Metrics**:
- Score improvement over retakes
- Time to completion trends
- Weak areas (topics with lowest scores)

**Platform Metrics**:
- Quiz completion rate
- Average score by pattern
- Retake rate

These will be surfaced through an admin dashboard and potentially to users as learning insights.

# Future Considerations

Several features were considered but deferred to keep the initial implementation focused:

**Adaptive Difficulty**: Adjust question difficulty based on user performance. Start with medium questions, show harder ones if doing well.

**Spaced Repetition**: Track which questions were missed and resurface them in future quizzes using SM-2 or similar algorithm.

**Timed Mode**: Add optional time limits per question or for the entire quiz to simulate interview pressure.

**Leaderboards**: Show anonymous rankings (percentile) for quiz scores. "You scored better than 75% of users."

**Question Shuffle**: Randomize question order and option order to prevent memorization on retakes.

**Fill-in-Blank Code**: More sophisticated code completion questions with syntax validation.

**Bookmarking**: Allow users to flag questions for review, creating a personal study list.

These features will be considered based on user feedback after the initial launch.

# Implementation Plan

## Phase 1: Core Quiz System (MVP)
- [ ] Database schema and migrations
- [ ] Backend: Question, Attempt, Response models
- [ ] Backend: Quiz handler with CRUD endpoints
- [ ] Frontend: QuizCard component
- [ ] Frontend: QuizModal with basic MCQ support
- [ ] Frontend: True/False question type
- [ ] Frontend: Explanation panel
- [ ] Frontend: Results view
- [ ] Seed questions for Stack pattern (15 questions)

## Phase 2: Enhanced Question Types
- [ ] Code output question type with syntax highlighting
- [ ] Identify bug question type
- [ ] Fill-in-blank question type
- [ ] Code trace question type

## Phase 3: Progress & Analytics
- [ ] User quiz history page
- [ ] Progress integration (mastery indicator)
- [ ] Admin analytics dashboard
- [ ] Question performance metrics

## Phase 4: Engagement Features
- [ ] Question shuffle option
- [ ] Timed mode
- [ ] Retake with wrong answers only
- [ ] Score trends visualization

# Files to Create

```
Frontend:
├── src/components/quiz/
│   ├── QuizCard.tsx              # Trigger card at end of tutorial
│   ├── QuizModal.tsx             # Main quiz modal container
│   ├── QuizProgress.tsx          # Progress bar component
│   ├── QuizResults.tsx           # Results summary view
│   ├── questions/
│   │   ├── QuestionRenderer.tsx  # Question type router
│   │   ├── MultipleChoice.tsx    # MCQ component
│   │   ├── TrueFalse.tsx         # True/False component
│   │   ├── CodeOutput.tsx        # Code output question
│   │   ├── FillBlank.tsx         # Fill in blank
│   │   └── ExplanationPanel.tsx  # Feedback panel
│   └── index.ts
├── src/contexts/QuizContext.tsx  # Quiz state management
├── src/lib/quizService.ts        # API client for quiz endpoints
└── src/types/quiz.ts             # TypeScript interfaces

Backend:
├── internal/handlers/quiz_handler.go
├── internal/services/quiz_service.go
├── internal/repository/quiz_repository.go
├── internal/models/quiz.go
└── migrations/
    └── 00X_create_quiz_tables.sql

Data:
└── scripts/seed/
    └── quiz_questions.json       # Initial question bank
```

# References

- [Bloom's Taxonomy](https://en.wikipedia.org/wiki/Bloom%27s_taxonomy) - For designing questions at multiple cognitive levels
- [Spaced Repetition](https://en.wikipedia.org/wiki/Spaced_repetition) - For future adaptive learning features
- [React Dialog Pattern](https://www.radix-ui.com/docs/primitives/components/dialog) - For accessible modal implementation
- [Optimistic UI](https://www.apollographql.com/blog/optimistic-ui-with-react-f8e90438e7ed) - For responsive quiz interactions
