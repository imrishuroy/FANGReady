-- Quiz Questions for Stack Pattern
-- Run this after the migration: psql -d algopatterns -f quiz_questions_stack.sql

-- Clear existing stack questions first
DELETE FROM quiz_questions WHERE pattern_id = 'stack';

-- Section: Stack Fundamentals
INSERT INTO quiz_questions (pattern_id, section_slug, question_type, difficulty, question_text, code_snippet, options, correct_answer, explanation, display_order) VALUES
('stack', NULL, 'multiple-choice', 'easy',
 'What does LIFO stand for?',
 NULL,
 '["Last In, First Out", "Last In, Final Out", "Least In, First Out", "Linear In, First Out"]',
 '0',
 'LIFO means Last In, First Out - the most recently added element is removed first, like a stack of plates.',
 1),

('stack', NULL, 'multiple-choice', 'easy',
 'Which real-world scenario best represents a stack?',
 NULL,
 '["A line of people waiting at a bank", "A pile of plates in a cafeteria", "Cars on a highway", "Books arranged alphabetically on a shelf"]',
 '1',
 'A pile of plates follows LIFO - you add and remove plates from the top only.',
 2),

('stack', NULL, 'code-output', 'easy',
 'What is the output after these operations?',
 'const stack = [];
stack.push(10);
stack.push(20);
stack.push(30);
stack.pop();
console.log(stack[stack.length - 1]);',
 '["10", "20", "30", "undefined"]',
 '1',
 'After pushing 10, 20, 30 and popping (removes 30), the top element is 20.',
 3),

('stack', NULL, 'multiple-choice', 'medium',
 'What is the time complexity of the peek() operation on a stack?',
 NULL,
 '["O(1)", "O(n)", "O(log n)", "O(n²)"]',
 '0',
 'peek() only accesses the top element without searching - constant time O(1).',
 4),

('stack', NULL, 'true-false', 'easy',
 'In a stack, elements can be removed from any position.',
 NULL,
 NULL,
 'false',
 'Stacks only allow removal from the top (LIFO). Random access removal violates the stack property.',
 5),

('stack', NULL, 'code-output', 'medium',
 'What does this code print?',
 'const stack = [1, 2, 3, 4, 5];
while (stack.length > 2) {
  console.log(stack.pop());
}',
 '["5, 4, 3", "1, 2, 3", "5, 4, 3, 2, 1", "3, 4, 5"]',
 '0',
 'pop() removes from the end: 5, then 4, then 3. Stops when length becomes 2.',
 6),

('stack', NULL, 'multiple-choice', 'medium',
 'In Java, which data structure is recommended for implementing a stack?',
 NULL,
 '["Stack<E> class", "ArrayList<E>", "Deque<E> (ArrayDeque)", "LinkedList<E> only"]',
 '2',
 'Java''s Stack class is legacy. ArrayDeque (implementing Deque) is the modern, preferred choice.',
 7),

('stack', NULL, 'multiple-choice', 'easy',
 'What happens when you call pop() on an empty stack in JavaScript?',
 NULL,
 '["Throws an error", "Returns undefined", "Returns null", "Returns 0"]',
 '1',
 'JavaScript arrays return undefined when popping from empty - no error thrown.',
 8),

('stack', NULL, 'multiple-choice', 'medium',
 'Items A, B, C, D are pushed onto a stack in that order. In what order are they popped?',
 NULL,
 '["D, C, B, A", "A, B, C, D", "A, D, C, B", "D, A, B, C"]',
 '0',
 'LIFO: Last pushed (D) comes out first, then C, B, A.',
 9),

('stack', NULL, 'code-output', 'hard',
 'What is the final state of the stack?',
 'const stack = [];
for (let i = 1; i <= 5; i++) {
  stack.push(i);
  if (i % 2 === 0) stack.pop();
}
console.log(stack);',
 '["[1, 3, 5]", "[1, 2, 3, 4, 5]", "[2, 4]", "[5]"]',
 '0',
 'Push 1 (keep), push 2 (pop), push 3 (keep), push 4 (pop), push 5 (keep) → [1, 3, 5]',
 10),

('stack', NULL, 'multiple-choice', 'medium',
 'Which browser feature uses a stack internally?',
 NULL,
 '["Bookmarks", "Back/Forward navigation history", "Search autocomplete", "Tab groups"]',
 '1',
 'Browser history uses a stack - the back button returns to the most recently visited page (LIFO).',
 11),

('stack', NULL, 'true-false', 'medium',
 'A stack with n elements uses O(n) space complexity.',
 NULL,
 NULL,
 'true',
 'Each element requires constant space, so n elements use O(n) total space.',
 12),

('stack', NULL, 'multiple-choice', 'easy',
 'Is the string ''([)]'' valid parentheses?',
 NULL,
 '["Yes, all brackets are present", "No, brackets are not properly nested"]',
 '1',
 'Invalid - the [ should be closed before ), but we see ) before ]. Brackets must be properly nested.',
 13),

('stack', NULL, 'code-output', 'medium',
 'What is the stack state after processing the first three characters of ''({[]})''?',
 'const input = "({[]})";
const stack = [];
// Process: ( { [
for (let i = 0; i < 3; i++) {
  stack.push(input[i]);
}',
 '["[\"(\", \"{\", \"[\"]", "[\"[\", \"{\", \"(\"]", "[]", "[\"{}\", \"[]\"]"]',
 '0',
 'Opening brackets are pushed in order: ( then { then [',
 14),

('stack', NULL, 'multiple-choice', 'medium',
 'Why do we return false if the stack is not empty after processing all characters in valid parentheses?',
 NULL,
 '["The string was too long", "There are unmatched opening brackets", "There are unmatched closing brackets", "The algorithm failed"]',
 '1',
 'Non-empty stack means some opening brackets were never closed.',
 15);

-- Monotonic Stack Questions
INSERT INTO quiz_questions (pattern_id, section_slug, question_type, difficulty, question_text, code_snippet, options, correct_answer, explanation, display_order) VALUES
('stack', NULL, 'multiple-choice', 'medium',
 'For ''Next Greater Element'', which type of monotonic stack should you use?',
 NULL,
 '["Monotonic Increasing", "Monotonic Decreasing", "Regular stack", "Double-ended queue"]',
 '1',
 'Decreasing stack: pop when current > top. Popped elements have found their next greater element.',
 16),

('stack', NULL, 'code-output', 'medium',
 'For nums = [2, 1, 2, 4, 3], what is the next greater element for the value at index 1?',
 'const nums = [2, 1, 2, 4, 3];
// Index:      0  1  2  3  4
// Value at index 1 is: 1
// Looking for next greater element to the right',
 '["2", "4", "3", "-1"]',
 '0',
 'At index 1, value is 1. The next element to the right that is greater is 2 (at index 2).',
 17),

('stack', NULL, 'true-false', 'hard',
 'Monotonic stack algorithms have O(n²) time complexity due to nested loops.',
 NULL,
 NULL,
 'false',
 'Despite nested loops, each element is pushed and popped at most once - O(n) total.',
 18),

('stack', NULL, 'multiple-choice', 'medium',
 'In monotonic stack problems, we typically store _____ rather than values.',
 NULL,
 '["Pointers", "Indices", "References", "Copies"]',
 '1',
 'Storing indices lets us update result[idx] and calculate distances.',
 19),

('stack', NULL, 'multiple-choice', 'hard',
 'For Daily Temperatures, what''s the key difference from Next Greater Element?',
 NULL,
 '["Use increasing stack instead", "Return distance (i - idx) instead of value", "Process right to left", "No difference"]',
 '1',
 'Same algorithm, but result[idx] = i - idx (days until warmer) instead of the temperature value.',
 20),

('stack', NULL, 'multiple-choice', 'medium',
 'For ''Next Smaller Element'', when do you pop from the stack?',
 NULL,
 '["When current > stack top", "When current < stack top", "When current == stack top", "Never pop"]',
 '1',
 'Increasing stack for next smaller: pop when current < top (current is smaller).',
 21),

('stack', NULL, 'code-output', 'hard',
 'For the circular array [1, 2, 1], what is the next greater element for the last element (index 2)?',
 'const nums = [1, 2, 1];
// Circular: after index 2, wrap to index 0, then 1
// Value at index 2 is: 1
// Looking for first value > 1 going right (with wrap)',
 '["-1", "1", "2", "Error"]',
 '2',
 'Circular: from index 2 (value 1), wrap to index 0 (value 1, not greater), then index 1 (value 2 > 1).',
 22),

('stack', NULL, 'multiple-choice', 'medium',
 'Why initialize result array with -1 for next greater element?',
 NULL,
 '["To indicate invalid indices", "To mark elements with no greater element to the right", "It''s required by the algorithm", "For better performance"]',
 '1',
 '-1 is the default for elements that never find a greater element (remain in stack).',
 23),

('stack', NULL, 'code-output', 'hard',
 'For this histogram, what is the largest rectangle area?',
 'const heights = [2, 1, 5, 6, 2, 3];
//                 0  1  2  3  4  5
// Visual:
//             ■
//          ■  ■
//          ■  ■     ■
//    ■     ■  ■  ■  ■
// ■  ■  ■  ■  ■  ■  ■',
 '["6", "8", "10", "12"]',
 '2',
 'Heights 5 and 6 (indices 2-3) form a rectangle with minimum height 5 and width 2: area = 5 × 2 = 10.',
 24),

('stack', NULL, 'multiple-choice', 'medium',
 'Why add a sentinel value (height 0) at the end of histogram?',
 NULL,
 '["To handle empty arrays", "To force all remaining bars to be popped and calculated", "To improve time complexity", "It''s optional optimization"]',
 '1',
 'Height 0 is smaller than all bars, forcing every remaining bar to be popped and its area calculated.',
 25),

('stack', NULL, 'code-output', 'medium',
 'What does this expression evaluator return?',
 'function calculate(s) {
  // Evaluates: "3+2*2"
  // Using stack-based approach
}
calculate("3+2*2");',
 '["7", "10", "8", "12"]',
 '0',
 'Order of operations: 2*2=4, then 3+4=7.',
 26),

('stack', NULL, 'multiple-choice', 'medium',
 'Why do we push -num for subtraction in expression evaluation?',
 NULL,
 '["It''s faster", "So we can sum the entire stack at the end", "To handle negative numbers", "It''s required for integer division"]',
 '1',
 'Converting a-b to a+(-b) lets us simply sum all stack values at the end.',
 27),

('stack', NULL, 'identify-bug', 'hard',
 'What''s wrong with this Next Greater Element code?',
 'function nextGreater(nums) {
  const result = new Array(nums.length).fill(-1);
  const stack = [];
  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[stack.at(-1)] < nums[i]) {
      result[stack.pop()] = i;  // Bug here
    }
    stack.push(i);
  }
  return result;
}',
 '["Should push nums[i], not i", "Result should store nums[i], not i", "Comparison direction is wrong", "Should iterate backwards"]',
 '1',
 'Bug: result[stack.pop()] = i stores the INDEX, should store nums[i] (the VALUE).',
 28),

('stack', NULL, 'multiple-choice', 'hard',
 'For Largest Rectangle in Histogram, we use which type of monotonic stack?',
 NULL,
 '["Decreasing stack", "Increasing stack", "Either works", "No monotonic property needed"]',
 '1',
 'Increasing stack: we pop taller bars when a shorter bar arrives (limits their extension).',
 29),

('stack', NULL, 'multiple-choice', 'medium',
 'What is the space complexity of a typical stack-based algorithm?',
 NULL,
 '["O(1)", "O(log n)", "O(n)", "O(n²)"]',
 '2',
 'Worst case: all n elements stay on the stack (e.g., sorted input for monotonic stack).',
 30);
