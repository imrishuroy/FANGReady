import { Question } from '@/types';

export const questions: Question[] = [
  // Two Pointers
  { id: 'tp-1', name: 'Container With Most Water', url: 'https://leetcode.com/problems/container-with-most-water', difficulty: 'Medium', pattern: 'Two Pointers', companies: ['Google', 'Amazon', 'Apple'], frequency: '🔥🔥🔥', category: 'Two Pointers' },
  { id: 'tp-2', name: 'Two Sum II', url: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted', difficulty: 'Medium', pattern: 'Two Pointers', companies: ['Google'], frequency: '🔥🔥', category: 'Two Pointers' },
  { id: 'tp-3', name: '3Sum', url: 'https://leetcode.com/problems/3sum', difficulty: 'Medium', pattern: 'Two Pointers', companies: ['Google', 'Amazon', 'Apple', 'Meta', 'Tesla'], frequency: '🔥🔥🔥', category: 'Two Pointers' },
  { id: 'tp-4', name: 'Valid Palindrome', url: 'https://leetcode.com/problems/valid-palindrome', difficulty: 'Easy', pattern: 'Two Pointers', companies: ['Meta', 'Amazon'], frequency: '🔥🔥', category: 'Two Pointers' },
  { id: 'tp-5', name: 'Trapping Rain Water', url: 'https://leetcode.com/problems/trapping-rain-water', difficulty: 'Hard', pattern: 'Two Pointers', companies: ['Google', 'Amazon', 'Apple', 'Netflix'], frequency: '🔥🔥🔥', category: 'Two Pointers' },
  { id: 'tp-6', name: 'Move Zeroes', url: 'https://leetcode.com/problems/move-zeroes', difficulty: 'Easy', pattern: 'Two Pointers', companies: ['Meta'], frequency: '🔥🔥', category: 'Two Pointers' },
  { id: 'tp-7', name: 'Sort Colors', url: 'https://leetcode.com/problems/sort-colors', difficulty: 'Medium', pattern: 'Two Pointers', companies: ['Microsoft', 'Google'], frequency: '🔥🔥', category: 'Two Pointers' },

  // Sliding Window
  { id: 'sw-1', name: 'Longest Substring Without Repeating Characters', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters', difficulty: 'Medium', pattern: 'Sliding Window', companies: ['Google', 'Amazon', 'Apple', 'Microsoft', 'Meta'], frequency: '🔥🔥🔥', category: 'Sliding Window' },
  { id: 'sw-2', name: 'Minimum Window Substring', url: 'https://leetcode.com/problems/minimum-window-substring', difficulty: 'Hard', pattern: 'Sliding Window', companies: ['Google', 'Amazon', 'Netflix', 'Tesla'], frequency: '🔥🔥🔥', category: 'Sliding Window' },
  { id: 'sw-3', name: 'Sliding Window Maximum', url: 'https://leetcode.com/problems/sliding-window-maximum', difficulty: 'Hard', pattern: 'Sliding Window', companies: ['Google', 'Amazon', 'Uber'], frequency: '🔥🔥🔥', category: 'Sliding Window' },
  { id: 'sw-4', name: 'Longest Repeating Character Replacement', url: 'https://leetcode.com/problems/longest-repeating-character-replacement', difficulty: 'Medium', pattern: 'Sliding Window', companies: ['Amazon', 'Apple'], frequency: '🔥🔥', category: 'Sliding Window' },
  { id: 'sw-5', name: 'Find All Anagrams in a String', url: 'https://leetcode.com/problems/find-all-anagrams-in-a-string', difficulty: 'Medium', pattern: 'Sliding Window', companies: ['Google', 'Databricks'], frequency: '🔥🔥', category: 'Sliding Window' },
  { id: 'sw-6', name: 'Permutation in String', url: 'https://leetcode.com/problems/permutation-in-string', difficulty: 'Medium', pattern: 'Sliding Window', companies: ['Microsoft'], frequency: '🔥🔥', category: 'Sliding Window' },

  // Prefix Sum
  { id: 'ps-1', name: 'Subarray Sum Equals K', url: 'https://leetcode.com/problems/subarray-sum-equals-k', difficulty: 'Medium', pattern: 'Prefix Sum', companies: ['Meta', 'Amazon', 'Tesla'], frequency: '🔥🔥🔥', category: 'Prefix Sum' },
  { id: 'ps-2', name: 'Continuous Subarray Sum', url: 'https://leetcode.com/problems/continuous-subarray-sum', difficulty: 'Medium', pattern: 'Prefix Sum', companies: ['Meta'], frequency: '🔥🔥', category: 'Prefix Sum' },
  { id: 'ps-3', name: 'Product of Array Except Self', url: 'https://leetcode.com/problems/product-of-array-except-self', difficulty: 'Medium', pattern: 'Prefix Sum', companies: ['Google', 'Amazon', 'Meta', 'Apple'], frequency: '🔥🔥🔥', category: 'Prefix Sum' },
  { id: 'ps-4', name: 'Find Pivot Index', url: 'https://leetcode.com/problems/find-pivot-index', difficulty: 'Easy', pattern: 'Prefix Sum', companies: ['Google', 'Tesla'], frequency: '🔥🔥', category: 'Prefix Sum' },

  // Hash Map / Set
  { id: 'hm-1', name: 'Two Sum', url: 'https://leetcode.com/problems/two-sum', difficulty: 'Easy', pattern: 'Hash Map', companies: ['Google', 'Amazon', 'Meta', 'Apple', 'Microsoft'], frequency: '🔥🔥🔥', category: 'Hash Map / Set' },
  { id: 'hm-2', name: 'Group Anagrams', url: 'https://leetcode.com/problems/group-anagrams', difficulty: 'Medium', pattern: 'Hash Map', companies: ['Google', 'Amazon', 'Meta', 'Apple'], frequency: '🔥🔥🔥', category: 'Hash Map / Set' },
  { id: 'hm-3', name: 'Top K Frequent Elements', url: 'https://leetcode.com/problems/top-k-frequent-elements', difficulty: 'Medium', pattern: 'Hash Map', companies: ['Google', 'Amazon', 'Meta', 'Apple'], frequency: '🔥🔥🔥', category: 'Hash Map / Set' },
  { id: 'hm-4', name: 'Longest Consecutive Sequence', url: 'https://leetcode.com/problems/longest-consecutive-sequence', difficulty: 'Medium', pattern: 'Hash Set', companies: ['Google'], frequency: '🔥🔥', category: 'Hash Map / Set' },
  { id: 'hm-5', name: 'Valid Anagram', url: 'https://leetcode.com/problems/valid-anagram', difficulty: 'Easy', pattern: 'Hash Map', companies: ['Amazon', 'Google'], frequency: '🔥🔥', category: 'Hash Map / Set' },

  // Binary Search
  { id: 'bs-1', name: 'Binary Search', url: 'https://leetcode.com/problems/binary-search', difficulty: 'Easy', pattern: 'Binary Search', companies: ['Google'], frequency: '🔥', category: 'Binary Search' },
  { id: 'bs-2', name: 'Search in Rotated Sorted Array', url: 'https://leetcode.com/problems/search-in-rotated-sorted-array', difficulty: 'Medium', pattern: 'Binary Search', companies: ['Google', 'Amazon', 'Tesla'], frequency: '🔥🔥🔥', category: 'Binary Search' },
  { id: 'bs-3', name: 'Find Minimum in Rotated Sorted Array', url: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array', difficulty: 'Medium', pattern: 'Binary Search', companies: ['Google'], frequency: '🔥🔥', category: 'Binary Search' },
  { id: 'bs-4', name: 'Koko Eating Bananas', url: 'https://leetcode.com/problems/koko-eating-bananas', difficulty: 'Medium', pattern: 'Binary Search', companies: ['Amazon', 'Google', 'Netflix'], frequency: '🔥🔥🔥', category: 'Binary Search' },
  { id: 'bs-5', name: 'Search a 2D Matrix', url: 'https://leetcode.com/problems/search-a-2d-matrix', difficulty: 'Medium', pattern: 'Binary Search', companies: ['Apple', 'Microsoft'], frequency: '🔥🔥', category: 'Binary Search' },

  // Stack
  { id: 'st-1', name: 'Valid Parentheses', url: 'https://leetcode.com/problems/valid-parentheses', difficulty: 'Easy', pattern: 'Stack', companies: ['Apple', 'Amazon', 'Google'], frequency: '🔥🔥🔥', category: 'Stack / Monotonic Stack' },
  { id: 'st-2', name: 'Daily Temperatures', url: 'https://leetcode.com/problems/daily-temperatures', difficulty: 'Medium', pattern: 'Monotonic Stack', companies: ['Netflix', 'Google'], frequency: '🔥🔥', category: 'Stack / Monotonic Stack' },
  { id: 'st-3', name: 'Largest Rectangle in Histogram', url: 'https://leetcode.com/problems/largest-rectangle-in-histogram', difficulty: 'Hard', pattern: 'Monotonic Stack', companies: ['Microsoft', 'Google'], frequency: '🔥🔥', category: 'Stack / Monotonic Stack' },
  { id: 'st-4', name: 'Min Stack', url: 'https://leetcode.com/problems/min-stack', difficulty: 'Medium', pattern: 'Stack', companies: ['Amazon', 'Microsoft'], frequency: '🔥🔥', category: 'Stack / Monotonic Stack' },
  { id: 'st-5', name: 'Decode String', url: 'https://leetcode.com/problems/decode-string', difficulty: 'Medium', pattern: 'Stack', companies: ['Amazon', 'Databricks'], frequency: '🔥🔥', category: 'Stack / Monotonic Stack' },

  // Linked List
  { id: 'll-1', name: 'Reverse Linked List', url: 'https://leetcode.com/problems/reverse-linked-list', difficulty: 'Easy', pattern: 'Linked List', companies: ['Apple', 'Amazon', 'Google'], frequency: '🔥🔥🔥', category: 'Linked List' },
  { id: 'll-2', name: 'Merge Two Sorted Lists', url: 'https://leetcode.com/problems/merge-two-sorted-lists', difficulty: 'Easy', pattern: 'Linked List', companies: ['Amazon', 'Meta', 'Microsoft'], frequency: '🔥🔥🔥', category: 'Linked List' },
  { id: 'll-3', name: 'Linked List Cycle', url: 'https://leetcode.com/problems/linked-list-cycle', difficulty: 'Easy', pattern: 'Linked List', companies: ['Google'], frequency: '🔥🔥', category: 'Linked List' },
  { id: 'll-4', name: 'Merge k Sorted Lists', url: 'https://leetcode.com/problems/merge-k-sorted-lists', difficulty: 'Hard', pattern: 'Linked List', companies: ['Amazon', 'Google', 'Meta', 'Microsoft'], frequency: '🔥🔥🔥', category: 'Linked List' },
  { id: 'll-5', name: 'Copy List with Random Pointer', url: 'https://leetcode.com/problems/copy-list-with-random-pointer', difficulty: 'Medium', pattern: 'Linked List', companies: ['Meta', 'Microsoft'], frequency: '🔥🔥🔥', category: 'Linked List' },
  { id: 'll-6', name: 'Add Two Numbers', url: 'https://leetcode.com/problems/add-two-numbers', difficulty: 'Medium', pattern: 'Linked List', companies: ['Microsoft', 'Amazon'], frequency: '🔥🔥🔥', category: 'Linked List' },

  // Trees
  { id: 'tr-1', name: 'Maximum Depth of Binary Tree', url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree', difficulty: 'Easy', pattern: 'DFS', companies: ['Amazon', 'Google'], frequency: '🔥🔥', category: 'Trees' },
  { id: 'tr-2', name: 'Invert Binary Tree', url: 'https://leetcode.com/problems/invert-binary-tree', difficulty: 'Easy', pattern: 'DFS', companies: ['Google'], frequency: '🔥🔥', category: 'Trees' },
  { id: 'tr-3', name: 'Validate Binary Search Tree', url: 'https://leetcode.com/problems/validate-binary-search-tree', difficulty: 'Medium', pattern: 'DFS', companies: ['Amazon', 'Meta'], frequency: '🔥🔥🔥', category: 'Trees' },
  { id: 'tr-4', name: 'Binary Tree Level Order Traversal', url: 'https://leetcode.com/problems/binary-tree-level-order-traversal', difficulty: 'Medium', pattern: 'BFS', companies: ['Amazon', 'Meta', 'Microsoft'], frequency: '🔥🔥🔥', category: 'Trees' },
  { id: 'tr-5', name: 'Lowest Common Ancestor', url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree', difficulty: 'Medium', pattern: 'DFS', companies: ['Meta', 'Amazon', 'Google'], frequency: '🔥🔥🔥', category: 'Trees' },
  { id: 'tr-6', name: 'Serialize and Deserialize Binary Tree', url: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree', difficulty: 'Hard', pattern: 'DFS/BFS', companies: ['Meta', 'Amazon', 'Google'], frequency: '🔥🔥🔥', category: 'Trees' },
  { id: 'tr-7', name: 'Binary Tree Right Side View', url: 'https://leetcode.com/problems/binary-tree-right-side-view', difficulty: 'Medium', pattern: 'BFS', companies: ['Meta', 'Amazon'], frequency: '🔥🔥', category: 'Trees' },

  // Graphs
  { id: 'gr-1', name: 'Number of Islands', url: 'https://leetcode.com/problems/number-of-islands', difficulty: 'Medium', pattern: 'DFS/BFS', companies: ['Amazon', 'Google', 'Meta', 'Microsoft'], frequency: '🔥🔥🔥', category: 'Graphs' },
  { id: 'gr-2', name: 'Clone Graph', url: 'https://leetcode.com/problems/clone-graph', difficulty: 'Medium', pattern: 'DFS/BFS', companies: ['Meta', 'Amazon'], frequency: '🔥🔥🔥', category: 'Graphs' },
  { id: 'gr-3', name: 'Course Schedule', url: 'https://leetcode.com/problems/course-schedule', difficulty: 'Medium', pattern: 'Topological Sort', companies: ['Amazon', 'Google', 'Meta'], frequency: '🔥🔥🔥', category: 'Graphs' },
  { id: 'gr-4', name: 'Course Schedule II', url: 'https://leetcode.com/problems/course-schedule-ii', difficulty: 'Medium', pattern: 'Topological Sort', companies: ['Amazon', 'Google'], frequency: '🔥🔥', category: 'Graphs' },
  { id: 'gr-5', name: 'Word Ladder', url: 'https://leetcode.com/problems/word-ladder', difficulty: 'Hard', pattern: 'BFS', companies: ['Amazon', 'Google', 'Meta'], frequency: '🔥🔥', category: 'Graphs' },

  // Heap
  { id: 'hp-1', name: 'Kth Largest Element in an Array', url: 'https://leetcode.com/problems/kth-largest-element-in-an-array', difficulty: 'Medium', pattern: 'Heap', companies: ['Amazon', 'Google', 'Meta'], frequency: '🔥🔥🔥', category: 'Heap / Priority Queue' },
  { id: 'hp-2', name: 'Find Median from Data Stream', url: 'https://leetcode.com/problems/find-median-from-data-stream', difficulty: 'Hard', pattern: 'Two Heaps', companies: ['Amazon', 'Google', 'Meta'], frequency: '🔥🔥🔥', category: 'Heap / Priority Queue' },
  { id: 'hp-3', name: 'Task Scheduler', url: 'https://leetcode.com/problems/task-scheduler', difficulty: 'Medium', pattern: 'Heap', companies: ['Meta', 'Amazon'], frequency: '🔥🔥🔥', category: 'Heap / Priority Queue' },
  { id: 'hp-4', name: 'K Closest Points to Origin', url: 'https://leetcode.com/problems/k-closest-points-to-origin', difficulty: 'Medium', pattern: 'Heap', companies: ['Amazon', 'Meta'], frequency: '🔥🔥', category: 'Heap / Priority Queue' },

  // Dynamic Programming
  { id: 'dp-1', name: 'Climbing Stairs', url: 'https://leetcode.com/problems/climbing-stairs', difficulty: 'Easy', pattern: 'DP', companies: ['Amazon', 'Google'], frequency: '🔥🔥', category: 'Dynamic Programming' },
  { id: 'dp-2', name: 'House Robber', url: 'https://leetcode.com/problems/house-robber', difficulty: 'Medium', pattern: 'DP', companies: ['Amazon', 'Google'], frequency: '🔥🔥', category: 'Dynamic Programming' },
  { id: 'dp-3', name: 'Longest Increasing Subsequence', url: 'https://leetcode.com/problems/longest-increasing-subsequence', difficulty: 'Medium', pattern: 'DP', companies: ['Amazon', 'Google', 'Meta'], frequency: '🔥🔥🔥', category: 'Dynamic Programming' },
  { id: 'dp-4', name: 'Coin Change', url: 'https://leetcode.com/problems/coin-change', difficulty: 'Medium', pattern: 'DP', companies: ['Amazon', 'Google', 'Meta'], frequency: '🔥🔥🔥', category: 'Dynamic Programming' },
  { id: 'dp-5', name: 'Word Break', url: 'https://leetcode.com/problems/word-break', difficulty: 'Medium', pattern: 'DP', companies: ['Amazon', 'Google', 'Meta'], frequency: '🔥🔥🔥', category: 'Dynamic Programming' },
  { id: 'dp-6', name: 'Unique Paths', url: 'https://leetcode.com/problems/unique-paths', difficulty: 'Medium', pattern: 'DP', companies: ['Amazon', 'Google'], frequency: '🔥🔥', category: 'Dynamic Programming' },
  { id: 'dp-7', name: 'Maximum Subarray', url: 'https://leetcode.com/problems/maximum-subarray', difficulty: 'Medium', pattern: 'DP', companies: ['Amazon', 'Microsoft', 'LinkedIn'], frequency: '🔥🔥🔥', category: 'Dynamic Programming' },

  // Backtracking
  { id: 'bt-1', name: 'Subsets', url: 'https://leetcode.com/problems/subsets', difficulty: 'Medium', pattern: 'Backtracking', companies: ['Amazon', 'Meta'], frequency: '🔥🔥', category: 'Backtracking' },
  { id: 'bt-2', name: 'Permutations', url: 'https://leetcode.com/problems/permutations', difficulty: 'Medium', pattern: 'Backtracking', companies: ['Amazon', 'Meta', 'Google'], frequency: '🔥🔥', category: 'Backtracking' },
  { id: 'bt-3', name: 'Combination Sum', url: 'https://leetcode.com/problems/combination-sum', difficulty: 'Medium', pattern: 'Backtracking', companies: ['Amazon', 'Google'], frequency: '🔥🔥', category: 'Backtracking' },
  { id: 'bt-4', name: 'Word Search', url: 'https://leetcode.com/problems/word-search', difficulty: 'Medium', pattern: 'Backtracking', companies: ['Amazon', 'Google', 'Meta'], frequency: '🔥🔥🔥', category: 'Backtracking' },
  { id: 'bt-5', name: 'N-Queens', url: 'https://leetcode.com/problems/n-queens', difficulty: 'Hard', pattern: 'Backtracking', companies: ['Amazon', 'Google'], frequency: '🔥🔥', category: 'Backtracking' },

  // Intervals
  { id: 'iv-1', name: 'Merge Intervals', url: 'https://leetcode.com/problems/merge-intervals', difficulty: 'Medium', pattern: 'Intervals', companies: ['Amazon', 'Google', 'Meta', 'Microsoft'], frequency: '🔥🔥🔥', category: 'Intervals' },
  { id: 'iv-2', name: 'Insert Interval', url: 'https://leetcode.com/problems/insert-interval', difficulty: 'Medium', pattern: 'Intervals', companies: ['Google', 'Meta'], frequency: '🔥🔥', category: 'Intervals' },
  { id: 'iv-3', name: 'Meeting Rooms II', url: 'https://leetcode.com/problems/meeting-rooms-ii', difficulty: 'Medium', pattern: 'Intervals', companies: ['Amazon', 'Google', 'Meta'], frequency: '🔥🔥🔥', category: 'Intervals' },
  { id: 'iv-4', name: 'Non-overlapping Intervals', url: 'https://leetcode.com/problems/non-overlapping-intervals', difficulty: 'Medium', pattern: 'Intervals', companies: ['Google'], frequency: '🔥🔥', category: 'Intervals' },

  // Trie
  { id: 'ti-1', name: 'Implement Trie', url: 'https://leetcode.com/problems/implement-trie-prefix-tree', difficulty: 'Medium', pattern: 'Trie', companies: ['Amazon', 'Google'], frequency: '🔥🔥', category: 'Trie' },
  { id: 'ti-2', name: 'Word Search II', url: 'https://leetcode.com/problems/word-search-ii', difficulty: 'Hard', pattern: 'Trie', companies: ['Amazon', 'Google'], frequency: '🔥🔥', category: 'Trie' },
  { id: 'ti-3', name: 'Design Add and Search Words', url: 'https://leetcode.com/problems/design-add-and-search-words-data-structure', difficulty: 'Medium', pattern: 'Trie', companies: ['Meta'], frequency: '🔥🔥', category: 'Trie' },

  // Union Find
  { id: 'uf-1', name: 'Number of Connected Components', url: 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph', difficulty: 'Medium', pattern: 'Union Find', companies: ['Google', 'Amazon'], frequency: '🔥🔥', category: 'Union-Find' },
  { id: 'uf-2', name: 'Graph Valid Tree', url: 'https://leetcode.com/problems/graph-valid-tree', difficulty: 'Medium', pattern: 'Union Find', companies: ['Google'], frequency: '🔥🔥', category: 'Union-Find' },
  { id: 'uf-3', name: 'Accounts Merge', url: 'https://leetcode.com/problems/accounts-merge', difficulty: 'Medium', pattern: 'Union Find', companies: ['Meta', 'Amazon'], frequency: '🔥🔥🔥', category: 'Union-Find' },
];

// Map category names to pattern IDs
export const categoryToPatternId: Record<string, string> = {
  'Two Pointers': 'two-pointers',
  'Sliding Window': 'sliding-window',
  'Prefix Sum': 'prefix-sum',
  'Hash Map / Set': 'hash-map',
  'Binary Search': 'binary-search',
  'Stack / Monotonic Stack': 'stack',
  'Linked List': 'linked-list',
  'Trees': 'trees',
  'Graphs': 'graphs',
  'Heap / Priority Queue': 'heap',
  'Dynamic Programming': 'dynamic-programming',
  'Backtracking': 'backtracking',
  'Intervals': 'intervals',
  'Trie': 'trie',
  'Union-Find': 'union-find',
};

export function getCategories(): string[] {
  return [...new Set(questions.map(q => q.category))];
}

export function getCompanies(): string[] {
  const companies = new Set<string>();
  questions.forEach(q => q.companies.forEach(c => companies.add(c)));
  return [...companies].sort();
}

export function getQuestionsByCategory(category: string): Question[] {
  return questions.filter(q => q.category === category);
}
