package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		dbURL = fmt.Sprintf(
			"postgresql://%s:%s@%s:%s/%s?sslmode=%s&sslrootcert=%s",
			os.Getenv("DB_USER"),
			os.Getenv("DB_PASSWORD"),
			os.Getenv("DB_HOST"),
			os.Getenv("DB_PORT"),
			os.Getenv("DB_NAME"),
			os.Getenv("DB_SSL_MODE"),
			os.Getenv("DB_SSL_ROOT_CERT"),
		)
	}

	pool, err := pgxpool.New(context.Background(), dbURL)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	defer pool.Close()

	ctx := context.Background()

	// Seed all problems
	for _, prob := range Problems {
		seedProblem(ctx, pool, prob)
	}

	// Also seed Two Sum if not already in Problems
	seedTwoSum(ctx, pool)

	fmt.Println("\n✅ All problems seeded successfully!")
}

func seedProblem(ctx context.Context, pool *pgxpool.Pool, prob ProblemDef) {
	// Insert or update problem
	problemID := uuid.New()
	_, err := pool.Exec(ctx, `
		INSERT INTO problems (id, title, slug, difficulty, description, constraints, examples, hints)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
		ON CONFLICT (slug) DO UPDATE SET
			title = EXCLUDED.title,
			description = EXCLUDED.description,
			constraints = EXCLUDED.constraints,
			examples = EXCLUDED.examples,
			hints = EXCLUDED.hints
	`, problemID, prob.Title, prob.Slug, prob.Difficulty, prob.Description, prob.Constraints, prob.Examples, prob.Hints)
	if err != nil {
		log.Printf("Failed to insert problem %s: %v", prob.Title, err)
		return
	}
	fmt.Printf("✓ Created problem: %s\n", prob.Title)

	// Get problem ID (in case it already existed)
	err = pool.QueryRow(ctx, "SELECT id FROM problems WHERE slug = $1", prob.Slug).Scan(&problemID)
	if err != nil {
		log.Printf("Failed to get problem ID for %s: %v", prob.Title, err)
		return
	}

	// Delete existing test cases and templates
	pool.Exec(ctx, "DELETE FROM test_cases WHERE problem_id = $1", problemID)
	pool.Exec(ctx, "DELETE FROM problem_templates WHERE problem_id = $1", problemID)

	// Insert test cases
	for i, tc := range prob.TestCases {
		_, err = pool.Exec(ctx, `
			INSERT INTO test_cases (id, problem_id, input, expected_output, is_sample, order_index)
			VALUES ($1, $2, $3, $4, $5, $6)
		`, uuid.New(), problemID, tc.Input, tc.Output, tc.IsSample, i)
		if err != nil {
			log.Printf("Failed to insert test case %d for %s: %v", i, prob.Title, err)
		}
	}
	fmt.Printf("  ✓ Created %d test cases\n", len(prob.TestCases))

	// Insert templates
	for _, t := range prob.Templates {
		_, err = pool.Exec(ctx, `
			INSERT INTO problem_templates (id, problem_id, language_id, template_code, wrapper_code)
			VALUES ($1, $2, $3, $4, $5)
		`, uuid.New(), problemID, t.LangID, t.Template, t.Wrapper)
		if err != nil {
			log.Printf("Failed to insert template for language %d: %v", t.LangID, err)
		}
	}
	fmt.Printf("  ✓ Created %d templates\n", len(prob.Templates))
}

func seedTwoSum(ctx context.Context, pool *pgxpool.Pool) {
	// Check if Two Sum already exists
	var exists bool
	pool.QueryRow(ctx, "SELECT EXISTS(SELECT 1 FROM problems WHERE slug = 'two-sum')").Scan(&exists)
	if exists {
		fmt.Println("✓ Two Sum already exists, skipping")
		return
	}

	problemID := uuid.New()
	_, err := pool.Exec(ctx, `
		INSERT INTO problems (id, title, slug, difficulty, description, constraints, examples, hints)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
		ON CONFLICT (slug) DO UPDATE SET
			title = EXCLUDED.title,
			description = EXCLUDED.description
	`,
		problemID,
		"Two Sum",
		"two-sum",
		"Easy",
		`Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
		`- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
- Only one valid answer exists.`,
		`Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:
Input: nums = [3,3], target = 6
Output: [0,1]`,
		`Hint 1: A brute force approach would be to check every pair of numbers.
Hint 2: Can you use a hash map to improve the time complexity?`,
	)
	if err != nil {
		log.Printf("Failed to insert Two Sum: %v", err)
		return
	}
	fmt.Println("✓ Created problem: Two Sum")

	pool.QueryRow(ctx, "SELECT id FROM problems WHERE slug = 'two-sum'").Scan(&problemID)
	pool.Exec(ctx, "DELETE FROM test_cases WHERE problem_id = $1", problemID)
	pool.Exec(ctx, "DELETE FROM problem_templates WHERE problem_id = $1", problemID)

	testCases := []struct {
		input    string
		output   string
		isSample bool
	}{
		{"[2,7,11,15]\n9", "[0,1]", true},
		{"[3,2,4]\n6", "[1,2]", true},
		{"[3,3]\n6", "[0,1]", true},
		{"[1,2,3,4,5]\n9", "[3,4]", false},
		{"[-1,-2,-3,-4,-5]\n-8", "[2,4]", false},
		{"[0,4,3,0]\n0", "[0,3]", false},
	}

	for i, tc := range testCases {
		pool.Exec(ctx, `
			INSERT INTO test_cases (id, problem_id, input, expected_output, is_sample, order_index)
			VALUES ($1, $2, $3, $4, $5, $6)
		`, uuid.New(), problemID, tc.input, tc.output, tc.isSample, i)
	}
	fmt.Printf("  ✓ Created %d test cases\n", len(testCases))

	templates := []struct {
		langID   int
		template string
		wrapper  string
	}{
		{
			71,
			`def twoSum(nums, target):
    # Write your solution here
    pass`,
			`import json
import sys

{{USER_CODE}}

# Read input
nums = json.loads(input())
target = int(input())

# Call solution and print result
result = twoSum(nums, target)
print(json.dumps(sorted(result), separators=(',', ':')))`,
		},
		{
			63,
			`function twoSum(nums, target) {
    // Write your solution here
}`,
			`{{USER_CODE}}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });

let lines = [];
rl.on('line', (line) => lines.push(line));
rl.on('close', () => {
    const nums = JSON.parse(lines[0]);
    const target = parseInt(lines[1]);
    const result = twoSum(nums, target);
    console.log(JSON.stringify(result.sort((a,b) => a-b)));
});`,
		},
		{
			62,
			`import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        return new int[]{};
    }
}`,
			`import java.util.*;
import java.util.stream.*;

{{USER_CODE}}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String numsStr = sc.nextLine();
        int target = Integer.parseInt(sc.nextLine());

        numsStr = numsStr.substring(1, numsStr.length() - 1);
        int[] nums = numsStr.isEmpty() ? new int[0] :
            Arrays.stream(numsStr.split(","))
                  .mapToInt(s -> Integer.parseInt(s.trim()))
                  .toArray();

        Solution sol = new Solution();
        int[] result = sol.twoSum(nums, target);
        Arrays.sort(result);
        System.out.println(Arrays.toString(result).replace(" ", ""));
    }
}`,
		},
		{
			60,
			`func twoSum(nums []int, target int) []int {
    // Write your solution here
    return nil
}`,
			`package main

import (
    "bufio"
    "encoding/json"
    "fmt"
    "os"
    "sort"
)

{{USER_CODE}}

func main() {
    reader := bufio.NewReader(os.Stdin)

    var nums []int
    line, _ := reader.ReadString('\n')
    json.Unmarshal([]byte(line), &nums)

    var target int
    fmt.Fscan(reader, &target)

    result := twoSum(nums, target)
    sort.Ints(result)
    output, _ := json.Marshal(result)
    fmt.Println(string(output))
}`,
		},
	}

	for _, t := range templates {
		pool.Exec(ctx, `
			INSERT INTO problem_templates (id, problem_id, language_id, template_code, wrapper_code)
			VALUES ($1, $2, $3, $4, $5)
		`, uuid.New(), problemID, t.langID, t.template, t.wrapper)
	}
	fmt.Println("  ✓ Created 4 templates")
}
