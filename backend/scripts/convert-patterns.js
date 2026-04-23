#!/usr/bin/env node
/**
 * Convert patterns.js to JSON format for database seeding
 * Run: node scripts/convert-patterns.js ../public/patterns.js > data/patterns.json
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const inputFile = process.argv[2] || path.resolve(__dirname, '../../public/patterns.js');
const inputPath = path.isAbsolute(inputFile) ? inputFile : path.resolve(process.cwd(), inputFile);

const code = fs.readFileSync(inputPath, 'utf-8');

const sandbox = { patternsData: null };
vm.createContext(sandbox);

const wrappedCode = code + '\npatternsData;';
const result = vm.runInContext(wrappedCode, sandbox);

const output = {
    version: "1.0.0",
    exportedAt: new Date().toISOString(),
    totalPatterns: result.length,
    patterns: result
};

console.log(JSON.stringify(output, null, 2));
