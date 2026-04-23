"use strict";
const patternsData = [
    {
        id: 'two-pointers',
        category: 'Two Pointers',
        icon: '👆👆',
        difficulty: 'Easy-Medium',
        description: 'Use two pointers to traverse data from different positions, often from both ends moving toward center or both starting from beginning.',
        whenToUse: [
            'Sorted array problems requiring pair/triplet finding',
            'Finding pairs with a target sum in O(n) instead of O(n²)',
            'Removing duplicates in-place without extra space',
            'Palindrome checking and validation',
            'Container/area optimization problems',
            'Partitioning arrays (Dutch National Flag)',
            'Merging sorted arrays'
        ],
        codeTemplates: {
            javascript: `// Two Pointers - Opposite Direction
function twoSumSorted(arr, target) {
    let left = 0, right = arr.length - 1;

    while (left < right) {
        const sum = arr[left] + arr[right];

        if (sum === target) {
            return [left, right];
        } else if (sum < target) {
            left++;   // Need larger sum
        } else {
            right--;  // Need smaller sum
        }
    }
    return [-1, -1];
}

// Two Pointers - Same Direction (Remove Duplicates)
function removeDuplicates(nums) {
    if (nums.length === 0) return 0;

    let slow = 0;  // Position to place next unique element

    for (let fast = 1; fast < nums.length; fast++) {
        if (nums[fast] !== nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
    }
    return slow + 1;  // Length of unique elements
}`,
            java: `// Two Pointers - Opposite Direction
public int[] twoSumSorted(int[] arr, int target) {
    int left = 0, right = arr.length - 1;

    while (left < right) {
        int sum = arr[left] + arr[right];

        if (sum == target) {
            return new int[]{left, right};
        } else if (sum < target) {
            left++;   // Need larger sum
        } else {
            right--;  // Need smaller sum
        }
    }
    return new int[]{-1, -1};
}

// Two Pointers - Same Direction (Remove Duplicates)
public int removeDuplicates(int[] nums) {
    if (nums.length == 0) return 0;

    int slow = 0;  // Position to place next unique element

    for (int fast = 1; fast < nums.length; fast++) {
        if (nums[fast] != nums[slow]) {
            slow++;
            nums[slow] = nums[fast];
        }
    }
    return slow + 1;  // Length of unique elements
}`
        },
        keyInsights: [
            'Works best on sorted arrays - sorting enables O(n) traversal',
            'Reduces O(n²) brute force to O(n) by eliminating redundant comparisons',
            'For 3Sum: fix one element with outer loop, use two pointers for remaining pair',
            'Fast/slow pointers detect cycles (Floyd\'s Tortoise and Hare)',
            'When pointers meet or cross, you\'ve examined all valid pairs',
            'For palindrome: compare chars at both ends, move inward'
        ],
        commonMistakes: [
            'Forgetting to sort the array first when required',
            'Using wrong comparison (< vs <=) causing infinite loops',
            'Not handling duplicates properly in 3Sum-type problems',
            'Modifying array while iterating without proper index management'
        ],
        variations: [
            {
                name: 'Opposite Direction',
                desc: 'Start from both ends, move toward center',
                when: 'Sorted array, finding pairs, container problems',
                template: {
                    javascript: `function oppositePointers(arr) {
    let left = 0, right = arr.length - 1;

    while (left < right) {
        // Process arr[left] and arr[right]
        if (condition) {
            left++;
        } else {
            right--;
        }
    }
}`,
                    java: `void oppositePointers(int[] arr) {
    int left = 0, right = arr.length - 1;

    while (left < right) {
        // Process arr[left] and arr[right]
        if (condition) {
            left++;
        } else {
            right--;
        }
    }
}`
                },
                problems: ['Two Sum II', 'Container With Most Water', 'Trapping Rain Water', 'Valid Palindrome']
            },
            {
                name: 'Same Direction (Fast/Slow)',
                desc: 'Both pointers move forward at different speeds or conditions',
                when: 'In-place modifications, removing elements, partitioning',
                template: {
                    javascript: `function sameDirection(arr) {
    let slow = 0;  // Marks position for valid elements

    for (let fast = 0; fast < arr.length; fast++) {
        if (isValid(arr[fast])) {
            arr[slow] = arr[fast];
            slow++;
        }
    }
    return slow;  // New length
}`,
                    java: `int sameDirection(int[] arr) {
    int slow = 0;  // Marks position for valid elements

    for (int fast = 0; fast < arr.length; fast++) {
        if (isValid(arr[fast])) {
            arr[slow] = arr[fast];
            slow++;
        }
    }
    return slow;  // New length
}`
                },
                problems: ['Remove Duplicates', 'Move Zeroes', 'Remove Element']
            },
            {
                name: 'Floyd\'s Cycle Detection',
                desc: 'Fast pointer moves 2x speed of slow pointer',
                when: 'Cycle detection in linked lists or arrays',
                template: {
                    javascript: `function hasCycle(head) {
    let slow = head, fast = head;

    while (fast && fast.next) {
        slow = slow.next;        // Move 1 step
        fast = fast.next.next;   // Move 2 steps

        if (slow === fast) {
            return true;  // Cycle detected
        }
    }
    return false;
}

// Find cycle start: after meeting, reset one to head
// Move both 1 step until they meet again`,
                    java: `boolean hasCycle(ListNode head) {
    ListNode slow = head, fast = head;

    while (fast != null && fast.next != null) {
        slow = slow.next;        // Move 1 step
        fast = fast.next.next;   // Move 2 steps

        if (slow == fast) {
            return true;  // Cycle detected
        }
    }
    return false;
}

// Find cycle start: after meeting, reset one to head
// Move both 1 step until they meet again`
                },
                problems: ['Linked List Cycle', 'Linked List Cycle II', 'Find Duplicate Number', 'Happy Number']
            },
            {
                name: 'Dutch National Flag',
                desc: 'Three pointers for three-way partitioning',
                when: 'Sorting array with 3 distinct values, partitioning around pivot',
                template: {
                    javascript: `function sortColors(nums) {
    let low = 0, mid = 0, high = nums.length - 1;

    while (mid <= high) {
        if (nums[mid] === 0) {
            [nums[low], nums[mid]] = [nums[mid], nums[low]];
            low++;
            mid++;
        } else if (nums[mid] === 1) {
            mid++;
        } else {  // nums[mid] === 2
            [nums[mid], nums[high]] = [nums[high], nums[mid]];
            high--;
            // Don't increment mid - need to check swapped value
        }
    }
}`,
                    java: `void sortColors(int[] nums) {
    int low = 0, mid = 0, high = nums.length - 1;

    while (mid <= high) {
        if (nums[mid] == 0) {
            swap(nums, low, mid);
            low++;
            mid++;
        } else if (nums[mid] == 1) {
            mid++;
        } else {  // nums[mid] == 2
            swap(nums, mid, high);
            high--;
            // Don't increment mid - need to check swapped value
        }
    }
}`
                },
                problems: ['Sort Colors', 'Move Zeroes', 'Partition Array']
            }
        ],
        commonProblems: ['Two Sum II', '3Sum', 'Container With Most Water', 'Trapping Rain Water', 'Valid Palindrome', 'Sort Colors'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)'
    },
    {
        id: 'sliding-window',
        category: 'Sliding Window',
        icon: '🪟',
        difficulty: 'Medium',
        description: 'Maintain a window of elements that slides through the array. Track window state efficiently by adding/removing elements at boundaries instead of recalculating from scratch.',
        whenToUse: [
            'Contiguous subarray/substring problems',
            'Finding longest/shortest subarray with constraint',
            'Fixed-size window calculations (max sum of k elements)',
            'Problems mentioning "consecutive" or "contiguous"',
            'Anagram/permutation finding in strings',
            'Maximum/minimum in sliding range'
        ],
        codeTemplates: {
            javascript: `// Variable Size Sliding Window Template
function slidingWindow(s, constraint) {
    const freq = new Map();
    let left = 0, result = 0;

    for (let right = 0; right < s.length; right++) {
        // 1. EXPAND: Add s[right] to window
        freq.set(s[right], (freq.get(s[right]) || 0) + 1);

        // 2. SHRINK: Contract window while invalid
        while (windowIsInvalid(freq, constraint)) {
            freq.set(s[left], freq.get(s[left]) - 1);
            if (freq.get(s[left]) === 0) freq.delete(s[left]);
            left++;
        }

        // 3. UPDATE: Record result (for maximum problems)
        result = Math.max(result, right - left + 1);
    }
    return result;
}

// Fixed Size Sliding Window
function fixedWindow(arr, k) {
    let windowSum = 0, maxSum = -Infinity;

    for (let i = 0; i < arr.length; i++) {
        windowSum += arr[i];  // Add right element

        if (i >= k - 1) {
            maxSum = Math.max(maxSum, windowSum);
            windowSum -= arr[i - k + 1];  // Remove left element
        }
    }
    return maxSum;
}`,
            java: `// Variable Size Sliding Window Template
public int slidingWindow(String s, int constraint) {
    Map<Character, Integer> freq = new HashMap<>();
    int left = 0, result = 0;

    for (int right = 0; right < s.length(); right++) {
        // 1. EXPAND: Add s[right] to window
        char c = s.charAt(right);
        freq.put(c, freq.getOrDefault(c, 0) + 1);

        // 2. SHRINK: Contract window while invalid
        while (windowIsInvalid(freq, constraint)) {
            char leftChar = s.charAt(left);
            freq.put(leftChar, freq.get(leftChar) - 1);
            if (freq.get(leftChar) == 0) freq.remove(leftChar);
            left++;
        }

        // 3. UPDATE: Record result (for maximum problems)
        result = Math.max(result, right - left + 1);
    }
    return result;
}

// Fixed Size Sliding Window
public int fixedWindow(int[] arr, int k) {
    int windowSum = 0, maxSum = Integer.MIN_VALUE;

    for (int i = 0; i < arr.length; i++) {
        windowSum += arr[i];  // Add right element

        if (i >= k - 1) {
            maxSum = Math.max(maxSum, windowSum);
            windowSum -= arr[i - k + 1];  // Remove left element
        }
    }
    return maxSum;
}`
        },
        keyInsights: [
            'Fixed window: size stays constant, slide by 1 each iteration',
            'Variable window: expand right freely, shrink left when constraint violated',
            'Use HashMap to track character frequencies in window',
            'For "minimum" problems: update result INSIDE while loop (when valid)',
            'For "maximum" problems: update result AFTER while loop (when valid)',
            'Window size at any point: right - left + 1',
            'Anagram problems: compare frequency maps or use "matches" counter'
        ],
        commonMistakes: [
            'Forgetting to shrink window (infinite loop or wrong answer)',
            'Updating result at wrong place (inside vs outside while loop)',
            'Off-by-one errors in window size calculation',
            'Not properly removing elements when shrinking'
        ],
        variations: [
            {
                name: 'Fixed Size Window',
                desc: 'Window size remains constant k throughout traversal',
                when: 'Problems asking for max/min/average of exactly k elements',
                template: {
                    javascript: `function maxSumSubarray(arr, k) {
    let windowSum = 0, maxSum = -Infinity;

    for (let i = 0; i < arr.length; i++) {
        windowSum += arr[i];

        if (i >= k - 1) {  // Window is full
            maxSum = Math.max(maxSum, windowSum);
            windowSum -= arr[i - k + 1];
        }
    }
    return maxSum;
}`,
                    java: `public int maxSumSubarray(int[] arr, int k) {
    int windowSum = 0, maxSum = Integer.MIN_VALUE;

    for (int i = 0; i < arr.length; i++) {
        windowSum += arr[i];

        if (i >= k - 1) {  // Window is full
            maxSum = Math.max(maxSum, windowSum);
            windowSum -= arr[i - k + 1];
        }
    }
    return maxSum;
}`
                },
                problems: ['Maximum Average Subarray I', 'Max Consecutive Ones III', 'Maximum Points from Cards']
            },
            {
                name: 'Variable Size - Find Maximum',
                desc: 'Find longest subarray/substring satisfying condition',
                when: 'Longest substring without repeating, max consecutive ones',
                template: {
                    javascript: `function longestSubstring(s) {
    const seen = new Set();
    let left = 0, maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        while (seen.has(s[right])) {
            seen.delete(s[left]);
            left++;
        }
        seen.add(s[right]);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
                    java: `public int longestSubstring(String s) {
    Set<Character> seen = new HashSet<>();
    int left = 0, maxLen = 0;

    for (int right = 0; right < s.length(); right++) {
        while (seen.contains(s.charAt(right))) {
            seen.remove(s.charAt(left));
            left++;
        }
        seen.add(s.charAt(right));
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}`
                },
                problems: ['Longest Substring Without Repeating', 'Longest Repeating Character Replacement', 'Max Consecutive Ones III']
            },
            {
                name: 'Variable Size - Find Minimum',
                desc: 'Find shortest subarray satisfying condition',
                when: 'Minimum window substring, minimum size subarray sum',
                template: {
                    javascript: `function minSubarray(nums, target) {
    let left = 0, sum = 0, minLen = Infinity;

    for (let right = 0; right < nums.length; right++) {
        sum += nums[right];

        while (sum >= target) {  // Valid window
            minLen = Math.min(minLen, right - left + 1);
            sum -= nums[left];
            left++;
        }
    }
    return minLen === Infinity ? 0 : minLen;
}`,
                    java: `public int minSubarray(int[] nums, int target) {
    int left = 0, sum = 0, minLen = Integer.MAX_VALUE;

    for (int right = 0; right < nums.length; right++) {
        sum += nums[right];

        while (sum >= target) {  // Valid window
            minLen = Math.min(minLen, right - left + 1);
            sum -= nums[left];
            left++;
        }
    }
    return minLen == Integer.MAX_VALUE ? 0 : minLen;
}`
                },
                problems: ['Minimum Window Substring', 'Minimum Size Subarray Sum']
            },
            {
                name: 'Sliding Window with Counter',
                desc: 'Use frequency map and matches counter for anagram problems',
                when: 'Find anagrams, permutation in string',
                template: {
                    javascript: `function findAnagrams(s, p) {
    const result = [];
    const pFreq = new Map(), sFreq = new Map();

    // Build pattern frequency
    for (let c of p) pFreq.set(c, (pFreq.get(c) || 0) + 1);

    let matches = 0;
    const required = pFreq.size;

    for (let i = 0; i < s.length; i++) {
        // Add right char
        const c = s[i];
        sFreq.set(c, (sFreq.get(c) || 0) + 1);
        if (sFreq.get(c) === pFreq.get(c)) matches++;

        // Remove left char when window > p.length
        if (i >= p.length) {
            const left = s[i - p.length];
            if (sFreq.get(left) === pFreq.get(left)) matches--;
            sFreq.set(left, sFreq.get(left) - 1);
        }

        if (matches === required) result.push(i - p.length + 1);
    }
    return result;
}`,
                    java: `public List<Integer> findAnagrams(String s, String p) {
    List<Integer> result = new ArrayList<>();
    Map<Character, Integer> pFreq = new HashMap<>();
    Map<Character, Integer> sFreq = new HashMap<>();

    for (char c : p.toCharArray())
        pFreq.merge(c, 1, Integer::sum);

    int matches = 0, required = pFreq.size();

    for (int i = 0; i < s.length(); i++) {
        char c = s.charAt(i);
        sFreq.merge(c, 1, Integer::sum);
        if (sFreq.get(c).equals(pFreq.get(c))) matches++;

        if (i >= p.length()) {
            char left = s.charAt(i - p.length());
            if (sFreq.get(left).equals(pFreq.get(left))) matches--;
            sFreq.merge(left, -1, Integer::sum);
        }

        if (matches == required) result.add(i - p.length() + 1);
    }
    return result;
}`
                },
                problems: ['Find All Anagrams', 'Permutation in String', 'Minimum Window Substring']
            }
        ],
        commonProblems: ['Longest Substring Without Repeating Characters', 'Minimum Window Substring', 'Find All Anagrams', 'Sliding Window Maximum', 'Longest Repeating Character Replacement'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(k) where k = window size or charset size'
    },
    {
        id: 'prefix-sum',
        category: 'Prefix Sum',
        icon: '➕',
        difficulty: 'Easy-Medium',
        description: 'Precompute cumulative sums to answer range sum queries in O(1). Combined with HashMap for finding subarrays with specific sum.',
        whenToUse: [
            'Multiple range sum queries on static array',
            'Subarray sum equals k problems',
            'Count subarrays with specific sum property',
            'Product of array except self',
            'Finding equilibrium/pivot index',
            '2D matrix range sum queries'
        ],
        codeTemplates: {
            javascript: `// Build Prefix Sum Array
function buildPrefixSum(arr) {
    const prefix = [0];  // prefix[0] = 0 for easier calculation
    for (let num of arr) {
        prefix.push(prefix[prefix.length - 1] + num);
    }
    return prefix;
    // Range sum [i, j] = prefix[j+1] - prefix[i]
}

// Subarray Sum Equals K (HashMap approach)
function subarraySum(nums, k) {
    const prefixCount = new Map([[0, 1]]);  // Base case
    let sum = 0, count = 0;

    for (let num of nums) {
        sum += num;
        // If (sum - k) was seen before, those positions
        // mark starts of valid subarrays ending here
        count += prefixCount.get(sum - k) || 0;
        prefixCount.set(sum, (prefixCount.get(sum) || 0) + 1);
    }
    return count;
}

// Product of Array Except Self (no division)
function productExceptSelf(nums) {
    const n = nums.length;
    const result = new Array(n).fill(1);

    // Left products
    let leftProduct = 1;
    for (let i = 0; i < n; i++) {
        result[i] = leftProduct;
        leftProduct *= nums[i];
    }

    // Right products
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= nums[i];
    }
    return result;
}`,
            java: `// Build Prefix Sum Array
public int[] buildPrefixSum(int[] arr) {
    int[] prefix = new int[arr.length + 1];
    for (int i = 0; i < arr.length; i++) {
        prefix[i + 1] = prefix[i] + arr[i];
    }
    return prefix;
    // Range sum [i, j] = prefix[j+1] - prefix[i]
}

// Subarray Sum Equals K (HashMap approach)
public int subarraySum(int[] nums, int k) {
    Map<Integer, Integer> prefixCount = new HashMap<>();
    prefixCount.put(0, 1);  // Base case
    int sum = 0, count = 0;

    for (int num : nums) {
        sum += num;
        // If (sum - k) was seen before, those positions
        // mark starts of valid subarrays ending here
        count += prefixCount.getOrDefault(sum - k, 0);
        prefixCount.merge(sum, 1, Integer::sum);
    }
    return count;
}

// Product of Array Except Self (no division)
public int[] productExceptSelf(int[] nums) {
    int n = nums.length;
    int[] result = new int[n];
    Arrays.fill(result, 1);

    // Left products
    int leftProduct = 1;
    for (int i = 0; i < n; i++) {
        result[i] = leftProduct;
        leftProduct *= nums[i];
    }

    // Right products
    int rightProduct = 1;
    for (int i = n - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= nums[i];
    }
    return result;
}`
        },
        keyInsights: [
            'prefix[j+1] - prefix[i] = sum of arr[i..j] in O(1)',
            'For "subarray sum = k": look for (currentSum - k) in HashMap',
            'Initialize HashMap with {0: 1} to handle subarrays starting at index 0',
            'For products: use prefix AND suffix products (handle zeros separately)',
            'Can extend to 2D: prefix[i][j] = sum of submatrix from (0,0) to (i,j)',
            'For modular arithmetic: be careful with negative remainders'
        ],
        commonMistakes: [
            'Forgetting to initialize {0: 1} in HashMap (misses subarrays from start)',
            'Off-by-one errors in prefix array indexing',
            'Division approach fails with zeros in array',
            'Not handling negative numbers in modular problems'
        ],
        variations: [
            {
                name: 'Basic Prefix Sum Array',
                desc: 'Precompute cumulative sums for O(1) range queries',
                when: 'Multiple range sum queries on same array',
                template: {
                    javascript: `function rangeSum(arr, queries) {
    // Build prefix sum
    const prefix = [0];
    for (let num of arr) {
        prefix.push(prefix[prefix.length - 1] + num);
    }

    // Answer queries in O(1) each
    return queries.map(([i, j]) => prefix[j + 1] - prefix[i]);
}`,
                    java: `public int[] rangeSum(int[] arr, int[][] queries) {
    // Build prefix sum
    int[] prefix = new int[arr.length + 1];
    for (int i = 0; i < arr.length; i++) {
        prefix[i + 1] = prefix[i] + arr[i];
    }

    // Answer queries in O(1) each
    int[] result = new int[queries.length];
    for (int q = 0; q < queries.length; q++) {
        result[q] = prefix[queries[q][1] + 1] - prefix[queries[q][0]];
    }
    return result;
}`
                },
                problems: ['Range Sum Query - Immutable', 'Range Sum Query 2D']
            },
            {
                name: 'Prefix Sum + HashMap',
                desc: 'Count/find subarrays with target sum using complement lookup',
                when: 'Subarray sum equals k, count subarrays divisible by k',
                template: {
                    javascript: `function subarraySumEqualsK(nums, k) {
    const prefixCount = new Map([[0, 1]]);
    let sum = 0, count = 0;

    for (let num of nums) {
        sum += num;
        // Look for complement: how many prefix sums = sum - k?
        count += prefixCount.get(sum - k) || 0;
        prefixCount.set(sum, (prefixCount.get(sum) || 0) + 1);
    }
    return count;
}`,
                    java: `public int subarraySumEqualsK(int[] nums, int k) {
    Map<Integer, Integer> prefixCount = new HashMap<>();
    prefixCount.put(0, 1);
    int sum = 0, count = 0;

    for (int num : nums) {
        sum += num;
        // Look for complement: how many prefix sums = sum - k?
        count += prefixCount.getOrDefault(sum - k, 0);
        prefixCount.merge(sum, 1, Integer::sum);
    }
    return count;
}`
                },
                problems: ['Subarray Sum Equals K', 'Continuous Subarray Sum', 'Contiguous Array']
            },
            {
                name: 'Prefix/Suffix Products',
                desc: 'Compute products excluding current element without division',
                when: 'Product except self, handling zeros',
                template: {
                    javascript: `function productExceptSelf(nums) {
    const n = nums.length;
    const result = new Array(n);

    // result[i] = product of all elements to the left
    result[0] = 1;
    for (let i = 1; i < n; i++) {
        result[i] = result[i - 1] * nums[i - 1];
    }

    // Multiply by product of all elements to the right
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= nums[i];
    }
    return result;
}`,
                    java: `public int[] productExceptSelf(int[] nums) {
    int n = nums.length;
    int[] result = new int[n];

    // result[i] = product of all elements to the left
    result[0] = 1;
    for (int i = 1; i < n; i++) {
        result[i] = result[i - 1] * nums[i - 1];
    }

    // Multiply by product of all elements to the right
    int rightProduct = 1;
    for (int i = n - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= nums[i];
    }
    return result;
}`
                },
                problems: ['Product of Array Except Self']
            },
            {
                name: '2D Prefix Sum',
                desc: 'Extend to matrices for submatrix sum queries',
                when: 'Range sum query 2D, matrix region calculations',
                template: {
                    javascript: `class NumMatrix {
    constructor(matrix) {
        const m = matrix.length, n = matrix[0].length;
        this.prefix = Array.from({length: m + 1},
            () => new Array(n + 1).fill(0));

        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                this.prefix[i][j] = matrix[i-1][j-1]
                    + this.prefix[i-1][j]
                    + this.prefix[i][j-1]
                    - this.prefix[i-1][j-1];
            }
        }
    }

    sumRegion(r1, c1, r2, c2) {
        return this.prefix[r2+1][c2+1]
            - this.prefix[r1][c2+1]
            - this.prefix[r2+1][c1]
            + this.prefix[r1][c1];
    }
}`,
                    java: `class NumMatrix {
    private int[][] prefix;

    public NumMatrix(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        prefix = new int[m + 1][n + 1];

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                prefix[i][j] = matrix[i-1][j-1]
                    + prefix[i-1][j]
                    + prefix[i][j-1]
                    - prefix[i-1][j-1];
            }
        }
    }

    public int sumRegion(int r1, int c1, int r2, int c2) {
        return prefix[r2+1][c2+1]
            - prefix[r1][c2+1]
            - prefix[r2+1][c1]
            + prefix[r1][c1];
    }
}`
                },
                problems: ['Range Sum Query 2D - Immutable']
            }
        ],
        commonProblems: ['Subarray Sum Equals K', 'Continuous Subarray Sum', 'Find Pivot Index', 'Product of Array Except Self', 'Contiguous Array'],
        timeComplexity: 'O(n) build, O(1) query',
        spaceComplexity: 'O(n)'
    },
    {
        id: 'hash-map',
        category: 'Hash Map / Set',
        icon: '#️⃣',
        difficulty: 'Easy',
        description: 'Use hash tables for O(1) average lookups, frequency counting, and duplicate detection. Foundation for many other patterns.',
        whenToUse: [
            'Finding pairs/complements (Two Sum)',
            'Counting frequencies of elements',
            'Detecting duplicates',
            'Grouping elements by property (anagrams)',
            'Two-way mapping (isomorphic strings)',
            'Caching/memoization'
        ],
        codeTemplates: {
            javascript: `// Two Sum Pattern - Find complement
function twoSum(nums, target) {
    const seen = new Map();  // value -> index

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        seen.set(nums[i], i);
    }
    return [-1, -1];
}

// Group by Key Pattern (Anagrams)
function groupAnagrams(strs) {
    const groups = new Map();

    for (let s of strs) {
        // Key: sorted string or character count
        const key = [...s].sort().join('');
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(s);
    }
    return [...groups.values()];
}

// Frequency Counter Pattern
function topKFrequent(nums, k) {
    const freq = new Map();
    for (let num of nums) {
        freq.set(num, (freq.get(num) || 0) + 1);
    }

    // Sort by frequency or use bucket sort
    return [...freq.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, k)
        .map(e => e[0]);
}`,
            java: `// Two Sum Pattern - Find complement
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> seen = new HashMap<>();

    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (seen.containsKey(complement)) {
            return new int[]{seen.get(complement), i};
        }
        seen.put(nums[i], i);
    }
    return new int[]{-1, -1};
}

// Group by Key Pattern (Anagrams)
public List<List<String>> groupAnagrams(String[] strs) {
    Map<String, List<String>> groups = new HashMap<>();

    for (String s : strs) {
        char[] chars = s.toCharArray();
        Arrays.sort(chars);
        String key = new String(chars);
        groups.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
    }
    return new ArrayList<>(groups.values());
}

// Frequency Counter Pattern
public int[] topKFrequent(int[] nums, int k) {
    Map<Integer, Integer> freq = new HashMap<>();
    for (int num : nums) {
        freq.merge(num, 1, Integer::sum);
    }

    return freq.entrySet().stream()
        .sorted((a, b) -> b.getValue() - a.getValue())
        .limit(k)
        .mapToInt(Map.Entry::getKey)
        .toArray();
}`
        },
        keyInsights: [
            'Always check if complement/target exists BEFORE adding current element',
            'For anagrams: use sorted string OR character count array as key',
            'Use int[26] array instead of HashMap for lowercase letter frequency (faster)',
            'Two HashMaps for bijective mapping (isomorphic strings)',
            'Set for simple existence checks, Map for value association',
            'Consider hash collisions in interview discussion'
        ],
        commonMistakes: [
            'Checking complement AFTER adding current (finds same element)',
            'Using wrong key for grouping (not canonical form)',
            'Not handling duplicate values correctly',
            'Forgetting that HashMap operations are O(1) average, O(n) worst case'
        ],
        variations: [
            {
                name: 'Complement Lookup',
                desc: 'Find pairs that satisfy a condition using complement',
                when: 'Two Sum, pair sum problems',
                template: {
                    javascript: `function findPair(nums, target) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        seen.set(nums[i], i);
    }
    return null;
}`,
                    java: `public int[] findPair(int[] nums, int target) {
    Map<Integer, Integer> seen = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (seen.containsKey(complement)) {
            return new int[]{seen.get(complement), i};
        }
        seen.put(nums[i], i);
    }
    return null;
}`
                },
                problems: ['Two Sum', '4Sum II', 'Count Pairs with Given Sum']
            },
            {
                name: 'Frequency Counter',
                desc: 'Count occurrences and query frequencies',
                when: 'Top K elements, majority element, frequency queries',
                template: {
                    javascript: `function frequencyCount(arr) {
    const freq = new Map();
    for (let item of arr) {
        freq.set(item, (freq.get(item) || 0) + 1);
    }
    return freq;
}

// For lowercase letters, use array
function charFrequency(s) {
    const freq = new Array(26).fill(0);
    for (let c of s) {
        freq[c.charCodeAt(0) - 97]++;
    }
    return freq;
}`,
                    java: `public Map<Integer, Integer> frequencyCount(int[] arr) {
    Map<Integer, Integer> freq = new HashMap<>();
    for (int item : arr) {
        freq.merge(item, 1, Integer::sum);
    }
    return freq;
}

// For lowercase letters, use array
public int[] charFrequency(String s) {
    int[] freq = new int[26];
    for (char c : s.toCharArray()) {
        freq[c - 'a']++;
    }
    return freq;
}`
                },
                problems: ['Top K Frequent Elements', 'Majority Element', 'Sort Characters By Frequency']
            },
            {
                name: 'Grouping by Key',
                desc: 'Group elements by computed property/key',
                when: 'Group anagrams, group by pattern',
                template: {
                    javascript: `function groupByKey(items, keyFn) {
    const groups = new Map();
    for (let item of items) {
        const key = keyFn(item);
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(item);
    }
    return groups;
}

// Anagram key function
const anagramKey = s => [...s].sort().join('');
// Or using char count
const anagramKey2 = s => {
    const count = new Array(26).fill(0);
    for (let c of s) count[c.charCodeAt(0) - 97]++;
    return count.join('#');
};`,
                    java: `public <T, K> Map<K, List<T>> groupByKey(
        List<T> items, Function<T, K> keyFn) {
    Map<K, List<T>> groups = new HashMap<>();
    for (T item : items) {
        K key = keyFn.apply(item);
        groups.computeIfAbsent(key, k -> new ArrayList<>()).add(item);
    }
    return groups;
}

// Anagram key using char count
private String anagramKey(String s) {
    int[] count = new int[26];
    for (char c : s.toCharArray()) count[c - 'a']++;
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < 26; i++) {
        sb.append('#').append(count[i]);
    }
    return sb.toString();
}`
                },
                problems: ['Group Anagrams', 'Word Pattern', 'Isomorphic Strings']
            },
            {
                name: 'Consecutive Sequence',
                desc: 'Find longest consecutive sequence using set lookups',
                when: 'Longest consecutive sequence, streak counting',
                template: {
                    javascript: `function longestConsecutive(nums) {
    const numSet = new Set(nums);
    let longest = 0;

    for (let num of numSet) {
        // Only start counting from sequence start
        if (!numSet.has(num - 1)) {
            let length = 1;
            while (numSet.has(num + length)) {
                length++;
            }
            longest = Math.max(longest, length);
        }
    }
    return longest;
}`,
                    java: `public int longestConsecutive(int[] nums) {
    Set<Integer> numSet = new HashSet<>();
    for (int num : nums) numSet.add(num);

    int longest = 0;
    for (int num : numSet) {
        // Only start counting from sequence start
        if (!numSet.contains(num - 1)) {
            int length = 1;
            while (numSet.contains(num + length)) {
                length++;
            }
            longest = Math.max(longest, length);
        }
    }
    return longest;
}`
                },
                problems: ['Longest Consecutive Sequence']
            }
        ],
        commonProblems: ['Two Sum', 'Group Anagrams', 'Top K Frequent Elements', 'Longest Consecutive Sequence', 'Valid Anagram'],
        timeComplexity: 'O(n) average',
        spaceComplexity: 'O(n)'
    },
    {
        id: 'binary-search',
        category: 'Binary Search',
        icon: '🔍',
        difficulty: 'Medium',
        description: 'Divide search space in half each iteration. Works on sorted arrays or when searching for optimal value that satisfies a monotonic condition.',
        whenToUse: [
            'Searching in sorted array',
            'Finding boundary (first/last occurrence)',
            'Search in rotated sorted array',
            'Finding optimal value satisfying condition (Binary Search on Answer)',
            'Minimizing maximum or maximizing minimum'
        ],
        codeTemplates: {
            javascript: `// Standard Binary Search
function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;

    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);

        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;  // Not found (or return left for insert position)
}

// Find First Occurrence (Lower Bound)
function lowerBound(arr, target) {
    let left = 0, right = arr.length;

    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        if (arr[mid] < target) left = mid + 1;
        else right = mid;
    }
    return left;  // First index where arr[i] >= target
}

// Binary Search on Answer
function binarySearchOnAnswer(canAchieve, minVal, maxVal) {
    let left = minVal, right = maxVal;

    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);

        if (canAchieve(mid)) {
            right = mid;  // Try smaller (for minimize)
        } else {
            left = mid + 1;
        }
    }
    return left;
}`,
            java: `// Standard Binary Search
public int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;

        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;  // Not found (or return left for insert position)
}

// Find First Occurrence (Lower Bound)
public int lowerBound(int[] arr, int target) {
    int left = 0, right = arr.length;

    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] < target) left = mid + 1;
        else right = mid;
    }
    return left;  // First index where arr[i] >= target
}

// Binary Search on Answer
public int binarySearchOnAnswer(
        IntPredicate canAchieve, int minVal, int maxVal) {
    int left = minVal, right = maxVal;

    while (left < right) {
        int mid = left + (right - left) / 2;

        if (canAchieve.test(mid)) {
            right = mid;  // Try smaller (for minimize)
        } else {
            left = mid + 1;
        }
    }
    return left;
}`
        },
        keyInsights: [
            'Use left + (right - left) / 2 to avoid integer overflow',
            'left <= right for exact match; left < right for boundary finding',
            'Rotated array: one half is ALWAYS sorted - use this to determine search direction',
            'Binary Search on Answer: define canAchieve(x) predicate, search for optimal x',
            'For first occurrence: when found, search left (right = mid)',
            'For last occurrence: when found, search right (left = mid + 1)'
        ],
        commonMistakes: [
            'Integer overflow with (left + right) / 2',
            'Infinite loop from wrong boundary update (mid vs mid+1/mid-1)',
            'Wrong loop condition (< vs <=)',
            'Not identifying the correct search space bounds'
        ],
        variations: [
            {
                name: 'Exact Match',
                desc: 'Find specific value in sorted array',
                when: 'Standard search, element lookup',
                template: {
                    javascript: `function search(arr, target) {
    let left = 0, right = arr.length - 1;

    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
                    java: `public int search(int[] arr, int target) {
    int left = 0, right = arr.length - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`
                },
                problems: ['Binary Search', 'Search Insert Position']
            },
            {
                name: 'Find Boundary (Lower/Upper Bound)',
                desc: 'Find first/last occurrence or insertion point',
                when: 'First bad version, search range, count occurrences',
                template: {
                    javascript: `// Lower bound: first index where arr[i] >= target
function lowerBound(arr, target) {
    let left = 0, right = arr.length;
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        if (arr[mid] < target) left = mid + 1;
        else right = mid;
    }
    return left;
}

// Upper bound: first index where arr[i] > target
function upperBound(arr, target) {
    let left = 0, right = arr.length;
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        if (arr[mid] <= target) left = mid + 1;
        else right = mid;
    }
    return left;
}`,
                    java: `// Lower bound: first index where arr[i] >= target
public int lowerBound(int[] arr, int target) {
    int left = 0, right = arr.length;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] < target) left = mid + 1;
        else right = mid;
    }
    return left;
}

// Upper bound: first index where arr[i] > target
public int upperBound(int[] arr, int target) {
    int left = 0, right = arr.length;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] <= target) left = mid + 1;
        else right = mid;
    }
    return left;
}`
                },
                problems: ['First Bad Version', 'Find First and Last Position', 'Search Insert Position']
            },
            {
                name: 'Rotated Sorted Array',
                desc: 'Search in array that was rotated at unknown pivot',
                when: 'Search in rotated array, find minimum in rotated array',
                template: {
                    javascript: `function searchRotated(nums, target) {
    let left = 0, right = nums.length - 1;

    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (nums[mid] === target) return mid;

        // Left half is sorted
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        // Right half is sorted
        else {
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
}`,
                    java: `public int searchRotated(int[] nums, int target) {
    int left = 0, right = nums.length - 1;

    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;

        // Left half is sorted
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        // Right half is sorted
        else {
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
}`
                },
                problems: ['Search in Rotated Sorted Array', 'Find Minimum in Rotated Sorted Array']
            },
            {
                name: 'Binary Search on Answer',
                desc: 'Search for optimal value that satisfies monotonic condition',
                when: 'Koko eating bananas, ship packages, minimize max/maximize min problems',
                template: {
                    javascript: `// Example: Koko Eating Bananas
function minEatingSpeed(piles, h) {
    // Search space: [1, max(piles)]
    let left = 1, right = Math.max(...piles);

    const canFinish = (speed) => {
        let hours = 0;
        for (let pile of piles) {
            hours += Math.ceil(pile / speed);
        }
        return hours <= h;
    };

    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        if (canFinish(mid)) {
            right = mid;  // Try smaller speed
        } else {
            left = mid + 1;
        }
    }
    return left;
}`,
                    java: `// Example: Koko Eating Bananas
public int minEatingSpeed(int[] piles, int h) {
    int left = 1, right = Arrays.stream(piles).max().getAsInt();

    while (left < right) {
        int mid = left + (right - left) / 2;
        if (canFinish(piles, mid, h)) {
            right = mid;  // Try smaller speed
        } else {
            left = mid + 1;
        }
    }
    return left;
}

private boolean canFinish(int[] piles, int speed, int h) {
    int hours = 0;
    for (int pile : piles) {
        hours += (pile + speed - 1) / speed;  // Ceiling division
    }
    return hours <= h;
}`
                },
                problems: ['Koko Eating Bananas', 'Capacity To Ship Packages', 'Split Array Largest Sum', 'Magnetic Force Between Two Balls']
            }
        ],
        commonProblems: ['Binary Search', 'Search in Rotated Sorted Array', 'Koko Eating Bananas', 'Median of Two Sorted Arrays', 'Find Peak Element'],
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1)'
    },
    {
        id: 'stack',
        category: 'Stack / Monotonic Stack',
        icon: '📚',
        difficulty: 'Medium',
        description: 'LIFO structure for matching pairs, expression evaluation, and finding next greater/smaller elements efficiently.',
        whenToUse: [
            'Matching parentheses/brackets',
            'Expression evaluation (calculator)',
            'Next greater/smaller element problems',
            'Largest rectangle in histogram',
            'Decode nested strings',
            'Simplify file paths'
        ],
        codeTemplates: {
            javascript: `// Valid Parentheses
function isValid(s) {
    const stack = [];
    const pairs = { ')': '(', ']': '[', '}': '{' };

    for (let c of s) {
        if ('([{'.includes(c)) {
            stack.push(c);
        } else {
            if (!stack.length || stack.pop() !== pairs[c]) {
                return false;
            }
        }
    }
    return stack.length === 0;
}

// Monotonic Stack - Next Greater Element
function nextGreater(nums) {
    const result = new Array(nums.length).fill(-1);
    const stack = [];  // Store indices

    for (let i = 0; i < nums.length; i++) {
        // Pop all smaller elements - current is their answer
        while (stack.length && nums[stack[stack.length - 1]] < nums[i]) {
            result[stack.pop()] = nums[i];
        }
        stack.push(i);
    }
    return result;
}

// Basic Calculator II
function calculate(s) {
    const stack = [];
    let num = 0, sign = '+';

    for (let i = 0; i <= s.length; i++) {
        const c = s[i];
        if (c >= '0' && c <= '9') {
            num = num * 10 + (c - '0');
        }
        if ((c && c !== ' ' && !(c >= '0' && c <= '9')) || i === s.length) {
            if (sign === '+') stack.push(num);
            else if (sign === '-') stack.push(-num);
            else if (sign === '*') stack.push(stack.pop() * num);
            else if (sign === '/') stack.push(Math.trunc(stack.pop() / num));
            sign = c;
            num = 0;
        }
    }
    return stack.reduce((a, b) => a + b, 0);
}`,
            java: `// Valid Parentheses
public boolean isValid(String s) {
    Deque<Character> stack = new ArrayDeque<>();
    Map<Character, Character> pairs = Map.of(')', '(', ']', '[', '}', '{');

    for (char c : s.toCharArray()) {
        if (c == '(' || c == '[' || c == '{') {
            stack.push(c);
        } else {
            if (stack.isEmpty() || stack.pop() != pairs.get(c)) {
                return false;
            }
        }
    }
    return stack.isEmpty();
}

// Monotonic Stack - Next Greater Element
public int[] nextGreater(int[] nums) {
    int[] result = new int[nums.length];
    Arrays.fill(result, -1);
    Deque<Integer> stack = new ArrayDeque<>();  // Store indices

    for (int i = 0; i < nums.length; i++) {
        while (!stack.isEmpty() && nums[stack.peek()] < nums[i]) {
            result[stack.pop()] = nums[i];
        }
        stack.push(i);
    }
    return result;
}

// Basic Calculator II
public int calculate(String s) {
    Deque<Integer> stack = new ArrayDeque<>();
    int num = 0;
    char sign = '+';

    for (int i = 0; i <= s.length(); i++) {
        char c = i < s.length() ? s.charAt(i) : '+';
        if (Character.isDigit(c)) {
            num = num * 10 + (c - '0');
        } else if (c != ' ') {
            if (sign == '+') stack.push(num);
            else if (sign == '-') stack.push(-num);
            else if (sign == '*') stack.push(stack.pop() * num);
            else if (sign == '/') stack.push(stack.pop() / num);
            sign = c;
            num = 0;
        }
    }
    return stack.stream().mapToInt(Integer::intValue).sum();
}`
        },
        keyInsights: [
            'Monotonic DECREASING stack: pop when current > top (next greater)',
            'Monotonic INCREASING stack: pop when current < top (next smaller)',
            'Store INDICES not values for position-based problems',
            'For circular arrays: iterate 2*n, use i % n for index',
            'Calculator: process previous operator when new operator seen',
            'Nested structures: push state before recursing, pop after'
        ],
        commonMistakes: [
            'Forgetting to process remaining elements in stack after loop',
            'Wrong comparison direction for monotonic stack',
            'Not handling edge cases (empty string, single element)',
            'Integer overflow in calculator division'
        ],
        variations: [
            {
                name: 'Matching Pairs',
                desc: 'Match opening and closing brackets/tags',
                when: 'Valid parentheses, HTML tag matching',
                template: {
                    javascript: `function isValidParentheses(s) {
    const stack = [];
    const pairs = { ')': '(', ']': '[', '}': '{' };

    for (let c of s) {
        if (c in pairs) {
            if (!stack.length || stack.pop() !== pairs[c]) {
                return false;
            }
        } else {
            stack.push(c);
        }
    }
    return stack.length === 0;
}`,
                    java: `public boolean isValidParentheses(String s) {
    Deque<Character> stack = new ArrayDeque<>();
    Map<Character, Character> pairs = Map.of(')', '(', ']', '[', '}', '{');

    for (char c : s.toCharArray()) {
        if (pairs.containsKey(c)) {
            if (stack.isEmpty() || stack.pop() != pairs.get(c)) {
                return false;
            }
        } else {
            stack.push(c);
        }
    }
    return stack.isEmpty();
}`
                },
                problems: ['Valid Parentheses', 'Minimum Remove to Make Valid Parentheses']
            },
            {
                name: 'Monotonic Decreasing (Next Greater)',
                desc: 'Find next greater element for each position',
                when: 'Daily temperatures, next greater element',
                template: {
                    javascript: `function nextGreater(nums) {
    const n = nums.length;
    const result = new Array(n).fill(-1);
    const stack = [];  // Decreasing stack of indices

    for (let i = 0; i < n; i++) {
        while (stack.length && nums[stack[stack.length - 1]] < nums[i]) {
            const idx = stack.pop();
            result[idx] = nums[i];
        }
        stack.push(i);
    }
    return result;
}`,
                    java: `public int[] nextGreater(int[] nums) {
    int n = nums.length;
    int[] result = new int[n];
    Arrays.fill(result, -1);
    Deque<Integer> stack = new ArrayDeque<>();

    for (int i = 0; i < n; i++) {
        while (!stack.isEmpty() && nums[stack.peek()] < nums[i]) {
            result[stack.pop()] = nums[i];
        }
        stack.push(i);
    }
    return result;
}`
                },
                problems: ['Daily Temperatures', 'Next Greater Element I', 'Next Greater Element II']
            },
            {
                name: 'Monotonic Increasing (Next Smaller)',
                desc: 'Find next smaller element or histogram area',
                when: 'Largest rectangle in histogram, sum of subarray minimums',
                template: {
                    javascript: `function largestRectangle(heights) {
    const stack = [];  // Increasing stack of indices
    let maxArea = 0;

    for (let i = 0; i <= heights.length; i++) {
        const h = i === heights.length ? 0 : heights[i];

        while (stack.length && heights[stack[stack.length - 1]] > h) {
            const height = heights[stack.pop()];
            const width = stack.length ? i - stack[stack.length - 1] - 1 : i;
            maxArea = Math.max(maxArea, height * width);
        }
        stack.push(i);
    }
    return maxArea;
}`,
                    java: `public int largestRectangle(int[] heights) {
    Deque<Integer> stack = new ArrayDeque<>();
    int maxArea = 0;

    for (int i = 0; i <= heights.length; i++) {
        int h = (i == heights.length) ? 0 : heights[i];

        while (!stack.isEmpty() && heights[stack.peek()] > h) {
            int height = heights[stack.pop()];
            int width = stack.isEmpty() ? i : i - stack.peek() - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        stack.push(i);
    }
    return maxArea;
}`
                },
                problems: ['Largest Rectangle in Histogram', 'Maximal Rectangle', 'Sum of Subarray Minimums']
            },
            {
                name: 'Expression Evaluation',
                desc: 'Evaluate mathematical expressions with operators',
                when: 'Basic calculator, reverse polish notation',
                template: {
                    javascript: `function calculate(s) {
    const stack = [];
    let num = 0, sign = '+';
    s = s.replace(/\\s/g, '') + '+';  // Remove spaces, add terminator

    for (let c of s) {
        if (c >= '0' && c <= '9') {
            num = num * 10 + Number(c);
        } else {
            if (sign === '+') stack.push(num);
            else if (sign === '-') stack.push(-num);
            else if (sign === '*') stack.push(stack.pop() * num);
            else if (sign === '/') stack.push(Math.trunc(stack.pop() / num));
            sign = c;
            num = 0;
        }
    }
    return stack.reduce((a, b) => a + b, 0);
}`,
                    java: `public int calculate(String s) {
    Deque<Integer> stack = new ArrayDeque<>();
    int num = 0;
    char sign = '+';
    s = s.replaceAll("\\\\s", "") + "+";

    for (char c : s.toCharArray()) {
        if (Character.isDigit(c)) {
            num = num * 10 + (c - '0');
        } else {
            if (sign == '+') stack.push(num);
            else if (sign == '-') stack.push(-num);
            else if (sign == '*') stack.push(stack.pop() * num);
            else if (sign == '/') stack.push(stack.pop() / num);
            sign = c;
            num = 0;
        }
    }
    return stack.stream().mapToInt(Integer::intValue).sum();
}`
                },
                problems: ['Basic Calculator II', 'Evaluate Reverse Polish Notation', 'Basic Calculator']
            }
        ],
        commonProblems: ['Valid Parentheses', 'Daily Temperatures', 'Largest Rectangle in Histogram', 'Basic Calculator II', 'Decode String'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)'
    },
    {
        id: 'linked-list',
        category: 'Linked List',
        icon: '🔗',
        difficulty: 'Easy-Medium',
        description: 'Sequential data structure with node-based traversal. Key techniques: reversal, fast/slow pointers, dummy nodes.',
        whenToUse: [
            'In-place reversal (full or partial)',
            'Cycle detection and finding cycle start',
            'Finding middle element',
            'Merging sorted lists',
            'Reordering nodes'
        ],
        codeTemplates: {
            javascript: `// Reverse Linked List
function reverse(head) {
    let prev = null, curr = head;

    while (curr) {
        const next = curr.next;  // Save next
        curr.next = prev;        // Reverse link
        prev = curr;             // Move prev
        curr = next;             // Move curr
    }
    return prev;
}

// Find Middle (slow/fast)
function findMiddle(head) {
    let slow = head, fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}

// Merge Two Sorted Lists
function mergeTwoLists(l1, l2) {
    const dummy = { next: null };
    let tail = dummy;

    while (l1 && l2) {
        if (l1.val <= l2.val) {
            tail.next = l1;
            l1 = l1.next;
        } else {
            tail.next = l2;
            l2 = l2.next;
        }
        tail = tail.next;
    }
    tail.next = l1 || l2;
    return dummy.next;
}`,
            java: `// Reverse Linked List
public ListNode reverse(ListNode head) {
    ListNode prev = null, curr = head;

    while (curr != null) {
        ListNode next = curr.next;  // Save next
        curr.next = prev;           // Reverse link
        prev = curr;                // Move prev
        curr = next;                // Move curr
    }
    return prev;
}

// Find Middle (slow/fast)
public ListNode findMiddle(ListNode head) {
    ListNode slow = head, fast = head;

    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}

// Merge Two Sorted Lists
public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0);
    ListNode tail = dummy;

    while (l1 != null && l2 != null) {
        if (l1.val <= l2.val) {
            tail.next = l1;
            l1 = l1.next;
        } else {
            tail.next = l2;
            l2 = l2.next;
        }
        tail = tail.next;
    }
    tail.next = (l1 != null) ? l1 : l2;
    return dummy.next;
}`
        },
        keyInsights: [
            'ALWAYS use dummy node when head might change',
            'Fast/slow: when fast reaches end, slow is at middle',
            'Cycle start: after meeting, move one to head, both move 1 step until meet',
            'Reverse in groups: track group start/end, connect properly',
            'Draw diagrams! Pointer manipulation is error-prone'
        ],
        commonMistakes: [
            'Losing reference to next node before updating pointers',
            'Not using dummy node when head can change',
            'Null pointer exceptions (always check node && node.next)',
            'Not properly connecting reversed segments'
        ],
        variations: [
            {
                name: 'Iterative Reversal',
                desc: 'Reverse list by changing next pointers',
                when: 'Full reversal, partial reversal',
                template: {
                    javascript: `function reverseList(head) {
    let prev = null, curr = head;
    while (curr) {
        const next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
                    java: `public ListNode reverseList(ListNode head) {
    ListNode prev = null, curr = head;
    while (curr != null) {
        ListNode next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`
                },
                problems: ['Reverse Linked List', 'Reverse Linked List II', 'Reverse Nodes in k-Group']
            },
            {
                name: 'Fast/Slow Pointers',
                desc: 'Two pointers at different speeds',
                when: 'Find middle, cycle detection, nth from end',
                template: {
                    javascript: `// Detect cycle
function hasCycle(head) {
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) return true;
    }
    return false;
}

// Find cycle start
function detectCycle(head) {
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow === fast) {
            slow = head;
            while (slow !== fast) {
                slow = slow.next;
                fast = fast.next;
            }
            return slow;
        }
    }
    return null;
}`,
                    java: `// Detect cycle
public boolean hasCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }
    return false;
}

// Find cycle start
public ListNode detectCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) {
            slow = head;
            while (slow != fast) {
                slow = slow.next;
                fast = fast.next;
            }
            return slow;
        }
    }
    return null;
}`
                },
                problems: ['Linked List Cycle', 'Linked List Cycle II', 'Middle of the Linked List', 'Remove Nth Node From End']
            },
            {
                name: 'Dummy Node Pattern',
                desc: 'Use dummy head to simplify edge cases',
                when: 'Merging lists, removing nodes, when head might change',
                template: {
                    javascript: `function mergeTwoLists(l1, l2) {
    const dummy = new ListNode(0);
    let tail = dummy;

    while (l1 && l2) {
        if (l1.val < l2.val) {
            tail.next = l1;
            l1 = l1.next;
        } else {
            tail.next = l2;
            l2 = l2.next;
        }
        tail = tail.next;
    }
    tail.next = l1 || l2;
    return dummy.next;
}`,
                    java: `public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0);
    ListNode tail = dummy;

    while (l1 != null && l2 != null) {
        if (l1.val < l2.val) {
            tail.next = l1;
            l1 = l1.next;
        } else {
            tail.next = l2;
            l2 = l2.next;
        }
        tail = tail.next;
    }
    tail.next = (l1 != null) ? l1 : l2;
    return dummy.next;
}`
                },
                problems: ['Merge Two Sorted Lists', 'Merge K Sorted Lists', 'Remove Duplicates from Sorted List']
            },
            {
                name: 'In-Place Reordering',
                desc: 'Rearrange nodes without extra space',
                when: 'Reorder list, odd-even linked list',
                template: {
                    javascript: `// Reorder: L0→Ln→L1→Ln-1→L2→Ln-2→...
function reorderList(head) {
    if (!head || !head.next) return;

    // 1. Find middle
    let slow = head, fast = head;
    while (fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // 2. Reverse second half
    let second = slow.next;
    slow.next = null;
    let prev = null;
    while (second) {
        const next = second.next;
        second.next = prev;
        prev = second;
        second = next;
    }

    // 3. Merge two halves
    let first = head;
    second = prev;
    while (second) {
        const tmp1 = first.next, tmp2 = second.next;
        first.next = second;
        second.next = tmp1;
        first = tmp1;
        second = tmp2;
    }
}`,
                    java: `// Reorder: L0→Ln→L1→Ln-1→L2→Ln-2→...
public void reorderList(ListNode head) {
    if (head == null || head.next == null) return;

    // 1. Find middle
    ListNode slow = head, fast = head;
    while (fast.next != null && fast.next.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // 2. Reverse second half
    ListNode second = slow.next;
    slow.next = null;
    ListNode prev = null;
    while (second != null) {
        ListNode next = second.next;
        second.next = prev;
        prev = second;
        second = next;
    }

    // 3. Merge two halves
    ListNode first = head;
    second = prev;
    while (second != null) {
        ListNode tmp1 = first.next, tmp2 = second.next;
        first.next = second;
        second.next = tmp1;
        first = tmp1;
        second = tmp2;
    }
}`
                },
                problems: ['Reorder List', 'Odd Even Linked List', 'Palindrome Linked List']
            }
        ],
        commonProblems: ['Reverse Linked List', 'Linked List Cycle', 'Merge Two Sorted Lists', 'Reorder List', 'Copy List with Random Pointer'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1) for most, O(n) for recursion/HashMap'
    },
    {
        id: 'trees',
        category: 'Trees',
        icon: '🌳',
        difficulty: 'Medium',
        description: 'Hierarchical data structure. Master DFS (preorder, inorder, postorder) and BFS (level order) traversals for most tree problems.',
        whenToUse: [
            'Tree traversal and path problems',
            'Finding depth, height, diameter',
            'Validating BST properties',
            'Level-order operations',
            'Lowest common ancestor',
            'Serialization/deserialization'
        ],
        codeTemplates: {
            javascript: `// DFS - Recursive Template
function dfs(node) {
    if (!node) return baseCase;

    // Preorder: process BEFORE children
    const left = dfs(node.left);
    // Inorder: process BETWEEN children (BST sorted order)
    const right = dfs(node.right);
    // Postorder: process AFTER children

    return combine(left, right, node.val);
}

// BFS - Level Order Traversal
function bfs(root) {
    if (!root) return [];
    const queue = [root], result = [];

    while (queue.length) {
        const levelSize = queue.length;
        const level = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            level.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        result.push(level);
    }
    return result;
}

// Validate BST
function isValidBST(node, min = -Infinity, max = Infinity) {
    if (!node) return true;
    if (node.val <= min || node.val >= max) return false;
    return isValidBST(node.left, min, node.val) &&
           isValidBST(node.right, node.val, max);
}`,
            java: `// DFS - Recursive Template
public int dfs(TreeNode node) {
    if (node == null) return baseCase;

    // Preorder: process BEFORE children
    int left = dfs(node.left);
    // Inorder: process BETWEEN children (BST sorted order)
    int right = dfs(node.right);
    // Postorder: process AFTER children

    return combine(left, right, node.val);
}

// BFS - Level Order Traversal
public List<List<Integer>> bfs(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;

    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);

    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        List<Integer> level = new ArrayList<>();

        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
        result.add(level);
    }
    return result;
}

// Validate BST
public boolean isValidBST(TreeNode node, long min, long max) {
    if (node == null) return true;
    if (node.val <= min || node.val >= max) return false;
    return isValidBST(node.left, min, node.val) &&
           isValidBST(node.right, node.val, max);
}`
        },
        keyInsights: [
            'Inorder traversal of BST gives SORTED order',
            'For BST validation: pass min/max bounds DOWN the tree',
            'LCA: if both targets in same subtree, recurse; else current node is LCA',
            'Diameter/path sum: use closure variable to track global max',
            'Serialize: use preorder + null markers, deserialize with queue'
        ],
        commonMistakes: [
            'Forgetting base case (null node)',
            'Not passing state correctly in recursive calls',
            'Using wrong traversal order for the problem',
            'Integer overflow in BST validation bounds'
        ],
        variations: [
            {
                name: 'DFS Preorder',
                desc: 'Process node before children - good for copying/serializing',
                when: 'Serialize tree, copy tree, path finding',
                template: {
                    javascript: `function preorder(node, result = []) {
    if (!node) return result;
    result.push(node.val);        // Process first
    preorder(node.left, result);
    preorder(node.right, result);
    return result;
}`,
                    java: `public List<Integer> preorder(TreeNode node) {
    List<Integer> result = new ArrayList<>();
    preorderHelper(node, result);
    return result;
}
private void preorderHelper(TreeNode node, List<Integer> result) {
    if (node == null) return;
    result.add(node.val);  // Process first
    preorderHelper(node.left, result);
    preorderHelper(node.right, result);
}`
                },
                problems: ['Serialize and Deserialize Binary Tree', 'Flatten Binary Tree to Linked List']
            },
            {
                name: 'DFS Inorder',
                desc: 'Process node between children - BST gives sorted order',
                when: 'Kth smallest in BST, validate BST, convert BST to sorted list',
                template: {
                    javascript: `function kthSmallest(root, k) {
    let count = 0, result = null;

    function inorder(node) {
        if (!node || result !== null) return;
        inorder(node.left);
        count++;
        if (count === k) { result = node.val; return; }
        inorder(node.right);
    }

    inorder(root);
    return result;
}`,
                    java: `public int kthSmallest(TreeNode root, int k) {
    int[] state = {0, 0};  // [count, result]
    inorder(root, k, state);
    return state[1];
}
private void inorder(TreeNode node, int k, int[] state) {
    if (node == null || state[0] >= k) return;
    inorder(node.left, k, state);
    state[0]++;
    if (state[0] == k) { state[1] = node.val; return; }
    inorder(node.right, k, state);
}`
                },
                problems: ['Kth Smallest Element in BST', 'Validate BST', 'Convert BST to Greater Tree']
            },
            {
                name: 'DFS Postorder',
                desc: 'Process node after children - good for computing from leaves up',
                when: 'Max depth, diameter, path sum, delete tree',
                template: {
                    javascript: `// Diameter of Binary Tree
function diameterOfBinaryTree(root) {
    let maxDiameter = 0;

    function height(node) {
        if (!node) return 0;
        const left = height(node.left);
        const right = height(node.right);
        maxDiameter = Math.max(maxDiameter, left + right);
        return 1 + Math.max(left, right);
    }

    height(root);
    return maxDiameter;
}`,
                    java: `// Diameter of Binary Tree
int maxDiameter = 0;
public int diameterOfBinaryTree(TreeNode root) {
    height(root);
    return maxDiameter;
}
private int height(TreeNode node) {
    if (node == null) return 0;
    int left = height(node.left);
    int right = height(node.right);
    maxDiameter = Math.max(maxDiameter, left + right);
    return 1 + Math.max(left, right);
}`
                },
                problems: ['Maximum Depth', 'Diameter of Binary Tree', 'Binary Tree Maximum Path Sum']
            },
            {
                name: 'BFS Level Order',
                desc: 'Process level by level using queue',
                when: 'Level order traversal, right side view, zigzag',
                template: {
                    javascript: `function levelOrder(root) {
    if (!root) return [];
    const queue = [root], result = [];

    while (queue.length) {
        const size = queue.length;
        const level = [];

        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            level.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        result.push(level);
    }
    return result;
}`,
                    java: `public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);

    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
        result.add(level);
    }
    return result;
}`
                },
                problems: ['Binary Tree Level Order Traversal', 'Binary Tree Right Side View', 'Zigzag Level Order']
            }
        ],
        commonProblems: ['Maximum Depth', 'Validate BST', 'Lowest Common Ancestor', 'Binary Tree Level Order', 'Serialize/Deserialize', 'Diameter of Binary Tree'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(h) recursion, O(w) BFS where h=height, w=max width'
    },
    {
        id: 'graphs',
        category: 'Graphs',
        icon: '🕸️',
        difficulty: 'Medium-Hard',
        description: 'Network of nodes and edges. Key algorithms: DFS, BFS, topological sort, Union-Find, Dijkstra.',
        whenToUse: [
            'Connected components (islands)',
            'Shortest path finding',
            'Cycle detection',
            'Dependency ordering (topological sort)',
            'Network/connectivity problems'
        ],
        codeTemplates: {
            javascript: `// DFS on Grid - Number of Islands
function numIslands(grid) {
    const rows = grid.length, cols = grid[0].length;
    let count = 0;

    function dfs(r, c) {
        if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') return;
        grid[r][c] = '0';  // Mark visited
        dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === '1') {
                count++;
                dfs(r, c);
            }
        }
    }
    return count;
}

// BFS - Shortest Path
function shortestPath(graph, start, end) {
    const queue = [[start, 0]];
    const visited = new Set([start]);

    while (queue.length) {
        const [node, dist] = queue.shift();
        if (node === end) return dist;

        for (let neighbor of graph[node]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push([neighbor, dist + 1]);
            }
        }
    }
    return -1;
}

// Topological Sort (Kahn's BFS)
function topologicalSort(numNodes, edges) {
    const graph = Array.from({length: numNodes}, () => []);
    const indegree = new Array(numNodes).fill(0);

    for (let [from, to] of edges) {
        graph[from].push(to);
        indegree[to]++;
    }

    const queue = [];
    for (let i = 0; i < numNodes; i++) {
        if (indegree[i] === 0) queue.push(i);
    }

    const order = [];
    while (queue.length) {
        const node = queue.shift();
        order.push(node);
        for (let neighbor of graph[node]) {
            if (--indegree[neighbor] === 0) queue.push(neighbor);
        }
    }
    return order.length === numNodes ? order : [];  // Empty if cycle
}`,
            java: `// DFS on Grid - Number of Islands
public int numIslands(char[][] grid) {
    int rows = grid.length, cols = grid[0].length;
    int count = 0;

    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            if (grid[r][c] == '1') {
                count++;
                dfs(grid, r, c);
            }
        }
    }
    return count;
}

private void dfs(char[][] grid, int r, int c) {
    if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length
        || grid[r][c] == '0') return;
    grid[r][c] = '0';
    dfs(grid, r + 1, c); dfs(grid, r - 1, c);
    dfs(grid, r, c + 1); dfs(grid, r, c - 1);
}

// Topological Sort (Kahn's BFS)
public int[] topologicalSort(int numNodes, int[][] edges) {
    List<List<Integer>> graph = new ArrayList<>();
    int[] indegree = new int[numNodes];

    for (int i = 0; i < numNodes; i++) graph.add(new ArrayList<>());
    for (int[] edge : edges) {
        graph.get(edge[0]).add(edge[1]);
        indegree[edge[1]]++;
    }

    Queue<Integer> queue = new LinkedList<>();
    for (int i = 0; i < numNodes; i++) {
        if (indegree[i] == 0) queue.offer(i);
    }

    int[] order = new int[numNodes];
    int idx = 0;
    while (!queue.isEmpty()) {
        int node = queue.poll();
        order[idx++] = node;
        for (int neighbor : graph.get(node)) {
            if (--indegree[neighbor] == 0) queue.offer(neighbor);
        }
    }
    return idx == numNodes ? order : new int[0];
}`
        },
        keyInsights: [
            'BFS for unweighted shortest path, DFS for exploration',
            'Topological sort: only for DAGs, use indegree (Kahn) or DFS',
            'Cycle detection: DFS with 3 states (white/gray/black)',
            'Union-Find: efficient for dynamic connectivity',
            'Dijkstra: weighted shortest path with min-heap'
        ],
        commonMistakes: [
            'Forgetting to mark nodes as visited before adding to queue',
            'Not handling disconnected components',
            'Using DFS for shortest path (gives A path, not shortest)',
            'Topological sort on graph with cycles'
        ],
        variations: [
            {
                name: 'Grid DFS/BFS',
                desc: 'Traverse 2D grid treating cells as nodes',
                when: 'Number of islands, flood fill, rotting oranges',
                template: {
                    javascript: `const dirs = [[0,1],[0,-1],[1,0],[-1,0]];

function gridBFS(grid, startR, startC) {
    const rows = grid.length, cols = grid[0].length;
    const queue = [[startR, startC]];
    const visited = new Set([\`\${startR},\${startC}\`]);

    while (queue.length) {
        const [r, c] = queue.shift();
        for (let [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            const key = \`\${nr},\${nc}\`;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols
                && !visited.has(key) && grid[nr][nc] === 1) {
                visited.add(key);
                queue.push([nr, nc]);
            }
        }
    }
}`,
                    java: `int[][] dirs = {{0,1},{0,-1},{1,0},{-1,0}};

void gridBFS(int[][] grid, int startR, int startC) {
    int rows = grid.length, cols = grid[0].length;
    Queue<int[]> queue = new LinkedList<>();
    boolean[][] visited = new boolean[rows][cols];
    queue.offer(new int[]{startR, startC});
    visited[startR][startC] = true;

    while (!queue.isEmpty()) {
        int[] cell = queue.poll();
        for (int[] dir : dirs) {
            int nr = cell[0] + dir[0], nc = cell[1] + dir[1];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols
                && !visited[nr][nc] && grid[nr][nc] == 1) {
                visited[nr][nc] = true;
                queue.offer(new int[]{nr, nc});
            }
        }
    }
}`
                },
                problems: ['Number of Islands', 'Rotting Oranges', 'Flood Fill', 'Walls and Gates']
            },
            {
                name: 'Topological Sort',
                desc: 'Order nodes so all edges point forward',
                when: 'Course schedule, build order, alien dictionary',
                template: {
                    javascript: `function canFinish(numCourses, prerequisites) {
    const graph = Array.from({length: numCourses}, () => []);
    const indegree = new Array(numCourses).fill(0);

    for (let [course, prereq] of prerequisites) {
        graph[prereq].push(course);
        indegree[course]++;
    }

    const queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (indegree[i] === 0) queue.push(i);
    }

    let completed = 0;
    while (queue.length) {
        const course = queue.shift();
        completed++;
        for (let next of graph[course]) {
            if (--indegree[next] === 0) queue.push(next);
        }
    }
    return completed === numCourses;
}`,
                    java: `public boolean canFinish(int numCourses, int[][] prerequisites) {
    List<List<Integer>> graph = new ArrayList<>();
    int[] indegree = new int[numCourses];

    for (int i = 0; i < numCourses; i++) graph.add(new ArrayList<>());
    for (int[] pre : prerequisites) {
        graph.get(pre[1]).add(pre[0]);
        indegree[pre[0]]++;
    }

    Queue<Integer> queue = new LinkedList<>();
    for (int i = 0; i < numCourses; i++) {
        if (indegree[i] == 0) queue.offer(i);
    }

    int completed = 0;
    while (!queue.isEmpty()) {
        int course = queue.poll();
        completed++;
        for (int next : graph.get(course)) {
            if (--indegree[next] == 0) queue.offer(next);
        }
    }
    return completed == numCourses;
}`
                },
                problems: ['Course Schedule', 'Course Schedule II', 'Alien Dictionary']
            },
            {
                name: 'Clone Graph',
                desc: 'Deep copy graph maintaining structure',
                when: 'Clone graph, copy list with random pointer',
                template: {
                    javascript: `function cloneGraph(node) {
    if (!node) return null;

    const visited = new Map();

    function clone(n) {
        if (visited.has(n)) return visited.get(n);

        const copy = { val: n.val, neighbors: [] };
        visited.set(n, copy);

        for (let neighbor of n.neighbors) {
            copy.neighbors.push(clone(neighbor));
        }
        return copy;
    }

    return clone(node);
}`,
                    java: `public Node cloneGraph(Node node) {
    if (node == null) return null;
    Map<Node, Node> visited = new HashMap<>();
    return clone(node, visited);
}

private Node clone(Node node, Map<Node, Node> visited) {
    if (visited.containsKey(node)) return visited.get(node);

    Node copy = new Node(node.val, new ArrayList<>());
    visited.put(node, copy);

    for (Node neighbor : node.neighbors) {
        copy.neighbors.add(clone(neighbor, visited));
    }
    return copy;
}`
                },
                problems: ['Clone Graph', 'Copy List with Random Pointer']
            },
            {
                name: 'Dijkstra (Weighted Shortest Path)',
                desc: 'Find shortest path in weighted graph',
                when: 'Network delay time, cheapest flights, path with minimum effort',
                template: {
                    javascript: `function dijkstra(graph, n, start) {
    const dist = new Array(n).fill(Infinity);
    dist[start] = 0;
    const pq = [[0, start]];  // [distance, node]

    while (pq.length) {
        pq.sort((a, b) => a[0] - b[0]);
        const [d, u] = pq.shift();

        if (d > dist[u]) continue;  // Skip outdated

        for (let [v, w] of graph[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push([dist[v], v]);
            }
        }
    }
    return dist;
}`,
                    java: `public int[] dijkstra(List<List<int[]>> graph, int n, int start) {
    int[] dist = new int[n];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[start] = 0;

    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    pq.offer(new int[]{0, start});

    while (!pq.isEmpty()) {
        int[] curr = pq.poll();
        int d = curr[0], u = curr[1];

        if (d > dist[u]) continue;

        for (int[] edge : graph.get(u)) {
            int v = edge[0], w = edge[1];
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.offer(new int[]{dist[v], v});
            }
        }
    }
    return dist;
}`
                },
                problems: ['Network Delay Time', 'Cheapest Flights Within K Stops', 'Path With Minimum Effort']
            }
        ],
        commonProblems: ['Number of Islands', 'Course Schedule', 'Clone Graph', 'Word Ladder', 'Alien Dictionary', 'Network Delay Time'],
        timeComplexity: 'O(V + E) for DFS/BFS, O((V+E)logV) for Dijkstra',
        spaceComplexity: 'O(V + E)'
    },
    {
        id: 'heap',
        category: 'Heap / Priority Queue',
        icon: '⛰️',
        difficulty: 'Medium',
        description: 'Efficiently track min/max elements. Essential for top K, streaming median, and scheduling.',
        whenToUse: [
            'Finding K largest/smallest elements',
            'Streaming median',
            'Merge K sorted lists',
            'Task scheduling',
            'Continuous min/max tracking'
        ],
        codeTemplates: {
            javascript: `// K Largest Elements (using min-heap of size K)
function kLargest(nums, k) {
    // In JS, simulate with sorted array (use proper heap in interview)
    const minHeap = [];

    for (let num of nums) {
        minHeap.push(num);
        minHeap.sort((a, b) => a - b);
        if (minHeap.length > k) minHeap.shift();
    }
    return minHeap[0];  // Kth largest
}

// Two Heaps - Find Median from Data Stream
class MedianFinder {
    constructor() {
        this.small = [];  // Max heap (negate values)
        this.large = [];  // Min heap
    }

    addNum(num) {
        // Add to max heap (small)
        this.small.push(-num);
        this.small.sort((a, b) => a - b);

        // Balance: move largest of small to large
        this.large.push(-this.small.shift());
        this.large.sort((a, b) => a - b);

        // Ensure small has >= elements
        if (this.large.length > this.small.length) {
            this.small.push(-this.large.shift());
            this.small.sort((a, b) => a - b);
        }
    }

    findMedian() {
        if (this.small.length > this.large.length) {
            return -this.small[0];
        }
        return (-this.small[0] + this.large[0]) / 2;
    }
}`,
            java: `// K Largest Elements (using min-heap of size K)
public int findKthLargest(int[] nums, int k) {
    PriorityQueue<Integer> minHeap = new PriorityQueue<>();

    for (int num : nums) {
        minHeap.offer(num);
        if (minHeap.size() > k) {
            minHeap.poll();
        }
    }
    return minHeap.peek();  // Kth largest
}

// Two Heaps - Find Median from Data Stream
class MedianFinder {
    PriorityQueue<Integer> small;  // Max heap
    PriorityQueue<Integer> large;  // Min heap

    public MedianFinder() {
        small = new PriorityQueue<>(Collections.reverseOrder());
        large = new PriorityQueue<>();
    }

    public void addNum(int num) {
        small.offer(num);
        large.offer(small.poll());

        if (large.size() > small.size()) {
            small.offer(large.poll());
        }
    }

    public double findMedian() {
        if (small.size() > large.size()) {
            return small.peek();
        }
        return (small.peek() + large.peek()) / 2.0;
    }
}`
        },
        keyInsights: [
            'K largest: use MIN-heap of size K (top is Kth largest)',
            'K smallest: use MAX-heap of size K',
            'Streaming median: two heaps (max for lower half, min for upper)',
            'Merge K lists: heap of K elements, always pop min and push its next',
            'Java: PriorityQueue is min-heap by default'
        ],
        commonMistakes: [
            'Using wrong heap type (min vs max)',
            'Forgetting to maintain heap size limit',
            'Not handling empty heap cases',
            'In JS: forgetting that arrays don\'t maintain heap property'
        ],
        variations: [
            {
                name: 'Top K Elements',
                desc: 'Find K largest/smallest/most frequent',
                when: 'Kth largest, top K frequent, K closest points',
                template: {
                    javascript: `function topKFrequent(nums, k) {
    const freq = new Map();
    for (let num of nums) {
        freq.set(num, (freq.get(num) || 0) + 1);
    }

    // Use bucket sort for O(n)
    const buckets = Array.from({length: nums.length + 1}, () => []);
    for (let [num, count] of freq) {
        buckets[count].push(num);
    }

    const result = [];
    for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
        result.push(...buckets[i]);
    }
    return result.slice(0, k);
}`,
                    java: `public int[] topKFrequent(int[] nums, int k) {
    Map<Integer, Integer> freq = new HashMap<>();
    for (int num : nums) {
        freq.merge(num, 1, Integer::sum);
    }

    PriorityQueue<Integer> heap = new PriorityQueue<>(
        (a, b) -> freq.get(a) - freq.get(b)
    );

    for (int num : freq.keySet()) {
        heap.offer(num);
        if (heap.size() > k) heap.poll();
    }

    int[] result = new int[k];
    for (int i = k - 1; i >= 0; i--) {
        result[i] = heap.poll();
    }
    return result;
}`
                },
                problems: ['Kth Largest Element', 'Top K Frequent Elements', 'K Closest Points to Origin']
            },
            {
                name: 'Two Heaps',
                desc: 'Maintain two heaps for median or partition',
                when: 'Find median from data stream, sliding window median',
                template: {
                    javascript: `class MedianFinder {
    constructor() {
        this.lo = [];  // Max heap (lower half) - store negated
        this.hi = [];  // Min heap (upper half)
    }

    addNum(num) {
        // Add to max heap
        this.lo.push(-num);
        this.lo.sort((a, b) => a - b);

        // Balance: largest of lo goes to hi
        this.hi.push(-this.lo.shift());
        this.hi.sort((a, b) => a - b);

        // Keep lo size >= hi size
        if (this.hi.length > this.lo.length) {
            this.lo.push(-this.hi.shift());
            this.lo.sort((a, b) => a - b);
        }
    }

    findMedian() {
        return this.lo.length > this.hi.length
            ? -this.lo[0]
            : (-this.lo[0] + this.hi[0]) / 2;
    }
}`,
                    java: `class MedianFinder {
    PriorityQueue<Integer> lo = new PriorityQueue<>(Collections.reverseOrder());
    PriorityQueue<Integer> hi = new PriorityQueue<>();

    public void addNum(int num) {
        lo.offer(num);
        hi.offer(lo.poll());
        if (hi.size() > lo.size()) {
            lo.offer(hi.poll());
        }
    }

    public double findMedian() {
        return lo.size() > hi.size()
            ? lo.peek()
            : (lo.peek() + hi.peek()) / 2.0;
    }
}`
                },
                problems: ['Find Median from Data Stream', 'Sliding Window Median']
            },
            {
                name: 'Merge K Sorted',
                desc: 'Merge multiple sorted sequences efficiently',
                when: 'Merge K sorted lists, smallest range',
                template: {
                    javascript: `function mergeKLists(lists) {
    const heap = [];

    // Initialize with first element of each list
    for (let i = 0; i < lists.length; i++) {
        if (lists[i]) {
            heap.push({val: lists[i].val, node: lists[i], idx: i});
        }
    }

    const dummy = {next: null};
    let tail = dummy;

    while (heap.length) {
        heap.sort((a, b) => a.val - b.val);
        const {node} = heap.shift();
        tail.next = node;
        tail = tail.next;

        if (node.next) {
            heap.push({val: node.next.val, node: node.next});
        }
    }
    return dummy.next;
}`,
                    java: `public ListNode mergeKLists(ListNode[] lists) {
    PriorityQueue<ListNode> heap = new PriorityQueue<>(
        (a, b) -> a.val - b.val
    );

    for (ListNode node : lists) {
        if (node != null) heap.offer(node);
    }

    ListNode dummy = new ListNode(0);
    ListNode tail = dummy;

    while (!heap.isEmpty()) {
        ListNode node = heap.poll();
        tail.next = node;
        tail = tail.next;
        if (node.next != null) heap.offer(node.next);
    }
    return dummy.next;
}`
                },
                problems: ['Merge K Sorted Lists', 'Smallest Range Covering Elements from K Lists']
            }
        ],
        commonProblems: ['Kth Largest Element', 'Top K Frequent Elements', 'Find Median from Data Stream', 'Merge K Sorted Lists', 'Task Scheduler'],
        timeComplexity: 'O(log n) push/pop, O(n log k) for top K',
        spaceComplexity: 'O(k) for top K, O(n) for median'
    },
    {
        id: 'dynamic-programming',
        category: 'Dynamic Programming',
        icon: '📊',
        difficulty: 'Medium-Hard',
        description: 'Break problem into overlapping subproblems. Define state, recurrence relation, and base cases.',
        whenToUse: [
            'Counting ways (paths, combinations)',
            'Optimization (min/max cost/profit)',
            'Decision making (take or skip)',
            'String matching (edit distance, LCS)',
            'Knapsack variations'
        ],
        codeTemplates: {
            javascript: `// 1D DP - House Robber
function rob(nums) {
    if (nums.length === 0) return 0;
    if (nums.length === 1) return nums[0];

    let prev2 = nums[0];
    let prev1 = Math.max(nums[0], nums[1]);

    for (let i = 2; i < nums.length; i++) {
        const curr = Math.max(prev1, prev2 + nums[i]);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

// 2D DP - Longest Common Subsequence
function longestCommonSubsequence(text1, text2) {
    const m = text1.length, n = text2.length;
    const dp = Array.from({length: m + 1}, () => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i-1] === text2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    return dp[m][n];
}

// Unbounded Knapsack - Coin Change
function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (let coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
}`,
            java: `// 1D DP - House Robber
public int rob(int[] nums) {
    if (nums.length == 0) return 0;
    if (nums.length == 1) return nums[0];

    int prev2 = nums[0];
    int prev1 = Math.max(nums[0], nums[1]);

    for (int i = 2; i < nums.length; i++) {
        int curr = Math.max(prev1, prev2 + nums[i]);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

// 2D DP - Longest Common Subsequence
public int longestCommonSubsequence(String text1, String text2) {
    int m = text1.length(), n = text2.length();
    int[][] dp = new int[m + 1][n + 1];

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1.charAt(i-1) == text2.charAt(j-1)) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    return dp[m][n];
}

// Unbounded Knapsack - Coin Change
public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);
    dp[0] = 0;

    for (int coin : coins) {
        for (int i = coin; i <= amount; i++) {
            dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`
        },
        keyInsights: [
            '1. Define STATE: what info do I need to make a decision?',
            '2. Define RECURRENCE: how does current depend on previous?',
            '3. Define BASE CASE: simplest subproblem answer',
            '0/1 Knapsack: inner loop REVERSE; Unbounded: FORWARD',
            'Space optimization: if dp[i] only needs dp[i-1], use 2 variables'
        ],
        commonMistakes: [
            'Wrong state definition (missing or extra dimensions)',
            'Wrong loop order (0/1 vs unbounded knapsack)',
            'Forgetting base cases',
            'Not considering all transitions'
        ],
        variations: [
            {
                name: '1D Linear DP',
                desc: 'State depends on previous few elements',
                when: 'Fibonacci, climbing stairs, house robber',
                template: {
                    javascript: `function climbStairs(n) {
    if (n <= 2) return n;
    let prev2 = 1, prev1 = 2;
    for (let i = 3; i <= n; i++) {
        const curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`,
                    java: `public int climbStairs(int n) {
    if (n <= 2) return n;
    int prev2 = 1, prev1 = 2;
    for (int i = 3; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`
                },
                problems: ['Climbing Stairs', 'House Robber', 'House Robber II', 'Decode Ways']
            },
            {
                name: '2D String DP',
                desc: 'Compare two strings character by character',
                when: 'Edit distance, LCS, regex matching',
                template: {
                    javascript: `function editDistance(word1, word2) {
    const m = word1.length, n = word2.length;
    const dp = Array.from({length: m+1}, () => Array(n+1).fill(0));

    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i-1] === word2[j-1]) {
                dp[i][j] = dp[i-1][j-1];
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i-1][j],     // delete
                    dp[i][j-1],     // insert
                    dp[i-1][j-1]    // replace
                );
            }
        }
    }
    return dp[m][n];
}`,
                    java: `public int editDistance(String word1, String word2) {
    int m = word1.length(), n = word2.length();
    int[][] dp = new int[m+1][n+1];

    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (word1.charAt(i-1) == word2.charAt(j-1)) {
                dp[i][j] = dp[i-1][j-1];
            } else {
                dp[i][j] = 1 + Math.min(dp[i-1][j-1],
                    Math.min(dp[i-1][j], dp[i][j-1]));
            }
        }
    }
    return dp[m][n];
}`
                },
                problems: ['Edit Distance', 'Longest Common Subsequence', 'Regular Expression Matching']
            },
            {
                name: '0/1 Knapsack',
                desc: 'Each item can be used at most once',
                when: 'Partition equal subset sum, target sum',
                template: {
                    javascript: `function canPartition(nums) {
    const total = nums.reduce((a, b) => a + b, 0);
    if (total % 2 !== 0) return false;
    const target = total / 2;

    const dp = new Array(target + 1).fill(false);
    dp[0] = true;

    for (let num of nums) {
        // REVERSE to avoid using same item twice
        for (let j = target; j >= num; j--) {
            dp[j] = dp[j] || dp[j - num];
        }
    }
    return dp[target];
}`,
                    java: `public boolean canPartition(int[] nums) {
    int total = Arrays.stream(nums).sum();
    if (total % 2 != 0) return false;
    int target = total / 2;

    boolean[] dp = new boolean[target + 1];
    dp[0] = true;

    for (int num : nums) {
        // REVERSE to avoid using same item twice
        for (int j = target; j >= num; j--) {
            dp[j] = dp[j] || dp[j - num];
        }
    }
    return dp[target];
}`
                },
                problems: ['Partition Equal Subset Sum', 'Target Sum', 'Last Stone Weight II']
            },
            {
                name: 'Unbounded Knapsack',
                desc: 'Each item can be used unlimited times',
                when: 'Coin change, integer break',
                template: {
                    javascript: `function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (let coin of coins) {
        // FORWARD allows reusing same coin
        for (let i = coin; i <= amount; i++) {
            dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
}`,
                    java: `public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);
    dp[0] = 0;

    for (int coin : coins) {
        // FORWARD allows reusing same coin
        for (int i = coin; i <= amount; i++) {
            dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`
                },
                problems: ['Coin Change', 'Coin Change II', 'Integer Break']
            }
        ],
        commonProblems: ['Climbing Stairs', 'House Robber', 'Coin Change', 'Longest Increasing Subsequence', 'Edit Distance', 'Word Break'],
        timeComplexity: 'O(n) to O(n*m) typically',
        spaceComplexity: 'O(n) to O(n*m), often optimizable'
    },
    {
        id: 'backtracking',
        category: 'Backtracking',
        icon: '🔙',
        difficulty: 'Medium',
        description: 'Build solutions incrementally, abandoning paths that cannot lead to valid solutions.',
        whenToUse: [
            'Generate all combinations/permutations/subsets',
            'Constraint satisfaction (Sudoku, N-Queens)',
            'Path finding with constraints',
            'String partitioning',
            'Decision trees'
        ],
        codeTemplates: {
            javascript: `// Subsets
function subsets(nums) {
    const result = [];

    function backtrack(start, current) {
        result.push([...current]);  // Add current subset

        for (let i = start; i < nums.length; i++) {
            current.push(nums[i]);
            backtrack(i + 1, current);
            current.pop();  // Backtrack
        }
    }

    backtrack(0, []);
    return result;
}

// Permutations
function permute(nums) {
    const result = [];

    function backtrack(current, used) {
        if (current.length === nums.length) {
            result.push([...current]);
            return;
        }

        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            current.push(nums[i]);
            backtrack(current, used);
            current.pop();
            used[i] = false;
        }
    }

    backtrack([], new Array(nums.length).fill(false));
    return result;
}

// Combination Sum (elements can repeat)
function combinationSum(candidates, target) {
    const result = [];

    function backtrack(start, current, remaining) {
        if (remaining === 0) {
            result.push([...current]);
            return;
        }
        if (remaining < 0) return;

        for (let i = start; i < candidates.length; i++) {
            current.push(candidates[i]);
            backtrack(i, current, remaining - candidates[i]);  // i, not i+1
            current.pop();
        }
    }

    backtrack(0, [], target);
    return result;
}`,
            java: `// Subsets
public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(nums, 0, new ArrayList<>(), result);
    return result;
}

private void backtrack(int[] nums, int start, List<Integer> current,
                       List<List<Integer>> result) {
    result.add(new ArrayList<>(current));

    for (int i = start; i < nums.length; i++) {
        current.add(nums[i]);
        backtrack(nums, i + 1, current, result);
        current.remove(current.size() - 1);
    }
}

// Permutations
public List<List<Integer>> permute(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(nums, new ArrayList<>(), new boolean[nums.length], result);
    return result;
}

private void backtrack(int[] nums, List<Integer> current, boolean[] used,
                       List<List<Integer>> result) {
    if (current.size() == nums.length) {
        result.add(new ArrayList<>(current));
        return;
    }

    for (int i = 0; i < nums.length; i++) {
        if (used[i]) continue;
        used[i] = true;
        current.add(nums[i]);
        backtrack(nums, current, used, result);
        current.remove(current.size() - 1);
        used[i] = false;
    }
}`
        },
        keyInsights: [
            'ALWAYS undo changes after recursive call (backtrack)',
            'For duplicates: sort first, skip if nums[i] === nums[i-1]',
            'Subsets: start from current index; Permutations: use visited array',
            'Prune EARLY: check constraints before recursing',
            'For grids: mark visited before recursing, unmark after'
        ],
        commonMistakes: [
            'Forgetting to backtrack (undo state changes)',
            'Not handling duplicates properly',
            'Wrong starting index (i vs i+1)',
            'Not copying current array when adding to result'
        ],
        variations: [
            {
                name: 'Subsets',
                desc: 'Generate all possible subsets (power set)',
                when: 'All combinations, power set',
                template: {
                    javascript: `function subsets(nums) {
    const result = [];
    function backtrack(start, path) {
        result.push([...path]);
        for (let i = start; i < nums.length; i++) {
            path.push(nums[i]);
            backtrack(i + 1, path);
            path.pop();
        }
    }
    backtrack(0, []);
    return result;
}`,
                    java: `public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(nums, 0, new ArrayList<>(), result);
    return result;
}
void backtrack(int[] nums, int start, List<Integer> path,
               List<List<Integer>> result) {
    result.add(new ArrayList<>(path));
    for (int i = start; i < nums.length; i++) {
        path.add(nums[i]);
        backtrack(nums, i + 1, path, result);
        path.remove(path.size() - 1);
    }
}`
                },
                problems: ['Subsets', 'Subsets II']
            },
            {
                name: 'Permutations',
                desc: 'Generate all orderings',
                when: 'All arrangements, ordering problems',
                template: {
                    javascript: `function permute(nums) {
    const result = [];
    function backtrack(path, used) {
        if (path.length === nums.length) {
            result.push([...path]);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            path.push(nums[i]);
            backtrack(path, used);
            path.pop();
            used[i] = false;
        }
    }
    backtrack([], new Array(nums.length).fill(false));
    return result;
}`,
                    java: `public List<List<Integer>> permute(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(nums, new ArrayList<>(), new boolean[nums.length], result);
    return result;
}
void backtrack(int[] nums, List<Integer> path, boolean[] used,
               List<List<Integer>> result) {
    if (path.size() == nums.length) {
        result.add(new ArrayList<>(path));
        return;
    }
    for (int i = 0; i < nums.length; i++) {
        if (used[i]) continue;
        used[i] = true;
        path.add(nums[i]);
        backtrack(nums, path, used, result);
        path.remove(path.size() - 1);
        used[i] = false;
    }
}`
                },
                problems: ['Permutations', 'Permutations II']
            },
            {
                name: 'Combinations',
                desc: 'Choose k elements from n',
                when: 'Combination sum, phone letter combinations',
                template: {
                    javascript: `function combine(n, k) {
    const result = [];
    function backtrack(start, path) {
        if (path.length === k) {
            result.push([...path]);
            return;
        }
        // Pruning: need k - path.length more elements
        for (let i = start; i <= n - (k - path.length) + 1; i++) {
            path.push(i);
            backtrack(i + 1, path);
            path.pop();
        }
    }
    backtrack(1, []);
    return result;
}`,
                    java: `public List<List<Integer>> combine(int n, int k) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(n, k, 1, new ArrayList<>(), result);
    return result;
}
void backtrack(int n, int k, int start, List<Integer> path,
               List<List<Integer>> result) {
    if (path.size() == k) {
        result.add(new ArrayList<>(path));
        return;
    }
    for (int i = start; i <= n - (k - path.size()) + 1; i++) {
        path.add(i);
        backtrack(n, k, i + 1, path, result);
        path.remove(path.size() - 1);
    }
}`
                },
                problems: ['Combinations', 'Combination Sum', 'Letter Combinations of Phone Number']
            }
        ],
        commonProblems: ['Subsets', 'Permutations', 'Combination Sum', 'Generate Parentheses', 'Word Search', 'N-Queens'],
        timeComplexity: 'O(2^n) subsets, O(n!) permutations',
        spaceComplexity: 'O(n) recursion depth'
    },
    {
        id: 'intervals',
        category: 'Intervals',
        icon: '📐',
        difficulty: 'Medium',
        description: 'Problems involving ranges with start/end points. Key: sort by start or end time.',
        whenToUse: [
            'Merging overlapping intervals',
            'Finding free time slots',
            'Meeting room scheduling',
            'Interval intersection',
            'Non-overlapping selection'
        ],
        codeTemplates: {
            javascript: `// Merge Intervals
function merge(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    const result = [intervals[0]];

    for (let i = 1; i < intervals.length; i++) {
        const last = result[result.length - 1];
        const curr = intervals[i];

        if (curr[0] <= last[1]) {
            last[1] = Math.max(last[1], curr[1]);  // Merge
        } else {
            result.push(curr);  // No overlap
        }
    }
    return result;
}

// Meeting Rooms II (minimum rooms)
function minMeetingRooms(intervals) {
    const starts = intervals.map(i => i[0]).sort((a, b) => a - b);
    const ends = intervals.map(i => i[1]).sort((a, b) => a - b);

    let rooms = 0, endPtr = 0;

    for (let start of starts) {
        if (start < ends[endPtr]) {
            rooms++;  // Need new room
        } else {
            endPtr++;  // Reuse room (meeting ended)
        }
    }
    return rooms;
}`,
            java: `// Merge Intervals
public int[][] merge(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
    List<int[]> result = new ArrayList<>();
    result.add(intervals[0]);

    for (int i = 1; i < intervals.length; i++) {
        int[] last = result.get(result.size() - 1);
        int[] curr = intervals[i];

        if (curr[0] <= last[1]) {
            last[1] = Math.max(last[1], curr[1]);  // Merge
        } else {
            result.add(curr);  // No overlap
        }
    }
    return result.toArray(new int[0][]);
}

// Meeting Rooms II (minimum rooms)
public int minMeetingRooms(int[][] intervals) {
    int[] starts = new int[intervals.length];
    int[] ends = new int[intervals.length];

    for (int i = 0; i < intervals.length; i++) {
        starts[i] = intervals[i][0];
        ends[i] = intervals[i][1];
    }
    Arrays.sort(starts);
    Arrays.sort(ends);

    int rooms = 0, endPtr = 0;
    for (int start : starts) {
        if (start < ends[endPtr]) {
            rooms++;
        } else {
            endPtr++;
        }
    }
    return rooms;
}`
        },
        keyInsights: [
            'ALWAYS sort by start time (or end time for greedy selection)',
            'Overlap condition: curr.start <= prev.end',
            'For minimum rooms: track concurrent meetings (start/end sweep)',
            'For max non-overlapping: sort by END time (greedy)',
            'Insert interval: binary search for position, then merge'
        ],
        commonMistakes: [
            'Not sorting intervals first',
            'Wrong overlap condition (< vs <=)',
            'Forgetting to update the merged interval end',
            'Using wrong sort key (start vs end)'
        ],
        variations: [
            {
                name: 'Merge Overlapping',
                desc: 'Combine intervals that overlap',
                when: 'Merge intervals, insert interval',
                template: {
                    javascript: `function merge(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    const result = [intervals[0]];

    for (let curr of intervals) {
        const last = result[result.length - 1];
        if (curr[0] <= last[1]) {
            last[1] = Math.max(last[1], curr[1]);
        } else {
            result.push(curr);
        }
    }
    return result;
}`,
                    java: `public int[][] merge(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
    List<int[]> result = new ArrayList<>();
    result.add(intervals[0]);

    for (int[] curr : intervals) {
        int[] last = result.get(result.size() - 1);
        if (curr[0] <= last[1]) {
            last[1] = Math.max(last[1], curr[1]);
        } else {
            result.add(curr);
        }
    }
    return result.toArray(new int[0][]);
}`
                },
                problems: ['Merge Intervals', 'Insert Interval']
            },
            {
                name: 'Meeting Rooms',
                desc: 'Count rooms or check conflicts',
                when: 'Meeting rooms I/II, calendar conflicts',
                template: {
                    javascript: `// Meeting Rooms II - Line Sweep
function minMeetingRooms(intervals) {
    const events = [];
    for (let [start, end] of intervals) {
        events.push([start, 1]);   // Meeting starts
        events.push([end, -1]);    // Meeting ends
    }
    events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

    let rooms = 0, maxRooms = 0;
    for (let [time, delta] of events) {
        rooms += delta;
        maxRooms = Math.max(maxRooms, rooms);
    }
    return maxRooms;
}`,
                    java: `// Meeting Rooms II - Line Sweep
public int minMeetingRooms(int[][] intervals) {
    List<int[]> events = new ArrayList<>();
    for (int[] i : intervals) {
        events.add(new int[]{i[0], 1});   // start
        events.add(new int[]{i[1], -1});  // end
    }
    events.sort((a, b) -> a[0] != b[0] ? a[0] - b[0] : a[1] - b[1]);

    int rooms = 0, maxRooms = 0;
    for (int[] e : events) {
        rooms += e[1];
        maxRooms = Math.max(maxRooms, rooms);
    }
    return maxRooms;
}`
                },
                problems: ['Meeting Rooms', 'Meeting Rooms II', 'My Calendar']
            }
        ],
        commonProblems: ['Merge Intervals', 'Insert Interval', 'Meeting Rooms II', 'Non-overlapping Intervals'],
        timeComplexity: 'O(n log n) for sorting',
        spaceComplexity: 'O(n)'
    },
    {
        id: 'trie',
        category: 'Trie',
        icon: '🔤',
        difficulty: 'Medium',
        description: 'Tree structure for efficient string prefix operations. Each node represents a character.',
        whenToUse: [
            'Prefix-based search (autocomplete)',
            'Word dictionary with insert/search',
            'Word search in grid (Word Search II)',
            'Pattern matching with wildcards'
        ],
        codeTemplates: {
            javascript: `class TrieNode {
    constructor() {
        this.children = {};
        this.isEnd = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (let c of word) {
            if (!node.children[c]) {
                node.children[c] = new TrieNode();
            }
            node = node.children[c];
        }
        node.isEnd = true;
    }

    search(word) {
        const node = this._findNode(word);
        return node !== null && node.isEnd;
    }

    startsWith(prefix) {
        return this._findNode(prefix) !== null;
    }

    _findNode(s) {
        let node = this.root;
        for (let c of s) {
            if (!node.children[c]) return null;
            node = node.children[c];
        }
        return node;
    }
}`,
            java: `class TrieNode {
    TrieNode[] children = new TrieNode[26];
    boolean isEnd = false;
}

class Trie {
    private TrieNode root = new TrieNode();

    public void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (node.children[idx] == null) {
                node.children[idx] = new TrieNode();
            }
            node = node.children[idx];
        }
        node.isEnd = true;
    }

    public boolean search(String word) {
        TrieNode node = findNode(word);
        return node != null && node.isEnd;
    }

    public boolean startsWith(String prefix) {
        return findNode(prefix) != null;
    }

    private TrieNode findNode(String s) {
        TrieNode node = root;
        for (char c : s.toCharArray()) {
            int idx = c - 'a';
            if (node.children[idx] == null) return null;
            node = node.children[idx];
        }
        return node;
    }
}`
        },
        keyInsights: [
            'Each path from root represents a prefix',
            'isEnd flag marks complete words',
            'For wildcards (.): DFS trying all children',
            'Word Search II: build Trie of words, DFS on grid',
            'Can store additional data (count, word) at nodes'
        ],
        commonMistakes: [
            'Forgetting isEnd flag for search vs startsWith',
            'Not handling case sensitivity',
            'Memory issues with large character sets'
        ],
        variations: [
            {
                name: 'Basic Trie',
                desc: 'Insert, search, prefix check',
                when: 'Autocomplete, spell checker',
                template: {
                    javascript: `class Trie {
    constructor() { this.root = {}; }

    insert(word) {
        let node = this.root;
        for (let c of word) {
            if (!node[c]) node[c] = {};
            node = node[c];
        }
        node.isEnd = true;
    }

    search(word) {
        let node = this.root;
        for (let c of word) {
            if (!node[c]) return false;
            node = node[c];
        }
        return node.isEnd === true;
    }

    startsWith(prefix) {
        let node = this.root;
        for (let c of prefix) {
            if (!node[c]) return false;
            node = node[c];
        }
        return true;
    }
}`,
                    java: `class Trie {
    TrieNode root = new TrieNode();

    void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            if (node.children[c-'a'] == null)
                node.children[c-'a'] = new TrieNode();
            node = node.children[c-'a'];
        }
        node.isEnd = true;
    }

    boolean search(String word) {
        TrieNode node = find(word);
        return node != null && node.isEnd;
    }

    boolean startsWith(String prefix) {
        return find(prefix) != null;
    }
}`
                },
                problems: ['Implement Trie', 'Search Suggestions System']
            }
        ],
        commonProblems: ['Implement Trie', 'Design Add and Search Words', 'Word Search II', 'Search Suggestions System'],
        timeComplexity: 'O(L) per operation where L = word length',
        spaceComplexity: 'O(N * L) where N = words, L = avg length'
    },
    {
        id: 'union-find',
        category: 'Union-Find',
        icon: '🔗',
        difficulty: 'Medium',
        description: 'Track disjoint sets efficiently. Supports union (merge) and find (membership).',
        whenToUse: [
            'Dynamic connectivity',
            'Cycle detection in undirected graphs',
            'Accounts merge / friend circles',
            'Island modifications',
            'Kruskal MST'
        ],
        codeTemplates: {
            javascript: `class UnionFind {
    constructor(n) {
        this.parent = Array.from({length: n}, (_, i) => i);
        this.rank = new Array(n).fill(0);
        this.count = n;  // Number of components
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);  // Path compression
        }
        return this.parent[x];
    }

    union(x, y) {
        const px = this.find(x), py = this.find(y);
        if (px === py) return false;  // Already connected

        // Union by rank
        if (this.rank[px] < this.rank[py]) {
            this.parent[px] = py;
        } else if (this.rank[px] > this.rank[py]) {
            this.parent[py] = px;
        } else {
            this.parent[py] = px;
            this.rank[px]++;
        }
        this.count--;
        return true;
    }

    connected(x, y) {
        return this.find(x) === this.find(y);
    }
}`,
            java: `class UnionFind {
    int[] parent, rank;
    int count;

    UnionFind(int n) {
        parent = new int[n];
        rank = new int[n];
        count = n;
        for (int i = 0; i < n; i++) parent[i] = i;
    }

    int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]);  // Path compression
        }
        return parent[x];
    }

    boolean union(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false;

        if (rank[px] < rank[py]) {
            parent[px] = py;
        } else if (rank[px] > rank[py]) {
            parent[py] = px;
        } else {
            parent[py] = px;
            rank[px]++;
        }
        count--;
        return true;
    }

    boolean connected(int x, int y) {
        return find(x) == find(y);
    }
}`
        },
        keyInsights: [
            'Path compression: make nodes point directly to root',
            'Union by rank: attach smaller tree under larger',
            'With both: nearly O(1) amortized per operation',
            'For 2D grids: flatten index as i * cols + j',
            'Track component count with count variable'
        ],
        commonMistakes: [
            'Forgetting path compression (stays O(log n))',
            'Not initializing parent[i] = i',
            'Using union instead of connected for queries'
        ],
        variations: [
            {
                name: 'Basic Union-Find',
                desc: 'Standard implementation with optimizations',
                when: 'Connected components, redundant connection',
                template: {
                    javascript: `class UnionFind {
    constructor(n) {
        this.parent = Array.from({length: n}, (_, i) => i);
        this.rank = new Array(n).fill(0);
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union(x, y) {
        const px = this.find(x), py = this.find(y);
        if (px === py) return false;
        if (this.rank[px] < this.rank[py]) [px, py] = [py, px];
        this.parent[py] = px;
        if (this.rank[px] === this.rank[py]) this.rank[px]++;
        return true;
    }
}`,
                    java: `class UnionFind {
    int[] parent, rank;

    UnionFind(int n) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }

    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }

    boolean union(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false;
        if (rank[px] < rank[py]) { int t = px; px = py; py = t; }
        parent[py] = px;
        if (rank[px] == rank[py]) rank[px]++;
        return true;
    }
}`
                },
                problems: ['Number of Provinces', 'Redundant Connection', 'Accounts Merge']
            }
        ],
        commonProblems: ['Number of Provinces', 'Accounts Merge', 'Redundant Connection', 'Making A Large Island'],
        timeComplexity: 'O(alpha(n)) ~ O(1) amortized',
        spaceComplexity: 'O(n)'
    }
];

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { patternsData };
}
