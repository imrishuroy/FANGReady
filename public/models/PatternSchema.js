/**
 * Pattern Data Schema
 *
 * This file defines the schema for DSA patterns data.
 * Use this as reference when:
 * - Creating database migrations (SQL/NoSQL)
 * - Building API endpoints
 * - Validating data integrity
 *
 * Database Mapping Examples:
 *
 * SQL (PostgreSQL/MySQL):
 * -----------------------
 * CREATE TABLE patterns (
 *   id VARCHAR(50) PRIMARY KEY,
 *   category VARCHAR(100) NOT NULL,
 *   icon VARCHAR(10),
 *   difficulty VARCHAR(20),
 *   description TEXT,
 *   time_complexity VARCHAR(50),
 *   space_complexity VARCHAR(50),
 *   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 *   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 * );
 *
 * CREATE TABLE pattern_when_to_use (
 *   id SERIAL PRIMARY KEY,
 *   pattern_id VARCHAR(50) REFERENCES patterns(id),
 *   use_case TEXT NOT NULL,
 *   order_index INT
 * );
 *
 * CREATE TABLE pattern_code_templates (
 *   id SERIAL PRIMARY KEY,
 *   pattern_id VARCHAR(50) REFERENCES patterns(id),
 *   language VARCHAR(20) NOT NULL,  -- 'javascript', 'java', 'python', etc.
 *   code TEXT NOT NULL
 * );
 *
 * CREATE TABLE pattern_insights (
 *   id SERIAL PRIMARY KEY,
 *   pattern_id VARCHAR(50) REFERENCES patterns(id),
 *   insight TEXT NOT NULL,
 *   order_index INT
 * );
 *
 * CREATE TABLE pattern_mistakes (
 *   id SERIAL PRIMARY KEY,
 *   pattern_id VARCHAR(50) REFERENCES patterns(id),
 *   mistake TEXT NOT NULL,
 *   order_index INT
 * );
 *
 * CREATE TABLE pattern_variations (
 *   id SERIAL PRIMARY KEY,
 *   pattern_id VARCHAR(50) REFERENCES patterns(id),
 *   name VARCHAR(100) NOT NULL,
 *   description TEXT,
 *   when_to_use TEXT,
 *   order_index INT
 * );
 *
 * CREATE TABLE variation_code_templates (
 *   id SERIAL PRIMARY KEY,
 *   variation_id INT REFERENCES pattern_variations(id),
 *   language VARCHAR(20) NOT NULL,
 *   code TEXT NOT NULL
 * );
 *
 * CREATE TABLE variation_problems (
 *   id SERIAL PRIMARY KEY,
 *   variation_id INT REFERENCES pattern_variations(id),
 *   problem_name VARCHAR(200) NOT NULL
 * );
 *
 * CREATE TABLE pattern_problems (
 *   id SERIAL PRIMARY KEY,
 *   pattern_id VARCHAR(50) REFERENCES patterns(id),
 *   problem_name VARCHAR(200) NOT NULL,
 *   leetcode_url VARCHAR(500)
 * );
 *
 *
 * NoSQL (MongoDB):
 * ----------------
 * Collection: patterns
 * {
 *   _id: ObjectId,
 *   id: String (unique index),
 *   category: String,
 *   icon: String,
 *   difficulty: String,
 *   description: String,
 *   whenToUse: [String],
 *   codeTemplates: {
 *     javascript: String,
 *     java: String,
 *     python: String  // extensible
 *   },
 *   keyInsights: [String],
 *   commonMistakes: [String],
 *   variations: [{
 *     name: String,
 *     desc: String,
 *     when: String,
 *     template: { javascript: String, java: String },
 *     problems: [String]
 *   }],
 *   commonProblems: [String],
 *   timeComplexity: String,
 *   spaceComplexity: String,
 *   createdAt: Date,
 *   updatedAt: Date
 * }
 */

// Schema validation using JSON Schema format (can be used with Ajv, Zod, or similar)
const PatternSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "required": ["id", "category", "description", "whenToUse", "codeTemplates", "keyInsights", "variations", "commonProblems", "timeComplexity", "spaceComplexity"],
    "properties": {
        "id": {
            "type": "string",
            "description": "Unique identifier for the pattern (slug format)",
            "pattern": "^[a-z0-9-]+$"
        },
        "category": {
            "type": "string",
            "description": "Display name of the pattern category"
        },
        "icon": {
            "type": "string",
            "description": "Emoji icon for visual representation"
        },
        "difficulty": {
            "type": "string",
            "enum": ["Easy", "Medium", "Hard", "Easy-Medium", "Medium-Hard"],
            "description": "Difficulty level of the pattern"
        },
        "description": {
            "type": "string",
            "description": "Brief description of what this pattern does"
        },
        "whenToUse": {
            "type": "array",
            "items": { "type": "string" },
            "description": "List of scenarios when this pattern is applicable"
        },
        "codeTemplates": {
            "type": "object",
            "properties": {
                "javascript": { "type": "string" },
                "java": { "type": "string" },
                "python": { "type": "string" },
                "cpp": { "type": "string" },
                "go": { "type": "string" }
            },
            "required": ["javascript"],
            "description": "Code templates in different programming languages"
        },
        "keyInsights": {
            "type": "array",
            "items": { "type": "string" },
            "description": "Important tips and insights about the pattern"
        },
        "commonMistakes": {
            "type": "array",
            "items": { "type": "string" },
            "description": "Common mistakes to avoid when using this pattern"
        },
        "variations": {
            "type": "array",
            "items": {
                "type": "object",
                "required": ["name", "desc"],
                "properties": {
                    "name": { "type": "string" },
                    "desc": { "type": "string" },
                    "when": { "type": "string" },
                    "template": {
                        "type": "object",
                        "properties": {
                            "javascript": { "type": "string" },
                            "java": { "type": "string" }
                        }
                    },
                    "problems": {
                        "type": "array",
                        "items": { "type": "string" }
                    }
                }
            },
            "description": "Different variations/sub-patterns"
        },
        "commonProblems": {
            "type": "array",
            "items": { "type": "string" },
            "description": "List of practice problems for this pattern"
        },
        "timeComplexity": {
            "type": "string",
            "description": "Typical time complexity (e.g., 'O(n)', 'O(n log n)')"
        },
        "spaceComplexity": {
            "type": "string",
            "description": "Typical space complexity"
        }
    }
};

// TypeScript interface (for reference when converting to TypeScript)
const TypeScriptInterface = `
interface CodeTemplates {
    javascript: string;
    java?: string;
    python?: string;
    cpp?: string;
    go?: string;
}

interface PatternVariation {
    name: string;
    desc: string;
    when?: string;
    template?: CodeTemplates;
    problems?: string[];
}

interface Pattern {
    id: string;
    category: string;
    icon: string;
    difficulty: 'Easy' | 'Medium' | 'Hard' | 'Easy-Medium' | 'Medium-Hard';
    description: string;
    whenToUse: string[];
    codeTemplates: CodeTemplates;
    keyInsights: string[];
    commonMistakes?: string[];
    variations: PatternVariation[];
    commonProblems: string[];
    timeComplexity: string;
    spaceComplexity: string;
}
`;

// Validation function
function validatePattern(pattern) {
    const errors = [];

    if (!pattern.id || typeof pattern.id !== 'string') {
        errors.push('Missing or invalid id');
    }
    if (!pattern.category || typeof pattern.category !== 'string') {
        errors.push('Missing or invalid category');
    }
    if (!pattern.codeTemplates || !pattern.codeTemplates.javascript) {
        errors.push('Missing JavaScript code template');
    }
    if (!Array.isArray(pattern.whenToUse) || pattern.whenToUse.length === 0) {
        errors.push('whenToUse must be a non-empty array');
    }
    if (!Array.isArray(pattern.keyInsights) || pattern.keyInsights.length === 0) {
        errors.push('keyInsights must be a non-empty array');
    }
    if (!Array.isArray(pattern.variations)) {
        errors.push('variations must be an array');
    }
    if (!Array.isArray(pattern.commonProblems) || pattern.commonProblems.length === 0) {
        errors.push('commonProblems must be a non-empty array');
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PatternSchema, validatePattern, TypeScriptInterface };
}

// Browser global
if (typeof window !== 'undefined') {
    window.PatternSchema = PatternSchema;
    window.validatePattern = validatePattern;
}
