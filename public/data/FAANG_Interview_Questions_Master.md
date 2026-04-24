# FAANG Interview Questions - Master List

> **Last Updated:** April 2026  
> **Total Unique Questions:** 310+ (including 40+ non-LeetCode custom problems, 127 Core DSA Patterns & LeetCode 75 Study Plan)  
> **Frequency Legend:** 🔥🔥🔥 (Very High) | 🔥🔥 (High) | 🔥 (Medium) | ⚪ (Low)

---

## Table of Contents
- [Arrays & Strings](#arrays--strings)
- [Two Pointers](#two-pointers)
- [Sliding Window](#sliding-window)
- [Prefix Sum](#prefix-sum)
- [Hash Map / Set](#hash-map--set)
- [Stack / Monotonic Stack](#stack--monotonic-stack)
- [Linked List](#linked-list)
- [Binary Search](#binary-search)
- [Trees](#trees)
- [Graphs](#graphs)
- [Heap / Priority Queue](#heap--priority-queue)
- [Dynamic Programming](#dynamic-programming)
- [Backtracking](#backtracking)
- [Intervals](#intervals)
- [Trie](#trie)
- [Design](#design)
- [Matrix](#matrix)
- [Greedy](#greedy)
- [Math / Bit Manipulation](#math--bit-manipulation)
- [Divide and Conquer](#divide-and-conquer)
- [Concurrency](#concurrency)
- [Non-LeetCode / Custom Interview Problems](#non-leetcode--custom-interview-problems)
- [Additional Questions from 127 Core DSA Patterns](#additional-questions-from-127-core-dsa-patterns)
- [Company-Specific Pattern Preferences](#company-specific-pattern-preferences-from-127-core-dsa-patterns)

---

## Arrays & Strings

| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [Two Sum](https://leetcode.com/problems/two-sum) | Easy | Hash Map | Google, Amazon, Meta, Apple, Microsoft, Netflix, LinkedIn, Tesla, Databricks | 🔥🔥🔥 |
| 2 | [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self) | Medium | Prefix/Suffix | Google, Amazon, Meta, Apple | 🔥🔥🔥 |
| 3 | [Maximum Subarray](https://leetcode.com/problems/maximum-subarray) | Medium | Kadane's/DP | Amazon, Microsoft, LinkedIn, Tesla | 🔥🔥🔥 |
| 4 | [Group Anagrams](https://leetcode.com/problems/group-anagrams) | Medium | Hash Map | Google, Amazon, Meta, Apple, Tesla, Salesforce, Adobe | 🔥🔥🔥 |
| 5 | [Valid Anagram](https://leetcode.com/problems/valid-anagram) | Easy | Hash Map | Amazon, Google | 🔥🔥 |
| 6 | [Contains Duplicate](https://leetcode.com/problems/contains-duplicate) | Easy | Hash Set | Amazon, Google | 🔥🔥 |
| 7 | [Rotate Image](https://leetcode.com/problems/rotate-image) | Medium | Matrix | Amazon, Microsoft, Google | 🔥🔥 |
| 8 | [Sort Colors](https://leetcode.com/problems/sort-colors) | Medium | Dutch Flag | Microsoft, Google | 🔥🔥 |
| 9 | [Encode and Decode Strings](https://leetcode.com/problems/encode-and-decode-strings) | Medium | String | Google | 🔥 |
| 10 | [Longest Common Prefix](https://leetcode.com/problems/longest-common-prefix) | Easy | String | Amazon | 🔥 |
| 11 | [Add Strings](https://leetcode.com/problems/add-strings) | Easy | Math | Meta, Google | 🔥🔥 |
| 12 | [Add Binary](https://leetcode.com/problems/add-binary) | Easy | Math | Google | 🔥 |
| 13 | [Integer to English Words](https://leetcode.com/problems/integer-to-english-words) | Hard | String/Math | Amazon, Palantir | 🔥🔥 |
| 14 | [First Missing Positive](https://leetcode.com/problems/first-missing-positive) | Hard | Cyclic Sort | Google, Tesla | 🔥🔥 |
| 15 | [Custom Sort String](https://leetcode.com/problems/custom-sort-string) | Medium | Hash Map | Meta | 🔥🔥 |
| 16 | [Maximum Swap](https://leetcode.com/problems/maximum-swap) | Medium | Greedy | Meta | 🔥🔥 |
| 17 | [Reverse Integer](https://leetcode.com/problems/reverse-integer) | Medium | Math | Amazon | 🔥 |
| 18 | [Find the Difference](https://leetcode.com/problems/find-the-difference) | Easy | Hash/XOR | Google | 🔥 |
| 19 | [Greatest Common Divisor of Strings](https://leetcode.com/problems/greatest-common-divisor-of-strings) | Easy | Math/String | Google, Amazon | 🔥 |
| 20 | [Kids With the Greatest Number of Candies](https://leetcode.com/problems/kids-with-the-greatest-number-of-candies) | Easy | Array | Amazon | 🔥 |
| 21 | [Can Place Flowers](https://leetcode.com/problems/can-place-flowers) | Easy | Greedy | LinkedIn, Amazon | 🔥 |
| 22 | [Increasing Triplet Subsequence](https://leetcode.com/problems/increasing-triplet-subsequence) | Medium | Greedy | Meta, Google | 🔥🔥 |

---

## Two Pointers

| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [Container With Most Water](https://leetcode.com/problems/container-with-most-water) | Medium | Two Pointers | Google, Amazon, Apple | 🔥🔥🔥 |
| 2 | [3Sum](https://leetcode.com/problems/3sum) | Medium | Two Pointers | Google, Amazon, Apple, Meta, Tesla | 🔥🔥🔥 |
| 3 | [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water) | Hard | Two Pointers/Stack | Google, Amazon, Apple, Netflix, Palantir, Databricks | 🔥🔥🔥 |
| 4 | [Two Sum II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted) | Medium | Two Pointers | Google | 🔥🔥 |
| 5 | [Valid Palindrome](https://leetcode.com/problems/valid-palindrome) | Easy | Two Pointers | Meta, Amazon | 🔥🔥 |
| 6 | [Valid Palindrome II](https://leetcode.com/problems/valid-palindrome-ii) | Easy | Two Pointers | Meta | 🔥🔥 |
| 7 | [Move Zeroes](https://leetcode.com/problems/move-zeroes) | Easy | Two Pointers | Meta | 🔥🔥 |
| 8 | [Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list) | Medium | Fast/Slow | Meta | 🔥🔥 |
| 9 | [String Compression](https://leetcode.com/problems/string-compression) | Medium | Two Pointers | Google | 🔥 |
| 10 | [Merge Strings Alternately](https://leetcode.com/problems/merge-strings-alternately) | Easy | Two Pointers | Google | 🔥 |
| 11 | [Reverse Vowels of a String](https://leetcode.com/problems/reverse-vowels-of-a-string) | Easy | Two Pointers | Google | 🔥 |
| 12 | [Backspace String Compare](https://leetcode.com/problems/backspace-string-compare) | Easy | Two Pointers | Google | 🔥 |
| 13 | [Is Subsequence](https://leetcode.com/problems/is-subsequence) | Easy | Two Pointers | Google | 🔥 |

---

## Sliding Window

| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters) | Medium | Sliding Window | Google, Amazon, Apple, Microsoft, Meta | 🔥🔥🔥 |
| 2 | [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring) | Hard | Sliding Window | Google, Amazon, Netflix, Tesla | 🔥🔥🔥 |
| 3 | [Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum) | Hard | Monotonic Deque | Google, Amazon, Uber | 🔥🔥🔥 |
| 4 | [Longest Repeating Character Replacement](https://leetcode.com/problems/longest-repeating-character-replacement) | Medium | Sliding Window | Amazon, Apple | 🔥🔥 |
| 5 | [Maximum Average Subarray I](https://leetcode.com/problems/maximum-average-subarray-i) | Easy | Sliding Window | Google | 🔥 |
| 6 | [Max Consecutive Ones III](https://leetcode.com/problems/max-consecutive-ones-iii) | Medium | Sliding Window | Google | 🔥 |
| 7 | [Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum) | Medium | Sliding Window | Google | 🔥 |
| 8 | [Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-a-string) | Medium | Sliding Window | Google, Databricks | 🔥🔥 |
| 9 | [Permutation in String](https://leetcode.com/problems/permutation-in-string) | Medium | Sliding Window | Microsoft | 🔥🔥 |
| 10 | [Maximum Points You Can Obtain from Cards](https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards) | Medium | Sliding Window | Google | 🔥 |

---

## Prefix Sum

| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k) | Medium | Prefix Sum + Hash | Meta, Amazon, Tesla | 🔥🔥🔥 |
| 2 | [Continuous Subarray Sum](https://leetcode.com/problems/continuous-subarray-sum) | Medium | Prefix Sum | Meta | 🔥🔥 |
| 3 | [Range Sum Query - Immutable](https://leetcode.com/problems/range-sum-query-immutable) | Easy | Prefix Sum | Google | 🔥 |
| 4 | [Contiguous Array](https://leetcode.com/problems/contiguous-array) | Medium | Prefix Sum | Google | 🔥🔥 |
| 5 | [Find Pivot Index](https://leetcode.com/problems/find-pivot-index) | Easy | Prefix Sum | Google, Tesla | 🔥🔥 |

---

## Hash Map / Set

| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence) | Medium | Hash Set | Google | 🔥🔥 |
| 2 | [Word Pattern](https://leetcode.com/problems/word-pattern) | Easy | Hash Map | Google | 🔥 |
| 3 | [Isomorphic Strings](https://leetcode.com/problems/isomorphic-strings) | Easy | Hash Map | LinkedIn | 🔥 |
| 4 | [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements) | Medium | Hash + Heap | Google, Amazon, Meta, Apple, Netflix | 🔥🔥🔥 |
| 5 | [Contains Duplicate II](https://leetcode.com/problems/contains-duplicate-ii) | Easy | Hash Map | Amazon | 🔥 |

---

## Stack / Monotonic Stack

| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [Valid Parentheses](https://leetcode.com/problems/valid-parentheses) | Easy | Stack | Apple, Amazon, Google | 🔥🔥🔥 |
| 2 | [Daily Temperatures](https://leetcode.com/problems/daily-temperatures) | Medium | Monotonic Stack | Netflix, Google | 🔥🔥 |
| 3 | [Next Greater Element I](https://leetcode.com/problems/next-greater-element-i) | Easy | Monotonic Stack | Google | 🔥 |
| 4 | [Next Greater Element II](https://leetcode.com/problems/next-greater-element-ii) | Medium | Monotonic Stack | Amazon | 🔥 |
| 5 | [Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram) | Hard | Monotonic Stack | Microsoft, Google | 🔥🔥 |
| 6 | [Evaluate Reverse Polish Notation](https://leetcode.com/problems/evaluate-reverse-polish-notation) | Medium | Stack | Google | 🔥 |
| 7 | [Basic Calculator II](https://leetcode.com/problems/basic-calculator-ii) | Medium | Stack | Meta | 🔥🔥 |
| 8 | [Basic Calculator III](https://leetcode.com/problems/basic-calculator-iii) | Hard | Stack | Google | 🔥 |
| 9 | [Simplify Path](https://leetcode.com/problems/simplify-path) | Medium | Stack | Google | 🔥 |
| 10 | [Asteroid Collision](https://leetcode.com/problems/asteroid-collision) | Medium | Stack | Microsoft, Databricks | 🔥🔥 |
| 11 | [Decode String](https://leetcode.com/problems/decode-string) | Medium | Stack | Amazon, Databricks | 🔥🔥 |
| 12 | [Sum of Subarray Minimums](https://leetcode.com/problems/sum-of-subarray-minimums) | Medium | Monotonic Stack | Amazon | 🔥 |

---

## Linked List

| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list) | Easy | Iteration/Recursion | Apple, Amazon, Google | 🔥🔥🔥 |
| 2 | [Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists) | Easy | Two Pointers | Amazon, Meta, Microsoft | 🔥🔥🔥 |
| 3 | [Linked List Cycle](https://leetcode.com/problems/linked-list-cycle) | Easy | Fast/Slow Pointers | Google | 🔥🔥 |
| 4 | [Add Two Numbers](https://leetcode.com/problems/add-two-numbers) | Medium | Math | Microsoft, Amazon | 🔥🔥🔥 |
| 5 | [Copy List with Random Pointer](https://leetcode.com/problems/copy-list-with-random-pointer) | Medium | Hash Map | Meta, Microsoft | 🔥🔥🔥 |
| 6 | [Reorder List](https://leetcode.com/problems/reorder-list) | Medium | Fast/Slow + Reverse | Meta | 🔥🔥 |
| 7 | [Insert into a Sorted Circular Linked List](https://leetcode.com/problems/insert-into-a-sorted-circular-linked-list) | Medium | Linked List | Meta | 🔥🔥 |
| 8 | [Reverse Linked List II](https://leetcode.com/problems/reverse-linked-list-ii) | Medium | In-place Reversal | Google | 🔥🔥 |
| 9 | [Swap Nodes in Pairs](https://leetcode.com/problems/swap-nodes-in-pairs) | Medium | Recursion | Google | 🔥 |
| 10 | [Reverse Nodes in k-Group](https://leetcode.com/problems/reverse-nodes-in-k-group) | Hard | In-place Reversal | Microsoft | 🔥🔥 |
| 11 | [Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists) | Hard | Heap/Divide&Conquer | Amazon, Google, Meta, Palantir, Anthropic, Microsoft, Intuit | 🔥🔥🔥 |
| 12 | [Odd Even Linked List](https://leetcode.com/problems/odd-even-linked-list) | Medium | Linked List | Google | 🔥 |
| 13 | [Find the Duplicate Number](https://leetcode.com/problems/find-the-duplicate-number) | Medium | Floyd's Cycle | Google, Tesla | 🔥🔥 |

---

## Binary Search

| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [Binary Search](https://leetcode.com/problems/binary-search) | Easy | Binary Search | Google | 🔥 |
| 2 | [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array) | Medium | Modified Binary Search | Google, Amazon, Tesla | 🔥🔥🔥 |
| 3 | [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array) | Medium | Binary Search | Google | 🔥🔥 |
| 4 | [Find Peak Element](https://leetcode.com/problems/find-peak-element) | Medium | Binary Search | Meta, Google | 🔥🔥 |
| 5 | [Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix) | Medium | Binary Search | Apple, Microsoft | 🔥🔥 |
| 6 | [Search a 2D Matrix II](https://leetcode.com/problems/search-a-2d-matrix-ii) | Medium | Binary Search | Google | 🔥🔥 |
| 7 | [Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas) | Medium | Binary Search on Answer | Amazon, Google, Netflix | 🔥🔥🔥 |
| 8 | [Capacity To Ship Packages Within D Days](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days) | Medium | Binary Search on Answer | Databricks | 🔥🔥 |
| 9 | [Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays) | Hard | Binary Search | Google, Amazon, Apple, Microsoft | 🔥🔥🔥 |
| 10 | [Search Insert Position](https://leetcode.com/problems/search-insert-position) | Easy | Binary Search | Google | 🔥 |

---

## Trees

| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree) | Easy | DFS/BFS | Amazon, Google | 🔥🔥🔥 |
| 2 | [Same Tree](https://leetcode.com/problems/same-tree) | Easy | DFS | Google | 🔥 |
| 3 | [Symmetric Tree](https://leetcode.com/problems/symmetric-tree) | Easy | DFS/BFS | Microsoft | 🔥🔥 |
| 4 | [Balanced Binary Tree](https://leetcode.com/problems/balanced-binary-tree) | Easy | DFS | Adobe, Walmart | 🔥🔥 |
| 5 | [Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree) | Easy | DFS | Amazon | 🔥🔥 |
| 5 | [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal) | Medium | BFS | Google, Amazon, Microsoft, Uber, Intuit | 🔥🔥🔥 |
| 6 | [Binary Tree Zigzag Level Order Traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal) | Medium | BFS | Amazon | 🔥🔥 |
| 7 | [Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view) | Medium | BFS/DFS | Meta | 🔥🔥 |
| 8 | [Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree) | Medium | DFS | Google, Amazon | 🔥🔥🔥 |
| 9 | [Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree) | Medium | DFS | Meta, Amazon, Apple, Google | 🔥🔥🔥 |
| 10 | [Lowest Common Ancestor of a BST](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree) | Medium | BST | LinkedIn, Google | 🔥🔥 |
| 11 | [Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst) | Medium | Inorder | Google, Amazon, Walmart | 🔥🔥 |
| 12 | [Construct Binary Tree from Preorder and Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal) | Medium | Divide & Conquer | Microsoft, Google | 🔥🔥 |
| 13 | [Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree) | Hard | BFS/DFS | Google, Amazon, Apple, Meta, Netflix, Anthropic | 🔥🔥🔥 |
| 14 | [Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum) | Hard | DFS | Google, Amazon, Microsoft | 🔥🔥🔥 |
| 15 | [Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree) | Easy | DFS | Meta, Amazon, Google | 🔥🔥🔥 |
| 16 | [Path Sum III](https://leetcode.com/problems/path-sum-iii) | Medium | DFS + Prefix Sum | Google | 🔥🔥 |
| 17 | [Count Good Nodes in Binary Tree](https://leetcode.com/problems/count-good-nodes-in-binary-tree) | Medium | DFS | Google | 🔥 |
| 18 | [Sum Root to Leaf Numbers](https://leetcode.com/problems/sum-root-to-leaf-numbers) | Medium | DFS | Apple, Google, Flipkart, Microsoft | 🔥🔥 |
| 19 | [Check Completeness of a Binary Tree](https://leetcode.com/problems/check-completeness-of-a-binary-tree) | Medium | BFS | Apple | 🔥 |
| 20 | [Binary Tree Vertical Order Traversal](https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree) | Medium | BFS | Meta | 🔥🔥 |
| 21 | [All Nodes Distance K in Binary Tree](https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree) | Medium | BFS + Graph | Databricks, Google | 🔥🔥 |
| 22 | [Range Sum of BST](https://leetcode.com/problems/range-sum-of-bst) | Easy | BST | Meta | 🔥🔥 |
| 23 | [Find Leaves of Binary Tree](https://leetcode.com/problems/find-leaves-of-binary-tree) | Medium | DFS | Google, LinkedIn | 🔥🔥 |
| 24 | [Maximum Difference Between Node and Ancestor](https://leetcode.com/problems/maximum-difference-between-node-and-ancestor) | Medium | DFS | Amazon, Google | 🔥 |
| 25 | [Amount of Time for Binary Tree to Be Infected](https://leetcode.com/problems/amount-of-time-for-binary-tree-to-be-infected) | Medium | BFS | Google | 🔥 |

---

## Graphs

| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [Number of Islands](https://leetcode.com/problems/number-of-islands) | Medium | DFS/BFS | Google, Amazon, Meta, Apple, Microsoft, Palantir, Anthropic, Adobe | 🔥🔥🔥 |
| 2 | [Clone Graph](https://leetcode.com/problems/clone-graph) | Medium | DFS/BFS | Meta, Microsoft, Amazon, Google, Uber, Apple | 🔥🔥🔥 |
| 3 | [Course Schedule](https://leetcode.com/problems/course-schedule) | Medium | Topological Sort | Amazon, Apple, Palantir | 🔥🔥🔥 |
| 4 | [Course Schedule II](https://leetcode.com/problems/course-schedule-ii) | Medium | Topological Sort | Google, Netflix, Palantir, Anthropic | 🔥🔥🔥 |
| 5 | [Rotting Oranges](https://leetcode.com/problems/rotting-oranges) | Medium | BFS | Amazon, Databricks | 🔥🔥🔥 |
| 6 | [Word Ladder](https://leetcode.com/problems/word-ladder) | Hard | BFS | Google, Amazon, LinkedIn | 🔥🔥🔥 |
| 7 | [Accounts Merge](https://leetcode.com/problems/accounts-merge) | Medium | Union-Find/DFS | Meta, Google | 🔥🔥 |
| 8 | [Making a Large Island](https://leetcode.com/problems/making-a-large-island) | Hard | DFS + Union-Find | Meta, Amazon | 🔥🔥 |
| 9 | [Shortest Path in Binary Matrix](https://leetcode.com/problems/shortest-path-in-binary-matrix) | Medium | BFS | Meta, Microsoft | 🔥🔥 |
| 10 | [Network Delay Time](https://leetcode.com/problems/network-delay-time) | Medium | Dijkstra | Netflix, Google, Uber | 🔥🔥 |
| 11 | [Cheapest Flights Within K Stops](https://leetcode.com/problems/cheapest-flights-within-k-stops) | Medium | BFS/Bellman-Ford | Microsoft, Databricks | 🔥🔥 |
| 12 | [Evaluate Division](https://leetcode.com/problems/evaluate-division) | Medium | DFS/Union-Find | Google | 🔥🔥 |
| 13 | [Alien Dictionary](https://leetcode.com/problems/alien-dictionary) | Hard | Topological Sort | Google, OpenAI, Tesla | 🔥🔥🔥 |
| 14 | [Walls and Gates](https://leetcode.com/problems/walls-and-gates) | Medium | BFS | Google | 🔥🔥 |
| 15 | [Number of Provinces](https://leetcode.com/problems/number-of-provinces) | Medium | Union-Find/DFS | Amazon | 🔥🔥 |
| 16 | [Max Area of Island](https://leetcode.com/problems/max-area-of-island) | Medium | DFS | Palantir | 🔥🔥 |
| 17 | [Flood Fill](https://leetcode.com/problems/flood-fill) | Easy | DFS/BFS | Google, Adobe, Apple | 🔥🔥 |
| 18 | [Surrounded Regions](https://leetcode.com/problems/surrounded-regions) | Medium | DFS/BFS | Google | 🔥🔥 |
| 19 | [Pacific Atlantic Water Flow](https://leetcode.com/problems/pacific-atlantic-water-flow) | Medium | DFS | Google | 🔥 |
| 20 | [Shortest Path in a Grid with Obstacles Elimination](https://leetcode.com/problems/shortest-path-in-a-grid-with-obstacles-elimination) | Hard | BFS | Google | 🔥 |
| 21 | [All Ancestors of a Node in DAG](https://leetcode.com/problems/all-ancestors-of-a-node-in-a-directed-acyclic-graph) | Medium | DFS | Palantir | 🔥 |
| 22 | [Is Graph Bipartite?](https://leetcode.com/problems/is-graph-bipartite) | Medium | BFS/DFS | Google | 🔥 |
| 23 | [Number of Closed Islands](https://leetcode.com/problems/number-of-closed-islands) | Medium | DFS | Google | 🔥 |
| 24 | [Longest Increasing Path in a Matrix](https://leetcode.com/problems/longest-increasing-path-in-a-matrix) | Hard | DFS + Memo | Meta, Google, Microsoft, Uber, Adobe | 🔥🔥 |
| 25 | [Bus Routes](https://leetcode.com/problems/bus-routes) | Hard | BFS | Apple | 🔥 |

---

## Heap / Priority Queue

| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array) | Medium | Heap/Quickselect | Google, Amazon, Meta | 🔥🔥🔥 |
| 2 | [K Closest Points to Origin](https://leetcode.com/problems/k-closest-points-to-origin) | Medium | Heap | Amazon, Google, Databricks | 🔥🔥🔥 |
| 3 | [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream) | Hard | Two Heaps | Amazon, Netflix, Google, Apple | 🔥🔥🔥 |
| 4 | [Task Scheduler](https://leetcode.com/problems/task-scheduler) | Medium | Heap + Greedy | Amazon, Google | 🔥🔥🔥 |
| 5 | [Reorganize String](https://leetcode.com/problems/reorganize-string) | Medium | Heap | Amazon, Tesla | 🔥🔥 |
| 6 | [Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii) | Medium | Heap | Google, Netflix, OpenAI | 🔥🔥🔥 |
| 7 | [Smallest Range Covering Elements from K Lists](https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists) | Hard | Heap | Google | 🔥 |
| 8 | [Sort Characters By Frequency](https://leetcode.com/problems/sort-characters-by-frequency) | Medium | Heap/Bucket Sort | Google | 🔥 |
| 9 | [Find K Pairs with Smallest Sums](https://leetcode.com/problems/find-k-pairs-with-smallest-sums) | Medium | Heap | Google | 🔥 |
| 10 | [K-th Smallest Prime Fraction](https://leetcode.com/problems/k-th-smallest-prime-fraction) | Medium | Binary Search/Heap | Google | 🔥 |

---

## Dynamic Programming

| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [Climbing Stairs](https://leetcode.com/problems/climbing-stairs) | Easy | 1D DP | Amazon | 🔥🔥 |
| 2 | [House Robber](https://leetcode.com/problems/house-robber) | Medium | 1D DP | Google | 🔥🔥 |
| 3 | [House Robber II](https://leetcode.com/problems/house-robber-ii) | Medium | 1D DP | LinkedIn | 🔥 |
| 4 | [Coin Change](https://leetcode.com/problems/coin-change) | Medium | Unbounded Knapsack | Google, Amazon | 🔥🔥🔥 |
| 5 | [Coin Change II](https://leetcode.com/problems/coin-change-ii) | Medium | Unbounded Knapsack | Amazon | 🔥🔥 |
| 6 | [Word Break](https://leetcode.com/problems/word-break) | Medium | DP + Trie | Meta, Amazon, Apple, Databricks, Anthropic | 🔥🔥🔥 |
| 7 | [Word Break II](https://leetcode.com/problems/word-break-ii) | Hard | DP + Backtracking | Amazon | 🔥🔥 |
| 8 | [Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring) | Medium | Expand Around Center | Amazon, Google, Meta | 🔥🔥🔥 |
| 9 | [Decode Ways](https://leetcode.com/problems/decode-ways) | Medium | 1D DP | Meta, LinkedIn | 🔥🔥 |
| 10 | [Unique Paths](https://leetcode.com/problems/unique-paths) | Medium | 2D DP | Google, Uber, Amazon, Adobe | 🔥🔥 |
| 11 | [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence) | Medium | DP + Binary Search | Google, Amazon | 🔥🔥🔥 |
| 12 | [Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray) | Medium | DP | Amazon, LinkedIn, Microsoft | 🔥🔥 |
| 13 | [Jump Game](https://leetcode.com/problems/jump-game) | Medium | Greedy/DP | Google, Amazon | 🔥🔥 |
| 14 | [Jump Game II](https://leetcode.com/problems/jump-game-ii) | Medium | Greedy | Google | 🔥🔥 |
| 15 | [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock) | Easy | DP/Greedy | Meta, Amazon, Apple, Microsoft | 🔥🔥🔥 |
| 16 | [Edit Distance](https://leetcode.com/problems/edit-distance) | Hard | 2D DP | Google, Netflix, LinkedIn, Uber, Adobe | 🔥🔥🔥 |
| 17 | [Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence) | Medium | 2D DP | Google | 🔥🔥 |
| 18 | [Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum) | Medium | 0/1 Knapsack | Google, Amazon, Uber, Flipkart | 🔥🔥 |
| 19 | [Burst Balloons](https://leetcode.com/problems/burst-balloons) | Hard | Interval DP | Google | 🔥🔥 |
| 20 | [Regular Expression Matching](https://leetcode.com/problems/regular-expression-matching) | Hard | 2D DP | Microsoft, Palantir | 🔥🔥 |
| 21 | [Maximum Profit in Job Scheduling](https://leetcode.com/problems/maximum-profit-in-job-scheduling) | Hard | DP + Binary Search | Apple | 🔥🔥 |
| 22 | [N-th Tribonacci Number](https://leetcode.com/problems/n-th-tribonacci-number) | Easy | 1D DP | Google | 🔥 |
| 23 | [Number of Dice Rolls With Target Sum](https://leetcode.com/problems/number-of-dice-rolls-with-target-sum) | Medium | DP | Google | 🔥 |
| 24 | [Frog Jump](https://leetcode.com/problems/frog-jump) | Hard | DP | Google | 🔥 |
| 25 | [Split Array Largest Sum](https://leetcode.com/problems/split-array-largest-sum) | Hard | Binary Search + DP | Google | 🔥 |

---

## Backtracking

| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [Subsets](https://leetcode.com/problems/subsets) | Medium | Backtracking | Meta, Amazon | 🔥🔥🔥 |
| 2 | [Permutations](https://leetcode.com/problems/permutations) | Medium | Backtracking | Meta, Google | 🔥🔥🔥 |
| 3 | [Permutations II](https://leetcode.com/problems/permutations-ii) | Medium | Backtracking | Google | 🔥 |
| 4 | [Combination Sum](https://leetcode.com/problems/combination-sum) | Medium | Backtracking | Google, Microsoft, Amazon | 🔥🔥🔥 |
| 5 | [Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number) | Medium | Backtracking | Meta, Google | 🔥🔥🔥 |
| 6 | [Word Search](https://leetcode.com/problems/word-search) | Medium | Backtracking | Google | 🔥🔥 |
| 7 | [Word Search II](https://leetcode.com/problems/word-search-ii) | Hard | Backtracking + Trie | Google | 🔥🔥 |
| 8 | [N-Queens](https://leetcode.com/problems/n-queens) | Hard | Backtracking | Google | 🔥🔥 |
| 9 | [Palindrome Partitioning](https://leetcode.com/problems/palindrome-partitioning) | Medium | Backtracking | Google | 🔥 |
| 10 | [Generate Parentheses](https://leetcode.com/problems/generate-parentheses) | Medium | Backtracking | Google | 🔥🔥 |
| 11 | [Remove Invalid Parentheses](https://leetcode.com/problems/remove-invalid-parentheses) | Hard | BFS/Backtracking | Meta | 🔥🔥 |
| 12 | [Expression Add Operators](https://leetcode.com/problems/expression-add-operators) | Hard | Backtracking | Meta | 🔥 |
| 13 | [Sudoku Solver](https://leetcode.com/problems/sudoku-solver) | Hard | Backtracking | Microsoft | 🔥 |

---

## Intervals

| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [Merge Intervals](https://leetcode.com/problems/merge-intervals) | Medium | Sorting | Google, Amazon, Meta, Apple, Netflix, Palantir, LinkedIn | 🔥🔥🔥 |
| 2 | [Insert Interval](https://leetcode.com/problems/insert-interval) | Medium | Intervals | Google | 🔥🔥 |
| 3 | [Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals) | Medium | Greedy | Google | 🔥🔥 |
| 4 | [Meeting Rooms](https://leetcode.com/problems/meeting-rooms) | Easy | Sorting | Google | 🔥 |
| 5 | [Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii) | Medium | Heap | Google, Netflix, OpenAI | 🔥🔥🔥 |
| 6 | [Meeting Rooms III](https://leetcode.com/problems/meeting-rooms-iii) | Hard | Heap | Google | 🔥 |
| 7 | [Minimum Number of Arrows to Burst Balloons](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons) | Medium | Greedy | Google | 🔥 |
| 8 | [Employee Free Time](https://leetcode.com/problems/employee-free-time) | Hard | Heap | Google | 🔥 |

---

## Trie

| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree) | Medium | Trie | Google, Netflix, OpenAI, Tesla, Anthropic, Uber, Salesforce, Amazon | 🔥🔥🔥 |
| 2 | [Design Add and Search Words Data Structure](https://leetcode.com/problems/design-add-and-search-words-data-structure) | Medium | Trie + DFS | LinkedIn, Google | 🔥🔥 |
| 3 | [Search Suggestions System](https://leetcode.com/problems/search-suggestions-system) | Medium | Trie | Google | 🔥🔥 |
| 4 | [Word Search II](https://leetcode.com/problems/word-search-ii) | Hard | Trie + Backtracking | Google | 🔥🔥 |

---

## Design

| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [LRU Cache](https://leetcode.com/problems/lru-cache) | Medium | Hash + DLL | Google, Amazon, Meta, Apple, Microsoft, Netflix, OpenAI, Palantir, Tesla, Databricks, LinkedIn, Anthropic | 🔥🔥🔥 |
| 2 | [LFU Cache](https://leetcode.com/problems/lfu-cache) | Hard | Hash + DLL | Amazon, OpenAI, Google | 🔥🔥 |
| 3 | [Insert Delete GetRandom O(1)](https://leetcode.com/problems/insert-delete-getrandom-o1) | Medium | Hash + Array | Amazon, LinkedIn | 🔥🔥 |
| 4 | [Design Hit Counter](https://leetcode.com/problems/design-hit-counter) | Medium | Queue/Array | Netflix, Databricks, Anthropic | 🔥🔥 |
| 5 | [Design Tic-Tac-Toe](https://leetcode.com/problems/design-tic-tac-toe) | Medium | Design | Meta | 🔥🔥 |
| 6 | [Time Based Key-Value Store](https://leetcode.com/problems/time-based-key-value-store) | Medium | Hash + Binary Search | OpenAI, Databricks, Anthropic | 🔥🔥 |
| 7 | [Snapshot Array](https://leetcode.com/problems/snapshot-array) | Medium | Hash + Binary Search | OpenAI, Databricks | 🔥🔥 |
| 8 | [Dot Product of Two Sparse Vectors](https://leetcode.com/problems/dot-product-of-two-sparse-vectors) | Medium | Hash Map | Meta | 🔥🔥🔥 |
| 9 | [Design In-Memory File System](https://leetcode.com/problems/design-in-memory-file-system) | Hard | Trie/Tree | Amazon, Google | 🔥🔥 |
| 10 | [Design Search Autocomplete System](https://leetcode.com/problems/design-search-autocomplete-system) | Hard | Trie + Heap | Amazon | 🔥🔥 |
| 11 | [Max Stack](https://leetcode.com/problems/max-stack) | Hard | Stack + Tree | LinkedIn, Databricks | 🔥🔥 |
| 12 | [All O'one Data Structure](https://leetcode.com/problems/all-oone-data-structure) | Hard | Hash + DLL | LinkedIn, Databricks | 🔥 |
| 13 | [Nested List Weight Sum](https://leetcode.com/problems/nested-list-weight-sum) | Medium | DFS | Meta, LinkedIn | 🔥🔥 |
| 14 | [Nested List Weight Sum II](https://leetcode.com/problems/nested-list-weight-sum-ii) | Medium | DFS | LinkedIn | 🔥 |
| 15 | [Design HashMap](https://leetcode.com/problems/design-hashmap) | Easy | Design | Tesla | 🔥 |
| 16 | [Design Underground System](https://leetcode.com/problems/design-underground-system) | Medium | Design | Tesla | 🔥 |
| 17 | [Web Crawler Multithreaded](https://leetcode.com/problems/web-crawler-multithreaded) | Medium | BFS + Threads | OpenAI, Anthropic | 🔥🔥 |
| 18 | [Random Pick with Weight](https://leetcode.com/problems/random-pick-with-weight) | Medium | Prefix Sum + Binary Search | Meta | 🔥🔥 |

---

## Matrix

| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [Valid Sudoku](https://leetcode.com/problems/valid-sudoku) | Medium | Hash Set | Google, Amazon | 🔥🔥 |
| 2 | [Spiral Matrix](https://leetcode.com/problems/spiral-matrix) | Medium | Simulation | Google | 🔥🔥 |
| 3 | [Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes) | Medium | In-place | Microsoft, Google | 🔥🔥 |
| 4 | [01 Matrix](https://leetcode.com/problems/01-matrix) | Medium | BFS | Google, Uber, Intuit | 🔥🔥 |
| 5 | [Game of Life](https://leetcode.com/problems/game-of-life) | Medium | Simulation | OpenAI | 🔥 |
| 6 | [Toeplitz Matrix](https://leetcode.com/problems/toeplitz-matrix) | Easy | Matrix | Meta | 🔥 |
| 7 | [Diagonal Traverse](https://leetcode.com/problems/diagonal-traverse) | Medium | Matrix | Meta | 🔥 |

---

## Greedy

| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [Candy](https://leetcode.com/problems/candy) | Hard | Greedy | Google | 🔥 |
| 2 | [Gas Station](https://leetcode.com/problems/gas-station) | Medium | Greedy | Google | 🔥 |
| 3 | [H-Index](https://leetcode.com/problems/h-index) | Medium | Sorting/Counting | Google | 🔥 |

---

## Math / Bit Manipulation

| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [Pow(x, n)](https://leetcode.com/problems/powx-n) | Medium | Binary Exponentiation | Meta, Google | 🔥🔥 |
| 2 | [Happy Number](https://leetcode.com/problems/happy-number) | Easy | Floyd's Cycle | Google | 🔥 |
| 3 | [Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits) | Easy | Bit Manipulation | Tesla, Google | 🔥 |
| 4 | [Reverse Bits](https://leetcode.com/problems/reverse-bits) | Easy | Bit Manipulation | Tesla | 🔥 |
| 5 | [Single Number](https://leetcode.com/problems/single-number) | Easy | XOR | Tesla | 🔥 |
| 6 | [Counting Bits](https://leetcode.com/problems/counting-bits) | Medium | Bit Manipulation | Tesla | 🔥 |
| 7 | [Sum of Two Integers](https://leetcode.com/problems/sum-of-two-integers) | Medium | Bit Manipulation | Tesla | 🔥 |
| 8 | [Missing Number](https://leetcode.com/problems/missing-number) | Easy | Math/XOR | Microsoft | 🔥 |

---

## Divide and Conquer

| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [Majority Element](https://leetcode.com/problems/majority-element) | Easy | Boyer-Moore | Google | 🔥 |
| 2 | [Longest Substring with At Least K Repeating Characters](https://leetcode.com/problems/longest-substring-with-at-least-k-repeating-characters) | Medium | Divide & Conquer | Google | 🔥 |

---

## Concurrency

| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [Print in Order](https://leetcode.com/problems/print-in-order) | Easy | Concurrency | Databricks | 🔥 |
| 2 | [Print FooBar Alternately](https://leetcode.com/problems/print-foobar-alternately) | Medium | Concurrency | Databricks | 🔥 |
| 3 | [Building H2O](https://leetcode.com/problems/building-h2o) | Medium | Concurrency | Databricks | 🔥 |
| 4 | [The Dining Philosophers](https://leetcode.com/problems/the-dining-philosophers) | Medium | Concurrency | Databricks | 🔥 |
| 5 | [Fizz Buzz Multithreaded](https://leetcode.com/problems/fizz-buzz-multithreaded) | Medium | Concurrency | Databricks | 🔥 |

---

## Non-LeetCode / Custom Interview Problems

> These are actual interview questions reported from candidates that don't have direct LeetCode equivalents. Very important for OpenAI, Anthropic, Google, and Palantir interviews.

### OpenAI Custom Problems

| # | Problem | Difficulty | Pattern | Description |
|---|---------|------------|---------|-------------|
| 1 | KV Store Serialize/Deserialize | Hard | Design / Strings | Multi-part: serialization, file persistence, multithreading, versioned store |
| 2 | CD Directory Navigation | Hard | String / Path Resolution | Implement `cd()` with relative/absolute paths, `..`, `.`, `~`, symlink cycle detection |
| 3 | Excel/Spreadsheet Engine | Hard | Graph / Design | Cell get/set with formula dependencies, circular dependency detection |
| 4 | In-Memory Database | Hard | Database Design | Implement `select()` with WHERE, AND, ORDER BY (no SQL parsing) |
| 5 | Resumable Iterator | Hard | Iterator / State | Stateful iterator with `getState()`/`setState()`, nested structures, async |
| 6 | Async Node Counting | Hard | Distributed / Trees | Count tree nodes using only async parent-child messaging |
| 7 | Toy Language Interpreter | Hard | Parsing / Compilers | 75-min round: lexer, parser, evaluator for variables, arithmetic, control flow |

### Anthropic Custom Problems

| # | Problem | Difficulty | Pattern | Description |
|---|---------|------------|---------|-------------|
| 1 | In-Memory Database | Hard | Design | 4 levels: SET/GET/DELETE → filtered scans → TTL → backup/restore |
| 2 | Web Crawler | Hard | BFS / Concurrency | BFS crawl → multithreaded/async optimization |
| 3 | LRU Cache (Bugfix + Extend) | Hard | Design / Debugging | Fix bugs in given code, add persistence, handle `*args`/`**kwargs` |
| 4 | Stack Trace / Profiler | Hard | Parsing / Design | Convert sampling profiler data to chronological events |
| 5 | Tokenization Engine | Hard | String / NLP | Code review, tokenize/detokenize with vocabulary coverage |
| 6 | Distributed Mode/Median | Hard | Distributed Systems | Compute statistics across 10 nodes with bandwidth constraints |

### Google Custom Problems

| # | Problem | Difficulty | Pattern | Description |
|---|---------|------------|---------|-------------|
| 1 | File System Size Analysis | Medium | Tree / Design | Calculate sizes of files/folders, find largest files, report largest folders |
| 2 | Remove Duplicate Messages | Medium | Hash Map + Time | Remove duplicate messages within 10-second window |
| 3 | Train Ticket / Range Query | Medium | Intervals / Design | Range query problem for train ticket booking |
| 4 | Car Rental Optimization | Medium | Greedy / Intervals | Optimize car rental scheduling |
| 5 | Count Islands in Binary Trees | Medium | Trees / DFS | Variant of island counting on binary tree structure |

### Palantir Custom Problems

| # | Problem | Difficulty | Pattern | Description |
|---|---------|------------|---------|-------------|
| 1 | Decomposition Interview | N/A | System Thinking | "Design technology to help elderly people with poor vision cook safely" |
| 2 | Re-engineering/Debugging | Hard | Debugging | Debug 500-1000 lines of pre-written code with intentional bugs |
| 3 | Contact Tracing Bug | Medium | Graph / Hash | Find double-counting bug in contact tracing implementation |

### General Custom Problems (Multiple Companies)

| # | Problem | Difficulty | Pattern | Companies | Description |
|---|---------|------------|---------|-----------|-------------|
| 1 | Remove Bad Pairs from String | Medium | Stack | Google | Remove adjacent chars with same letter in different cases (e.g., `xX`, `Aa`) |
| 2 | Interns and Flats Assignment | Medium | Greedy / Sorting | Google | Assign interns to flats minimizing distance or maximizing satisfaction |
| 3 | Song Shuffler | Easy | Fisher-Yates | Google | Implement shuffle where every permutation is equally likely |
| 4 | Graph to Binary Tree (Alternating Colors) | Hard | BFS/DFS | Google | Find root such that tree has alternating colors at each level |
| 5 | Find Root Node (Color Pattern) | Hard | Tree Traversal | Google | Find valid root satisfying level-wise color constraints (e.g., RBW pattern) |
| 6 | String Template Substitution | Medium | Parsing / Recursion | Google | Replace placeholders with nested substitution support |
| 7 | Meeting Point Optimization | Medium | BFS / Shortest Path | Google | Find optimal meeting location minimizing total/max travel time |
| 8 | Web Content Parsing | Medium | Tree / BFS/DFS | Google | Parse HTML into tree and perform traversal operations |
| 9 | Expression Evaluation & Simplify | Hard | Stack / Parsing | Google | Parse and simplify mathematical expressions with variables |
| 10 | Remove Duplicates (Order Preserve) | Easy | Hash Set | Google | Remove duplicates while preserving original/reverse order |
| 11 | Common Interval Intersection | Easy | Intervals | Google | Check if all intervals overlap at least at one point |
| 12 | File Search & Directory Traversal | Medium | DFS/BFS / Design | Google | Design system to traverse directories with filters |
| 13 | String Variable Resolution | Medium | Parsing / Graph | Google | Resolve strings with variable references and dynamic updates |
| 14 | Top K Chat Contributors | Easy | Hash + Heap | Google | Find top k contributors from chat logs by message count |
| 15 | Job Scheduling Algorithms | Medium | Simulation | Google | Implement FCFS, priority scheduling for job management |

---

## Quick Reference by Company

### Google (Top 30 Most Frequent)

| # | Problem | Difficulty |
|---|---------|------------|
| 1 | [Two Sum](https://leetcode.com/problems/two-sum) | Easy |
| 2 | [Number of Islands](https://leetcode.com/problems/number-of-islands) | Medium |
| 3 | [Merge Intervals](https://leetcode.com/problems/merge-intervals) | Medium |
| 4 | [LRU Cache](https://leetcode.com/problems/lru-cache) | Medium |
| 5 | [Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree) | Medium |
| 6 | [Course Schedule II](https://leetcode.com/problems/course-schedule-ii) | Medium |
| 7 | [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters) | Medium |
| 8 | [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water) | Hard |
| 9 | [Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree) | Hard |
| 10 | [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array) | Medium |
| 11 | [Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays) | Hard |
| 12 | [Group Anagrams](https://leetcode.com/problems/group-anagrams) | Medium |
| 13 | [Word Ladder](https://leetcode.com/problems/word-ladder) | Hard |
| 14 | [Merge K Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists) | Hard |
| 15 | [Container With Most Water](https://leetcode.com/problems/container-with-most-water) | Medium |
| 16 | [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements) | Medium |
| 17 | [Coin Change](https://leetcode.com/problems/coin-change) | Medium |
| 18 | [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array) | Medium |
| 19 | [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self) | Medium |
| 20 | [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal) | Medium |
| 21 | [Combination Sum](https://leetcode.com/problems/combination-sum) | Medium |
| 22 | [Edit Distance](https://leetcode.com/problems/edit-distance) | Hard |
| 23 | [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring) | Hard |
| 24 | [Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree) | Medium |
| 25 | [Accounts Merge](https://leetcode.com/problems/accounts-merge) | Medium |
| 26 | [Alien Dictionary](https://leetcode.com/problems/alien-dictionary) | Hard |
| 27 | [Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum) | Hard |
| 28 | [Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree) | Medium |
| 29 | [Clone Graph](https://leetcode.com/problems/clone-graph) | Medium |
| 30 | [Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum) | Hard |

### Amazon (Top 25 Most Frequent)

| # | Problem | Difficulty |
|---|---------|------------|
| 1 | [Two Sum](https://leetcode.com/problems/two-sum) | Easy |
| 2 | [Number of Islands](https://leetcode.com/problems/number-of-islands) | Medium |
| 3 | [LRU Cache](https://leetcode.com/problems/lru-cache) | Medium |
| 4 | [Merge Intervals](https://leetcode.com/problems/merge-intervals) | Medium |
| 5 | [Group Anagrams](https://leetcode.com/problems/group-anagrams) | Medium |
| 6 | [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements) | Medium |
| 7 | [Task Scheduler](https://leetcode.com/problems/task-scheduler) | Medium |
| 8 | [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water) | Hard |
| 9 | [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self) | Medium |
| 10 | [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters) | Medium |
| 11 | [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring) | Hard |
| 12 | [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array) | Medium |
| 13 | [Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists) | Hard |
| 14 | [Course Schedule](https://leetcode.com/problems/course-schedule) | Medium |
| 15 | [Rotting Oranges](https://leetcode.com/problems/rotting-oranges) | Medium |
| 16 | [Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree) | Hard |
| 17 | [Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree) | Medium |
| 18 | [Coin Change](https://leetcode.com/problems/coin-change) | Medium |
| 19 | [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock) | Easy |
| 20 | [Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum) | Hard |
| 21 | [3Sum](https://leetcode.com/problems/3sum) | Medium |
| 22 | [Maximum Subarray](https://leetcode.com/problems/maximum-subarray) | Medium |
| 23 | [Decode String](https://leetcode.com/problems/decode-string) | Medium |
| 24 | [Reorganize String](https://leetcode.com/problems/reorganize-string) | Medium |
| 25 | [Insert Delete GetRandom O(1)](https://leetcode.com/problems/insert-delete-getrandom-o1) | Medium |

### Meta (Top 20 Most Frequent)

| # | Problem | Difficulty |
|---|---------|------------|
| 1 | [Minimum Remove to Make Valid Parentheses](https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses) | Medium |
| 2 | [Valid Palindrome II](https://leetcode.com/problems/valid-palindrome-ii) | Easy |
| 3 | [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k) | Medium |
| 4 | [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self) | Medium |
| 5 | [Basic Calculator II](https://leetcode.com/problems/basic-calculator-ii) | Medium |
| 6 | [Buildings With an Ocean View](https://leetcode.com/problems/buildings-with-an-ocean-view) | Medium |
| 7 | [Binary Tree Vertical Order Traversal](https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree) | Medium |
| 8 | [Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree) | Medium |
| 9 | [Clone Graph](https://leetcode.com/problems/clone-graph) | Medium |
| 10 | [Number of Islands](https://leetcode.com/problems/number-of-islands) | Medium |
| 11 | [Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number) | Medium |
| 12 | [Random Pick with Weight](https://leetcode.com/problems/random-pick-with-weight) | Medium |
| 13 | [Merge Intervals](https://leetcode.com/problems/merge-intervals) | Medium |
| 14 | [LRU Cache](https://leetcode.com/problems/lru-cache) | Medium |
| 15 | [Dot Product of Two Sparse Vectors](https://leetcode.com/problems/dot-product-of-two-sparse-vectors) | Medium |
| 16 | [Copy List with Random Pointer](https://leetcode.com/problems/copy-list-with-random-pointer) | Medium |
| 17 | [Valid Palindrome](https://leetcode.com/problems/valid-palindrome) | Easy |
| 18 | [Move Zeroes](https://leetcode.com/problems/move-zeroes) | Easy |
| 19 | [Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree) | Easy |
| 20 | [Add Strings](https://leetcode.com/problems/add-strings) | Easy |

### Microsoft (Top 15 Most Frequent)

| # | Problem | Difficulty |
|---|---------|------------|
| 1 | [Two Sum](https://leetcode.com/problems/two-sum) | Easy |
| 2 | [LRU Cache](https://leetcode.com/problems/lru-cache) | Medium |
| 3 | [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters) | Medium |
| 4 | [Add Two Numbers](https://leetcode.com/problems/add-two-numbers) | Medium |
| 5 | [Number of Islands](https://leetcode.com/problems/number-of-islands) | Medium |
| 6 | [Maximum Subarray](https://leetcode.com/problems/maximum-subarray) | Medium |
| 7 | [Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists) | Easy |
| 8 | [Copy List with Random Pointer](https://leetcode.com/problems/copy-list-with-random-pointer) | Medium |
| 9 | [Rotate Image](https://leetcode.com/problems/rotate-image) | Medium |
| 10 | [Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes) | Medium |
| 11 | [Clone Graph](https://leetcode.com/problems/clone-graph) | Medium |
| 12 | [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal) | Medium |
| 13 | [Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays) | Hard |
| 14 | [Regular Expression Matching](https://leetcode.com/problems/regular-expression-matching) | Hard |
| 15 | [Reverse Nodes in k-Group](https://leetcode.com/problems/reverse-nodes-in-k-group) | Hard |

### Apple (Top 15 Most Frequent)

| # | Problem | Difficulty |
|---|---------|------------|
| 1 | [Two Sum](https://leetcode.com/problems/two-sum) | Easy |
| 2 | [LRU Cache](https://leetcode.com/problems/lru-cache) | Medium |
| 3 | [Number of Islands](https://leetcode.com/problems/number-of-islands) | Medium |
| 4 | [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list) | Easy |
| 5 | [Group Anagrams](https://leetcode.com/problems/group-anagrams) | Medium |
| 6 | [Valid Parentheses](https://leetcode.com/problems/valid-parentheses) | Easy |
| 7 | [Merge Intervals](https://leetcode.com/problems/merge-intervals) | Medium |
| 8 | [Word Break](https://leetcode.com/problems/word-break) | Medium |
| 9 | [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self) | Medium |
| 10 | [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock) | Easy |
| 11 | [3Sum](https://leetcode.com/problems/3sum) | Medium |
| 12 | [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water) | Hard |
| 13 | [Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements) | Medium |
| 14 | [Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree) | Medium |
| 15 | [Serialize and Deserialize Binary Tree](https://leetcode.com/problems/serialize-and-deserialize-binary-tree) | Hard |

### Netflix (Top 10 Most Frequent)

| # | Problem | Difficulty |
|---|---------|------------|
| 1 | [LRU Cache](https://leetcode.com/problems/lru-cache) | Medium |
| 2 | [Design Hit Counter](https://leetcode.com/problems/design-hit-counter) | Medium |
| 3 | [Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree) | Medium |
| 4 | [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream) | Hard |
| 5 | [Merge Intervals](https://leetcode.com/problems/merge-intervals) | Medium |
| 6 | [Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii) | Medium |
| 7 | [Course Schedule II](https://leetcode.com/problems/course-schedule-ii) | Medium |
| 8 | [Network Delay Time](https://leetcode.com/problems/network-delay-time) | Medium |
| 9 | [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water) | Hard |
| 10 | [Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas) | Medium |

### LinkedIn (Top 10 Most Frequent)

| # | Problem | Difficulty |
|---|---------|------------|
| 1 | [Nested List Weight Sum](https://leetcode.com/problems/nested-list-weight-sum) | Medium |
| 2 | [Max Stack](https://leetcode.com/problems/max-stack) | Hard |
| 3 | [All O'one Data Structure](https://leetcode.com/problems/all-oone-data-structure) | Hard |
| 4 | [Find Leaves of Binary Tree](https://leetcode.com/problems/find-leaves-of-binary-tree) | Medium |
| 5 | [Find the Celebrity](https://leetcode.com/problems/find-the-celebrity) | Medium |
| 6 | [Maximum Subarray](https://leetcode.com/problems/maximum-subarray) | Medium |
| 7 | [Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray) | Medium |
| 8 | [Edit Distance](https://leetcode.com/problems/edit-distance) | Medium |
| 9 | [Merge Intervals](https://leetcode.com/problems/merge-intervals) | Medium |
| 10 | [Insert Delete GetRandom O(1)](https://leetcode.com/problems/insert-delete-getrandom-o1) | Medium |

### OpenAI (Top 10 Most Frequent)

| # | Problem | Difficulty |
|---|---------|------------|
| 1 | [LRU Cache](https://leetcode.com/problems/lru-cache) | Medium |
| 2 | [Time Based Key-Value Store](https://leetcode.com/problems/time-based-key-value-store) | Medium |
| 3 | [Snapshot Array](https://leetcode.com/problems/snapshot-array) | Medium |
| 4 | [Alien Dictionary](https://leetcode.com/problems/alien-dictionary) | Hard |
| 5 | [Web Crawler Multithreaded](https://leetcode.com/problems/web-crawler-multithreaded) | Medium |
| 6 | [LFU Cache](https://leetcode.com/problems/lfu-cache) | Hard |
| 7 | [Design Memory Allocator](https://leetcode.com/problems/design-memory-allocator) | Medium |
| 8 | [Game of Life](https://leetcode.com/problems/game-of-life) | Medium |
| 9 | [Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii) | Medium |
| 10 | [Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree) | Medium |

### Databricks (Top 10 Most Frequent)

| # | Problem | Difficulty |
|---|---------|------------|
| 1 | [Capacity To Ship Packages Within D Days](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days) | Medium |
| 2 | [Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water) | Hard |
| 3 | [Max Stack](https://leetcode.com/problems/max-stack) | Hard |
| 4 | [Word Break](https://leetcode.com/problems/word-break) | Medium |
| 5 | [Rotting Oranges](https://leetcode.com/problems/rotting-oranges) | Medium |
| 6 | [All Nodes Distance K in Binary Tree](https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree) | Medium |
| 7 | [Decode String](https://leetcode.com/problems/decode-string) | Medium |
| 8 | [Design Hit Counter](https://leetcode.com/problems/design-hit-counter) | Medium |
| 9 | [Time Based Key-Value Store](https://leetcode.com/problems/time-based-key-value-store) | Medium |
| 10 | [Asteroid Collision](https://leetcode.com/problems/asteroid-collision) | Medium |

---

## Recently Reported Interview Questions (2025-2026)

> Questions collected from LeetCode Discuss, Glassdoor, and other interview experience platforms. These are actual questions reported by candidates in recent interviews.

### Google (Recent Reports from LeetCode Discuss & Glassdoor)

| # | Problem | Difficulty | Source/Context |
|---|---------|------------|----------------|
| 1 | [Number of Islands in a Tree](https://leetcode.com/problems/number-of-islands/) (Variant) | Medium | Phone Screen Jan 2025 - Binary tree variant |
| 2 | [Sliding Window - Bottle Split](https://leetcode.com/problems/sliding-window-maximum/) (Custom) | Medium | Sep 2025 - Split x and y bottles between boxes |
| 3 | [Bit Manipulation Problem](https://leetcode.com/tag/bit-manipulation/) | Medium | Oct 2025 - University Graduate 2026 |
| 4 | [Inverted Index / Jumping Game](https://leetcode.com/problems/jump-game/) (Variant) | Medium | Glassdoor 2025 |
| 5 | [Maximum Rectangle Area from Coordinates](https://leetcode.com/problems/maximal-rectangle/) | Hard | New Grad 2025 |
| 6 | [Word Ladder II](https://leetcode.com/problems/word-ladder-ii/) | Hard | Google 2026 Prep - Recommended |
| 7 | [Alien Dictionary](https://leetcode.com/problems/alien-dictionary/) | Hard | Google 2026 Prep - Recommended |
| 8 | [Consecutive 0s followed by 1s (One Pass)](https://leetcode.com/tag/string/) | Medium | Senior SWE Mar 2026 Vancouver |
| 9 | [Stack-based Problem](https://leetcode.com/tag/stack/) | Medium | Glassdoor - String manipulation |
| 10 | [Backtracking Problem](https://leetcode.com/tag/backtracking/) | Medium | Glassdoor - Common theme |
| 11 | [Array DFS with Follow-ups](https://leetcode.com/tag/depth-first-search/) | Medium | Glassdoor - Main loop rounds |
| 12 | [Design Google Search](https://leetcode.com/tag/design/) | Hard | System Design - L4+ |
| 13 | [Design YouTube](https://leetcode.com/tag/design/) | Hard | System Design - L4+ |
| 14 | [Design Google Drive](https://leetcode.com/tag/design/) | Hard | System Design - L4+ |

### Amazon (Recent Reports from LeetCode Discuss & Glassdoor)

| # | Problem | Difficulty | Source/Context |
|---|---------|------------|----------------|
| 1 | [Remove All Adjacent Duplicates in String II](https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string-ii/) | Medium | SDE 2025 Batch - Selected |
| 2 | [Nodes at K Distance in Binary Tree](https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/) | Medium | SDE-1 Feb 2025 |
| 3 | [Lowest Common Ancestor of Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/) | Medium | SDE-1 Feb 2025 |
| 4 | [Car Pooling](https://leetcode.com/problems/car-pooling/) | Medium | SDE2 Feb 2026 - Selected |
| 5 | [Dijkstra/Graph Problem](https://leetcode.com/tag/shortest-path/) | Hard | SDE2 Feb 2026 |
| 6 | [Count Complete Tree Nodes](https://leetcode.com/problems/count-complete-tree-nodes/) | Medium | SDE-1 Jan 2025 - Selected |
| 7 | [Sort Characters By Frequency](https://leetcode.com/problems/sort-characters-by-frequency/) | Medium | SDE-1 Jan 2025 |
| 8 | [Longest Repeating Substring](https://leetcode.com/problems/longest-repeating-substring/) | Medium | SDE-1 Jan 2025 |
| 9 | [Binary Tree to BST Conversion](https://leetcode.com/tag/binary-search-tree/) | Medium | SDE Intern 2025-2026 |
| 10 | [Jump Game Variation](https://leetcode.com/problems/jump-game/) | Medium | SDE Intern - Medium-Hard |
| 11 | [Brick Wall](https://leetcode.com/problems/brick-wall/) | Medium | SDE Intern |
| 12 | [Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/) | Hard | Phone Screen - With follow-ups |
| 13 | [Kth Largest Element](https://leetcode.com/problems/kth-largest-element-in-an-array/) | Medium | Common - Min-heap approach |
| 14 | [Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/) | Hard | Common - Two heaps |
| 15 | [Merge K Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/) | Hard | Common - Min-heap O(n log k) |
| 16 | [Smallest Number in Infinite Set](https://leetcode.com/problems/smallest-number-in-infinite-set/) | Medium | Heap + Set approach |
| 17 | [Coin Change (DP)](https://leetcode.com/problems/coin-change/) | Medium | Basic DSA - Common |
| 18 | [DFS Problem](https://leetcode.com/tag/depth-first-search/) | Medium | Phone Screen - Common |
| 19 | Real-Time Error Log Monitoring System | Hard | System Design SDE2 - 1M+ writes/sec |

### Microsoft (Recent Reports from LeetCode Discuss & Glassdoor)

| # | Problem | Difficulty | Source/Context |
|---|---------|------------|----------------|
| 1 | [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) | Easy | Senior SWE Mar 2025 |
| 2 | [Best Time to Buy and Sell Stock III](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/) | Hard | Follow-up - At most 2 transactions |
| 3 | [Meeting Rooms II](https://leetcode.com/problems/meeting-rooms-ii/) | Medium | SDE 2 - DSA Round Variation |
| 4 | [Min Stack](https://leetcode.com/problems/min-stack/) | Medium | SDE 2 Jan 2026 Hyderabad |
| 5 | [LRU Cache](https://leetcode.com/problems/lru-cache/) | Medium | Common - Round 1 |
| 6 | [Greedy/Bitwise Problem](https://leetcode.com/tag/greedy/) | Medium | SDE 2 OA Feb 2026 |
| 7 | [DFS Problem](https://leetcode.com/tag/depth-first-search/) | Medium | SDE 2 OA Feb 2026 |
| 8 | [Design Multiplayer Tic-Tac-Toe](https://leetcode.com/problems/design-tic-tac-toe/) | Medium | Glassdoor - Design |
| 9 | [Design Navigation System (Google Maps)](https://leetcode.com/tag/design/) | Hard | System Design Round |
| 10 | [Adaptive Cache Design](https://leetcode.com/tag/design/) | Hard | LLD Round - log(n) operations |
| 11 | [Binary Sorting Problem](https://leetcode.com/tag/sorting/) | Medium | Interview Round |
| 12 | [Anagram Check](https://leetcode.com/problems/valid-anagram/) | Easy | Glassdoor - Common |
| 13 | [Design Subscription Service](https://leetcode.com/tag/design/) | Medium | System Design Jan 2026 |

### Key Insights from Recent Interviews

**Google (2025-2026 Trends):**
- Graph questions appear in **76% of onsite loops** (L4+)
- "Binary Search on Answer" is a **2025 trending pattern**
- Medium difficulty problems account for **52%** of all questions
- System design mandatory for L4+, optional for L3
- Questions are often **intentionally ambiguous** - always clarify

**Amazon (2025-2026 Trends):**
- OA format: 2 problems in 90 min (one stack-based medium, one DP hard)
- **Leadership Principles (LP)** are critical - especially Customer Obsession
- SDE-1: Medium difficulty | SDE-2: Hard difficulty expected
- Follow-up questions are standard: "Improve to O(N)" or "Handle edge cases"
- Real-time system design for SDE-2 (1M+ writes/sec scenarios)

**Microsoft (2025-2026 Trends):**
- Uses **Codility** for OA (2-3 problems, 60% pass required)
- 4-5 rounds: DSA + System Design + Behavioral
- Questions are **easier than HackerRank** - focus on fundamentals
- Trees, graphs, arrays, strings, linked lists are core topics
- DP is rare but includes: coin change, edit distance, counting problems

---

## Study Plan by Difficulty

### Easy (Start Here)
- Two Sum, Valid Parentheses, Reverse Linked List, Maximum Depth of Binary Tree
- Best Time to Buy and Sell Stock, Climbing Stairs, Same Tree, Linked List Cycle
- Valid Palindrome, Move Zeroes, Merge Two Sorted Lists, Binary Search

### Medium (Core Focus - 60% of Interviews)
- LRU Cache, Number of Islands, Merge Intervals, Group Anagrams, Top K Frequent Elements
- Longest Substring Without Repeating Characters, Product of Array Except Self
- Course Schedule, Clone Graph, Validate Binary Search Tree, Word Break
- Subarray Sum Equals K, Coin Change, Kth Largest Element, 3Sum

### Hard (Google/FAANG Bar)
- Trapping Rain Water, Merge k Sorted Lists, Median of Two Sorted Arrays
- Alien Dictionary, Serialize and Deserialize Binary Tree, Word Ladder
- Minimum Window Substring, Binary Tree Maximum Path Sum, Edit Distance
- Sliding Window Maximum, Regular Expression Matching, LFU Cache

---

## Pattern-Based Study Order

1. **Week 1-2:** Arrays, Strings, Hash Maps (Two Sum, Group Anagrams, Product of Array)
2. **Week 3-4:** Two Pointers, Sliding Window (3Sum, Container With Most Water, Longest Substring)
3. **Week 5-6:** Linked Lists, Stacks (Reverse Linked List, Valid Parentheses, LRU Cache)
4. **Week 7-8:** Binary Search, Trees (Search in Rotated Array, Validate BST, LCA)
5. **Week 9-10:** Graphs (Number of Islands, Course Schedule, Clone Graph)
6. **Week 11-12:** Dynamic Programming (Coin Change, Word Break, Longest Increasing Subsequence)
7. **Week 13-14:** Heaps, Backtracking (Top K Elements, Subsets, Permutations)
8. **Week 15-16:** Advanced - Tries, Union-Find, Hard Problems

---

*Generated from: dsa_questions.md, leetcode_patterns.md, FAANG-Recent-Questions.md, google_interview_questions.md, 127 Core DSA Patterns PDF, LeetCode 75 Study Plan PDF*

---

## Additional Questions from 127 Core DSA Patterns

> Questions extracted from the "127 Core DSA Patterns - FAANG Interview Handbook" with company-specific tags.

### Advanced Graph Patterns

| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [Open the Lock](https://leetcode.com/problems/open-the-lock) | Medium | BFS | Google, Amazon | 🔥🔥 |
| 2 | [Redundant Connection](https://leetcode.com/problems/redundant-connection) | Medium | Union-Find | Google | 🔥🔥 |
| 3 | [Make Network Connected](https://leetcode.com/problems/number-of-operations-to-make-network-connected) | Medium | Union-Find | Meta, Amazon | 🔥 |
| 4 | [Regions Cut by Slashes](https://leetcode.com/problems/regions-cut-by-slashes) | Medium | Union-Find | Google | 🔥 |
| 5 | [Graph Valid Tree](https://leetcode.com/problems/graph-valid-tree) | Medium | Union-Find/DFS | Google, Meta | 🔥🔥 |
| 6 | [Path with Minimum Effort](https://leetcode.com/problems/path-with-minimum-effort) | Medium | Dijkstra/Binary Search | Google, Amazon | 🔥🔥 |
| 7 | [Swim in Rising Water](https://leetcode.com/problems/swim-in-rising-water) | Hard | Binary Search + BFS | Google | 🔥 |
| 8 | [The Maze](https://leetcode.com/problems/the-maze) | Medium | BFS/DFS | Google, Meta | 🔥🔥 |
| 9 | [The Maze II](https://leetcode.com/problems/the-maze-ii) | Medium | Dijkstra | Google | 🔥 |
| 10 | [The Maze III](https://leetcode.com/problems/the-maze-iii) | Hard | Dijkstra | Google | 🔥 |
| 11 | [Word Ladder II](https://leetcode.com/problems/word-ladder-ii) | Hard | BFS + Backtracking | Google, Amazon | 🔥🔥 |

### Advanced Backtracking & Combinations

| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [Combinations](https://leetcode.com/problems/combinations) | Medium | Backtracking | Meta, Apple, Google | 🔥🔥 |
| 2 | [Combination Sum II](https://leetcode.com/problems/combination-sum-ii) | Medium | Backtracking | Google | 🔥🔥 |
| 3 | [Subsets II](https://leetcode.com/problems/subsets-ii) | Medium | Backtracking | Google, Amazon | 🔥🔥 |
| 4 | [Target Sum](https://leetcode.com/problems/target-sum) | Medium | DP/Backtracking | Google, Meta | 🔥🔥 |
| 5 | [Smallest Sufficient Team](https://leetcode.com/problems/smallest-sufficient-team) | Hard | Bitmask DP | Google | 🔥 |

### Greedy & Optimization

| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [Jump Game IV](https://leetcode.com/problems/jump-game-iv) | Hard | BFS | Google, Amazon | 🔥 |
| 2 | [Maximum Sum Circular Subarray](https://leetcode.com/problems/maximum-sum-circular-subarray) | Medium | Kadane's Variant | Amazon | 🔥🔥 |
| 3 | [Online Stock Span](https://leetcode.com/problems/online-stock-span) | Medium | Monotonic Stack | Amazon, Google | 🔥🔥 |

### Bit Manipulation (Advanced)

| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [Single Number II](https://leetcode.com/problems/single-number-ii) | Medium | Bit Manipulation | Google | 🔥 |
| 2 | [Single Number III](https://leetcode.com/problems/single-number-iii) | Medium | Bit Manipulation | Google, Meta | 🔥 |
| 3 | [Bitwise AND of Numbers Range](https://leetcode.com/problems/bitwise-and-of-numbers-range) | Medium | Bit Manipulation | Google | 🔥 |
| 4 | [Maximum XOR of Two Numbers](https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array) | Medium | Binary Trie | Google, Nvidia, Qualcomm | 🔥🔥 |

### Math & Number Theory

| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [GCD of Strings](https://leetcode.com/problems/greatest-common-divisor-of-strings) | Easy | Math/GCD | Google | 🔥 |
| 2 | [Max Points on a Line](https://leetcode.com/problems/max-points-on-a-line) | Hard | Math/GCD | Google, Meta | 🔥🔥 |
| 3 | [Count Primes](https://leetcode.com/problems/count-primes) | Medium | Sieve | Google | 🔥 |
| 4 | [Prime Arrangements](https://leetcode.com/problems/prime-arrangements) | Easy | Math | Google | 🔥 |
| 5 | [Super Pow](https://leetcode.com/problems/super-pow) | Medium | Binary Exponentiation | Google | 🔥 |
| 6 | [Pascal's Triangle](https://leetcode.com/problems/pascals-triangle) | Easy | Math/DP | Google | 🔥 |
| 7 | [Pascal's Triangle II](https://leetcode.com/problems/pascals-triangle-ii) | Easy | Math/DP | Google | 🔥 |

### Advanced String Patterns

| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [Longest Substring with At Most Two Distinct Characters](https://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters) | Medium | Sliding Window | Google, Atlassian | 🔥🔥 |
| 2 | [Reverse Words in a String](https://leetcode.com/problems/reverse-words-in-a-string) | Medium | String | Amazon, Adobe | 🔥🔥 |
| 3 | [Zigzag Conversion](https://leetcode.com/problems/zigzag-conversion) | Medium | String | Google | 🔥 |
| 4 | [Find Index of First Occurrence](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string) | Easy | KMP/String | Google, Oracle | 🔥 |
| 5 | [Repeated Substring Pattern](https://leetcode.com/problems/repeated-substring-pattern) | Easy | KMP/String | Google | 🔥 |
| 6 | [Longest Duplicate Substring](https://leetcode.com/problems/longest-duplicate-substring) | Hard | Rabin-Karp/Binary Search | Google, Bloomberg | 🔥 |
| 7 | [Repeated DNA Sequences](https://leetcode.com/problems/repeated-dna-sequences) | Medium | Rolling Hash | Google, Bloomberg | 🔥 |
| 8 | [Minimum Remove to Make Valid Parentheses](https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses) | Medium | Stack/Two-Pass | Meta, Apple, Microsoft | 🔥🔥🔥 |

### Trie (Advanced)

| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [Replace Words](https://leetcode.com/problems/replace-words) | Medium | Trie | Google, Amazon | 🔥 |
| 2 | [Longest Word in Dictionary](https://leetcode.com/problems/longest-word-in-dictionary) | Medium | Trie | Google | 🔥 |
| 3 | [Map Sum Pairs](https://leetcode.com/problems/map-sum-pairs) | Medium | Trie | Google | 🔥 |

### Segment Tree & Range Queries

| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [Range Sum Query - Mutable](https://leetcode.com/problems/range-sum-query-mutable) | Medium | Segment Tree/BIT | Amazon, Google | 🔥🔥 |
| 2 | [My Calendar III](https://leetcode.com/problems/my-calendar-iii) | Hard | Segment Tree | Google | 🔥 |
| 3 | [Count of Smaller Numbers After Self](https://leetcode.com/problems/count-of-smaller-numbers-after-self) | Hard | Segment Tree/BIT | Google, Amazon | 🔥🔥 |
| 4 | [Shortest Subarray with Sum at Least K](https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k) | Hard | Monotonic Deque | Google | 🔥 |

### Matrix & Simulation

| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [Spiral Matrix II](https://leetcode.com/problems/spiral-matrix-ii) | Medium | Simulation | Google | 🔥 |
| 2 | [Transpose Matrix](https://leetcode.com/problems/transpose-matrix) | Easy | Matrix | Google | 🔥 |
| 3 | [Rectangle Area](https://leetcode.com/problems/rectangle-area) | Medium | Geometry | Google | 🔥 |
| 4 | [Valid Square](https://leetcode.com/problems/valid-square) | Medium | Geometry | Google | 🔥 |
| 5 | [Rotate Array](https://leetcode.com/problems/rotate-array) | Medium | Array | Google | 🔥🔥 |
| 6 | [Robot Bounded in Circle](https://leetcode.com/problems/robot-bounded-in-circle) | Medium | Simulation | Google, Amazon | 🔥🔥 |

### Circular & Modular Patterns

| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [Encode and Decode TinyURL](https://leetcode.com/problems/encode-and-decode-tinyurl) | Medium | Design/Hash | Google | 🔥 |
| 2 | [Number of Subarrays with Bounded Maximum](https://leetcode.com/problems/number-of-subarrays-with-bounded-maximum) | Medium | Sliding Window | Google | 🔥 |
| 3 | [Dota2 Senate](https://leetcode.com/problems/dota2-senate) | Medium | Simulation/Greedy | Google | 🔥 |
| 4 | [Find the Winner of the Circular Game](https://leetcode.com/problems/find-the-winner-of-the-circular-game) | Medium | Josephus Problem | Google | 🔥 |
| 5 | [Product of the Last K Numbers](https://leetcode.com/problems/product-of-the-last-k-numbers) | Medium | Design | Google | 🔥 |

### Advanced Design Patterns

| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [Basic Calculator](https://leetcode.com/problems/basic-calculator) | Hard | Stack | Google, Dropbox | 🔥🔥 |
| 2 | [Data Stream as Disjoint Intervals](https://leetcode.com/problems/data-stream-as-disjoint-intervals) | Hard | TreeMap/BST | Google | 🔥 |
| 3 | [Logger Rate Limiter](https://leetcode.com/problems/logger-rate-limiter) | Easy | Hash Map | Google, Amazon | 🔥🔥 |
| 4 | [Design Snake Game](https://leetcode.com/problems/design-snake-game) | Medium | Design/Deque | Google, Amazon | 🔥 |
| 5 | [Find Winner on a Tic Tac Toe Game](https://leetcode.com/problems/find-winner-on-a-tic-tac-toe-game) | Easy | Simulation | Google | 🔥 |
| 6 | [Design Twitter](https://leetcode.com/problems/design-twitter) | Medium | Heap/Graph | Google, Meta | 🔥🔥 |
| 7 | [Rearrange String K Distance Apart](https://leetcode.com/problems/rearrange-string-k-distance-apart) | Hard | Heap + Greedy | Google, Amazon | 🔥🔥 |
| 8 | [Smallest String With Swaps](https://leetcode.com/problems/smallest-string-with-swaps) | Medium | Union-Find | Google, Dropbox | 🔥 |

### Meet in the Middle / Split Search

| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum) (Variant) | Medium | Meet in Middle | Google | 🔥 |
| 2 | [Minimum Number of Work Sessions](https://leetcode.com/problems/minimum-number-of-work-sessions-to-finish-the-tasks) | Medium | Bitmask DP | Google | 🔥 |

### Additional Heap/Priority Queue Problems 
| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [Kth Largest Element in a Stream](https://leetcode.com/problems/kth-largest-element-in-a-stream) | Easy | Min Heap | Amazon, Google, Netflix | 🔥🔥 |
| 2 | [Sliding Window Median](https://leetcode.com/problems/sliding-window-median) | Hard | Two Heaps | Bloomberg, Google, Stripe | 🔥🔥 |
| 3 | [Smallest Range Covering Elements from K Lists](https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists) | Hard | Min Heap | Google | 🔥 |

### Additional Stack/Queue Problems 
| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [Implement Queue using Stacks](https://leetcode.com/problems/implement-queue-using-stacks) | Easy | Stack | Amazon, Apple | 🔥🔥 |
| 2 | [Implement Stack using Queues](https://leetcode.com/problems/implement-stack-using-queues) | Easy | Queue | Amazon, Apple | 🔥 |
| 3 | [Min Stack](https://leetcode.com/problems/min-stack) | Medium | Stack | Amazon, Microsoft, Flipkart | 🔥🔥 |
| 4 | [Next Greater Element II](https://leetcode.com/problems/next-greater-element-ii) | Medium | Monotonic Stack | Amazon | 🔥 |
| 5 | [Minimum Insertions to Balance a String](https://leetcode.com/problems/minimum-insertions-to-balance-a-parentheses-string) | Medium | Stack | Google | 🔥 |

### Additional Linked List Problems 
| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii) | Medium | Floyd's Cycle | Google, Amazon | 🔥🔥 |
| 2 | [Middle of the Linked List](https://leetcode.com/problems/middle-of-the-linked-list) | Easy | Fast/Slow | Amazon | 🔥🔥 |
| 3 | [Palindrome Linked List](https://leetcode.com/problems/palindrome-linked-list) | Easy | Fast/Slow + Reverse | Meta, Amazon | 🔥🔥 |

### Additional Array/String Problems 
| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array) | Easy | Two Pointers | Google, Meta | 🔥🔥 |
| 2 | [Find All Numbers Disappeared in an Array](https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array) | Easy | Cyclic Sort | Google | 🔥 |
| 3 | [Ransom Note](https://leetcode.com/problems/ransom-note) | Easy | Hash Map | Google | 🔥 |
| 4 | [First Unique Character in a String](https://leetcode.com/problems/first-unique-character-in-a-string) | Easy | Hash Map | Amazon, Adobe | 🔥🔥 |
| 5 | [Reverse String](https://leetcode.com/problems/reverse-string) | Easy | Two Pointers | Amazon | 🔥 |
| 6 | [4Sum](https://leetcode.com/problems/4sum) | Medium | Two Pointers | Facebook, Adobe, Microsoft | 🔥 |
| 7 | [K-Concatenation Maximum Sum](https://leetcode.com/problems/k-concatenation-maximum-sum) | Medium | Kadane's Variant | Google | 🔥 |
| 8 | [Max Number of Vowels in Substring](https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length) | Medium | Sliding Window | Google | 🔥 |
| 9 | [Reverse Words in a String II](https://leetcode.com/problems/reverse-words-in-a-string-ii) | Medium | Two Pointers | Microsoft | 🔥 |
| 10 | [Smallest Divisor Given Threshold](https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold) | Medium | Binary Search on Answer | Google, Uber, Amazon | 🔥 |
| 11 | [Split Array Largest Sum](https://leetcode.com/problems/split-array-largest-sum) | Hard | Binary Search + DP | Google | 🔥🔥 |

### Additional HashMap/Frequency Problems 
| # | Problem | Difficulty | Pattern | Companies | Frequency |
|---|---------|------------|---------|-----------|-----------|
| 1 | [Majority Element](https://leetcode.com/problems/majority-element) | Easy | Boyer-Moore | Google, Amazon | 🔥🔥 |
| 2 | [Top K Frequent Words](https://leetcode.com/problems/top-k-frequent-words) | Medium | Heap + HashMap | Amazon, Google | 🔥🔥 |
| 3 | [Find First and Last Position of Element](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array) | Medium | Binary Search | Google, Meta | 🔥🔥 |

---

## Company-Specific Pattern Preferences (from 127 Core DSA Patterns)

Based on the PDF analysis, here are the pattern preferences by company:

### Google's Favorite Patterns
1. **Graph BFS/DFS** - Word Ladder, Number of Islands, Clone Graph
2. **Binary Search on Answer** - Koko Eating Bananas, Capacity to Ship
3. **Sliding Window with Frequency Maps** - Minimum Window Substring
4. **Trie + DFS** - Word Search II, Boggle Solver
5. **Binary Trie** - Maximum XOR problems
6. **Segment Trees** - Range query problems
7. **Meet in the Middle** - For exponential search space reduction
8. **KMP/Rabin-Karp** - Pattern matching

### Meta's Favorite Patterns
1. **Two-Pass String Processing** - Parsing, encodings
2. **Union-Find** - Accounts Merge, Network connectivity
3. **Backtracking with Pruning** - Permutations, Combinations
4. **Binary Tree Traversal** - Vertical order, zigzag

### Amazon's Favorite Patterns
1. **Heap-based problems** - Top K, Merge K sorted
2. **Greedy Interval Scheduling** - Meeting rooms, job scheduling
3. **Monotonic Stack** - Stock span, histogram
4. **String Builder Optimization** - Run-length encoding

### Netflix/Streaming Companies
1. **Priority Queue/Heap** - Rate limiting, scheduling
2. **Prefix Sum + Binary Search** - Random weighted selection
3. **Interval Trees** - Calendar systems

---

*Generated from: dsa_questions.md, leetcode_patterns.md, FAANG-Recent-Questions.md, google_interview_questions.md, 127 Core DSA Patterns PDF, LeetCode 75 Study Plan PDF*

---

## Sources & References

### LeetCode Discussions
- [Google Latest Interview Experiences Collection](https://leetcode.com/discuss/post/6469509/google-latest-interview-experiences-coll-r4zm/)
- [Google Interview Experiences Compilation](https://leetcode.com/discuss/post/6459307/google-interview-experiences-compilation-u3cz/)
- [Google L3 Interview Experience - Full Questions](https://leetcode.com/discuss/post/6438710/google-l3-interview-expierence-full-ques-4yxt/)
- [Amazon SDE Interview Experience 2025 - Selected](https://leetcode.com/discuss/post/7111250/amazon-sde-interview-expierence-2025-bat-kqh9/)
- [Amazon SDE2 Feb 2026 - Selected](https://leetcode.com/discuss/post/7710904/)
- [Amazon SDE Interview Questions - Real Experiences](https://leetcode.com/discuss/post/7153401/)
- [Amazon SDE-1 Feb 2025 Interview Experience](https://leetcode.com/discuss/post/6461439/amazon-sde-1-feb-2025-interview-experien-wv10/)
- [Microsoft Senior Software Engineer Bangalore Mar 2025](https://leetcode.com/discuss/post/6603526/microsoft-senior-software-engineer-banga-y9v8/)
- [Microsoft SDE 2 L61/62 Interview Experience](https://leetcode.com/discuss/post/7545165/microsoft-sde-2-l6162-interview-experien-e5q7/)
- [Top 300 Most-Asked DSA Questions for Amazon SDE-1](https://leetcode.com/discuss/post/7479312/top-300-most-asked-dsa-questions-for-ama-c656/)
- [Wrapping up 2025 - Most Asked Interview Questions](https://leetcode.com/discuss/post/7417074/)

### Glassdoor
- [Google Software Engineer Interview Questions](https://www.glassdoor.com/Interview/Google-Software-Engineer-Interview-Questions-EI_IE9079.0,6_KO7,24.htm)
- [Amazon Software Development Engineer Interview Questions](https://www.glassdoor.com/Interview/Amazon-Software-Development-Engineer-Interview-Questions-EI_IE6036.0,6_KO7,36.htm)
- [Microsoft Software Engineer Interview Questions](https://www.glassdoor.com/Interview/Microsoft-Software-Engineer-Interview-Questions-EI_IE1651.0,9_KO10,27.htm)

### Other Resources
- [LeetCode Patterns by Sean Prashad](https://seanprashad.com/leetcode-patterns/)
- [Google 2026 Interview Preparation Roadmap](https://gist.github.com/carefree-ladka/6d1722421f9e1e46bd2dbdb5ea1b4684)
- [Amazon LeetCode Questions 2026 Prep Guide](https://codinginterviewai.com/blog/mastering-amazon-leetcode-questions)
- [Microsoft L63-64 Interview Guide 2026](https://www.hellointerview.com/guides/microsoft/senior)

### PDF Handbooks
- **127 Core DSA Patterns - FAANG Interview Handbook (75-page Pro Guide)** by Lavakumar Thatisetti
  - Covers 127 patterns across 12 sections: Arrays/Strings, Linked Lists, Heaps/HashMaps/Stacks, Recursion/D&C, Dynamic Programming, Trees, Graphs/Backtracking, Greedy/Bit Manipulation/Math, Advanced Strings/Tries/Segment Trees, Matrix/Geometry/Simulation, Wildcard Patterns, Design/OOP Patterns
  - Includes company-specific tags for each pattern (Google, Meta, Amazon, Microsoft, etc.)
- **LeetCode 75 Study Plan** by BossCoder Academy
  - 30-day structured study plan covering 75 essential problems
  - Includes company tags: Google, Amazon, Meta, Microsoft, Apple, Uber, Intuit, Adobe, Flipkart, Walmart, Salesforce
  - Categories: Array/String, Two Pointers, Sliding Window, Prefix Sum, Hash Map/Set, Stack, Queue, Linked List, Binary Tree DFS/BFS, BST, Graphs, Heap, Binary Search, Backtracking, DP, Bit Manipulation, Trie, Intervals, Monotonic Stack
