export interface Solution {
  approach: string;
  steps: string[];
  code: string;
  language: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export const solutions: Record<string, Solution> = {
  "two-sum": {
    approach:
      "Use a hash map to store each number and its index as you iterate. For each number, check if its complement (target - current number) exists in the map.",
    steps: [
      "Create a hash map to store numbers and their indices",
      "Iterate through the array",
      "For each element, calculate the complement (target - current)",
      "If complement exists in map, return both indices",
      "Otherwise, store current number and index in map",
    ],
    code: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }
}`,
    language: "java",
    timeComplexity: "O(n) - single pass through array",
    spaceComplexity: "O(n) - hash map storage",
  },
  "contains-duplicate": {
    approach:
      "Use a HashSet to track seen numbers. If a number is already in the set, we found a duplicate.",
    steps: [
      "Create a HashSet to store seen numbers",
      "Iterate through the array",
      "For each number, check if it exists in the set",
      "If yes, return true (duplicate found)",
      "If no, add it to the set",
      "Return false if no duplicates found",
    ],
    code: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int num : nums) {
            if (seen.contains(num)) {
                return true;
            }
            seen.add(num);
        }
        return false;
    }
}`,
    language: "java",
    timeComplexity: "O(n) - single pass through array",
    spaceComplexity: "O(n) - HashSet storage",
  },
  "valid-anagram": {
    approach:
      "Count character frequencies in both strings and compare. Two strings are anagrams if they have the same character counts.",
    steps: [
      "Check if lengths are equal (if not, return false)",
      "Create an array of size 26 to count characters",
      "Increment count for characters in first string",
      "Decrement count for characters in second string",
      "Check if all counts are zero",
    ],
    code: `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;

        int[] count = new int[26];
        for (int i = 0; i < s.length(); i++) {
            count[s.charAt(i) - 'a']++;
            count[t.charAt(i) - 'a']--;
        }

        for (int c : count) {
            if (c != 0) return false;
        }
        return true;
    }
}`,
    language: "java",
    timeComplexity: "O(n) - single pass through both strings",
    spaceComplexity: "O(1) - fixed size array of 26",
  },
  "maximum-subarray": {
    approach:
      "Use Kadane's Algorithm. Track the maximum sum ending at each position and the overall maximum.",
    steps: [
      "Initialize maxSum and currentSum with first element",
      "Iterate through array starting from index 1",
      "At each position, decide: start new subarray or extend current",
      "currentSum = max(nums[i], currentSum + nums[i])",
      "Update maxSum if currentSum is larger",
    ],
    code: `class Solution {
    public int maxSubArray(int[] nums) {
        int maxSum = nums[0];
        int currentSum = nums[0];

        for (int i = 1; i < nums.length; i++) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSum = Math.max(maxSum, currentSum);
        }

        return maxSum;
    }
}`,
    language: "java",
    timeComplexity: "O(n) - single pass through array",
    spaceComplexity: "O(1) - only two variables",
  },
  "product-of-array-except-self": {
    approach:
      "Use two passes: first calculate prefix products, then suffix products. Multiply them together.",
    steps: [
      "Create result array",
      "First pass: calculate prefix products (product of all elements to the left)",
      "Second pass: calculate suffix products and multiply with prefix",
      "No division needed, handles zeros correctly",
    ],
    code: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] result = new int[n];

        // Prefix products
        result[0] = 1;
        for (int i = 1; i < n; i++) {
            result[i] = result[i - 1] * nums[i - 1];
        }

        // Suffix products
        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            result[i] *= suffix;
            suffix *= nums[i];
        }

        return result;
    }
}`,
    language: "java",
    timeComplexity: "O(n) - two passes through array",
    spaceComplexity: "O(1) - output array not counted",
  },
  "group-anagrams": {
    approach:
      "Group strings by their sorted character representation. All anagrams will have the same sorted form.",
    steps: [
      "Create a HashMap with sorted string as key",
      "For each string, sort its characters",
      "Use sorted string as key to group anagrams",
      "Return all groups as a list",
    ],
    code: `class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();

        for (String s : strs) {
            char[] chars = s.toCharArray();
            Arrays.sort(chars);
            String key = new String(chars);

            map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
        }

        return new ArrayList<>(map.values());
    }
}`,
    language: "java",
    timeComplexity: "O(n * k log k) - n strings, k is max length",
    spaceComplexity: "O(n * k) - storing all strings",
  },
  "longest-common-prefix": {
    approach:
      "Compare characters at each position across all strings. Stop when mismatch found or string ends.",
    steps: [
      "Handle edge case of empty array",
      "Use first string as reference",
      "For each character position, compare with all other strings",
      "If mismatch or end reached, return prefix so far",
    ],
    code: `class Solution {
    public String longestCommonPrefix(String[] strs) {
        if (strs.length == 0) return "";

        String prefix = strs[0];
        for (int i = 1; i < strs.length; i++) {
            while (strs[i].indexOf(prefix) != 0) {
                prefix = prefix.substring(0, prefix.length() - 1);
                if (prefix.isEmpty()) return "";
            }
        }

        return prefix;
    }
}`,
    language: "java",
    timeComplexity: "O(S) - S is sum of all characters",
    spaceComplexity: "O(1) - only storing prefix",
  },
  "sort-colors": {
    approach:
      "Dutch National Flag algorithm. Use three pointers to partition array into three sections (0s, 1s, 2s).",
    steps: [
      "Initialize low=0, mid=0, high=n-1",
      "While mid <= high:",
      "If nums[mid]=0: swap with low, increment both",
      "If nums[mid]=1: just increment mid",
      "If nums[mid]=2: swap with high, decrement high",
    ],
    code: `class Solution {
    public void sortColors(int[] nums) {
        int low = 0, mid = 0, high = nums.length - 1;

        while (mid <= high) {
            if (nums[mid] == 0) {
                swap(nums, low++, mid++);
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                swap(nums, mid, high--);
            }
        }
    }

    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}`,
    language: "java",
    timeComplexity: "O(n) - single pass",
    spaceComplexity: "O(1) - in-place sorting",
  },
  "rotate-image": {
    approach:
      "Rotate matrix 90 degrees by first transposing (swap rows and columns), then reversing each row.",
    steps: [
      "Transpose the matrix (swap matrix[i][j] with matrix[j][i])",
      "Reverse each row",
      "This achieves 90-degree clockwise rotation",
    ],
    code: `class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;

        // Transpose
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }

        // Reverse each row
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n / 2; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[i][n - 1 - j];
                matrix[i][n - 1 - j] = temp;
            }
        }
    }
}`,
    language: "java",
    timeComplexity: "O(n²) - visit each cell twice",
    spaceComplexity: "O(1) - in-place rotation",
  },
  "add-strings": {
    approach:
      "Simulate addition digit by digit from right to left, handling carry.",
    steps: [
      "Start from rightmost digits of both strings",
      "Add digits and carry",
      "Store result digit (sum % 10)",
      "Update carry (sum / 10)",
      "Continue until all digits processed and no carry",
    ],
    code: `class Solution {
    public String addStrings(String num1, String num2) {
        StringBuilder result = new StringBuilder();
        int i = num1.length() - 1;
        int j = num2.length() - 1;
        int carry = 0;

        while (i >= 0 || j >= 0 || carry > 0) {
            int sum = carry;
            if (i >= 0) sum += num1.charAt(i--) - '0';
            if (j >= 0) sum += num2.charAt(j--) - '0';

            result.append(sum % 10);
            carry = sum / 10;
        }

        return result.reverse().toString();
    }
}`,
    language: "java",
    timeComplexity: "O(max(n, m)) - length of longer string",
    spaceComplexity: "O(max(n, m)) - result string",
  },
};
