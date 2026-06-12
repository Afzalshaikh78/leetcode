export const sampleDPProblem = {
  title: "Climbing Stairs",
  description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
  difficulty: "EASY",
  tags: ["Dynamic Programming", "Math", "Memoization"],
  constraints: "1 <= n <= 45",
  hints: "To reach the nth step, you can either come from the (n-1)th step or the (n-2)th step.",
  editorial:
    "This is a classic dynamic programming problem. The number of ways to reach the nth step is the sum of the number of ways to reach the (n-1)th step and the (n-2)th step, forming a Fibonacci-like sequence.",
  testCases: [
    { input: "2", output: "2" },
    { input: "3", output: "3" },
    { input: "4", output: "5" },
  ],
  examples: {
    JAVASCRIPT: {
      input: "n = 2",
      output: "2",
      explanation: "There are two ways to climb to the top:\n1. 1 step + 1 step\n2. 2 steps",
    },
    PYTHON: {
      input: "n = 3",
      output: "3",
      explanation: "There are three ways to climb to the top:\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step",
    },
    JAVA: {
      input: "n = 4",
      output: "5",
      explanation:
        "There are five ways to climb to the top:\n1. 1 step + 1 step + 1 step + 1 step\n2. 1 step + 1 step + 2 steps\n3. 1 step + 2 steps + 1 step\n4. 2 steps + 1 step + 1 step\n5. 2 steps + 2 steps",
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
* @param {number} n
* @return {number}
*/
function climbStairs(n) {
  // Write your code here
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const n = parseInt(line.trim());
  console.log(climbStairs(n));
  rl.close();
});`,

    PYTHON: `class Solution:
  def climbStairs(self, n: int) -> int:
      # Write your code here
      pass

if __name__ == "__main__":
  import sys
  n = int(sys.stdin.readline().strip())
  sol = Solution()
  print(sol.climbStairs(n))`,

    JAVA: `import java.util.Scanner;

class Main {
  public int climbStairs(int n) {
      // Write your code here
      return 0;
  }

  public static void main(String[] args) {
      Scanner scanner = new Scanner(System.in);
      int n = Integer.parseInt(scanner.nextLine().trim());
      Main main = new Main();
      System.out.println(main.climbStairs(n));
      scanner.close();
  }
}`,
  },

  referenceSolutions: {
    JAVASCRIPT: `/**
* @param {number} n
* @return {number}
*/
function climbStairs(n) {
  if (n <= 2) return n;

  let dp = new Array(n + 1);
  dp[1] = 1;
  dp[2] = 2;

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const n = parseInt(line.trim());
  console.log(climbStairs(n));
  rl.close();
});`,

    PYTHON: `class Solution:
  def climbStairs(self, n: int) -> int:
      if n <= 2:
          return n
      dp = [0] * (n + 1)
      dp[1] = 1
      dp[2] = 2
      for i in range(3, n + 1):
          dp[i] = dp[i - 1] + dp[i - 2]
      return dp[n]

if __name__ == "__main__":
  import sys
  n = int(sys.stdin.readline().strip())
  sol = Solution()
  print(sol.climbStairs(n))`,

    JAVA: `import java.util.Scanner;

class Main {
  public int climbStairs(int n) {
      if (n <= 2) return n;

      int[] dp = new int[n + 1];
      dp[1] = 1;
      dp[2] = 2;

      for (int i = 3; i <= n; i++) {
          dp[i] = dp[i - 1] + dp[i - 2];
      }

      return dp[n];
  }

  public static void main(String[] args) {
      Scanner scanner = new Scanner(System.in);
      int n = Integer.parseInt(scanner.nextLine().trim());
      Main main = new Main();
      System.out.println(main.climbStairs(n));
      scanner.close();
  }
}`,
  },
};

export const sampleStringProblem = {
  title: "Valid Palindrome",
  description:
    "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.",
  difficulty: "EASY",
  tags: ["String", "Two Pointers"],
  constraints: "1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.",
  hints: "Consider using two pointers, one from the start and one from the end, moving towards the center.",
  editorial: "We can use two pointers approach to check if the string is a palindrome. One pointer starts from the beginning and the other from the end, moving towards each other.",
  testCases: [
    { input: "A man, a plan, a canal: Panama", output: "true" },
    { input: "race a car", output: "false" },
    { input: " ", output: "true" },
  ],
  examples: {
    JAVASCRIPT: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
    PYTHON: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
    JAVA: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
 * @param {string} s
 * @return {boolean}
 */
function isPalindrome(s) {
  // Write your code here
}

// Add readline for dynamic input handling
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

// Process input line
rl.on('line', (line) => {
  // Call solution with the input string
  const result = isPalindrome(line);
  
  // Output the result
  console.log(result ? "true" : "false");
  rl.close();
});`,
    PYTHON: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        # Write your code here
        pass

# Input parsing
if __name__ == "__main__":
    import sys
    # Read the input string
    s = sys.stdin.readline().strip()
    
    # Call solution
    sol = Solution()
    result = sol.isPalindrome(s)
    
    # Output result
    print(str(result).lower())  # Convert True/False to lowercase true/false`,
    JAVA: `import java.util.Scanner;

public class Main {
    public static String preprocess(String s) {
        return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    }

    public static boolean isPalindrome(String s) {
       
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();

        boolean result = isPalindrome(input);
        System.out.println(result ? "true" : "false");
    }
}
`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
 * @param {string} s
 * @return {boolean}
 */
function isPalindrome(s) {
  // Convert to lowercase and remove non-alphanumeric characters
  s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Check if it's a palindrome
  let left = 0;
  let right = s.length - 1;
  
  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    }
    left++;
    right--;
  }
  
  return true;
}

// Add readline for dynamic input handling
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

// Process input line
rl.on('line', (line) => {
  // Call solution with the input string
  const result = isPalindrome(line);
  
  // Output the result
  console.log(result ? "true" : "false");
  rl.close();
});`,
    PYTHON: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        # Convert to lowercase and keep only alphanumeric characters
        filtered_chars = [c.lower() for c in s if c.isalnum()]
        
        # Check if it's a palindrome
        return filtered_chars == filtered_chars[::-1]

# Input parsing
if __name__ == "__main__":
    import sys
    # Read the input string
    s = sys.stdin.readline().strip()
    
    # Call solution
    sol = Solution()
    result = sol.isPalindrome(s)
    
    # Output result
    print(str(result).lower())  # Convert True/False to lowercase true/false`,
    JAVA: `import java.util.Scanner;

public class Main {
    public static String preprocess(String s) {
        return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    }

    public static boolean isPalindrome(String s) {
        s = preprocess(s);
        int left = 0, right = s.length() - 1;

        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) return false;
            left++;
            right--;
        }

        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();

        boolean result = isPalindrome(input);
        System.out.println(result ? "true" : "false");
    }
}
`,
  },
};

export const sampleArrayProblem = {
  title: "Maximum Subarray",
  description: "Given an integer array nums, find the contiguous subarray with the largest sum, and return its sum.",
  difficulty: "MEDIUM",
  tags: ["Array", "Dynamic Programming", "Kadane"],
  constraints: "1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4",
  hints: "Track the best subarray ending at each position, then compare it with the global best. You can either extend the previous subarray or start fresh.",
  editorial:
    "This problem is a classic application of Kadane's algorithm. At each index, the best sum ending there is either the current number alone or the current number plus the previous best ending sum. The answer is the maximum of all ending sums.",
  testCases: [
    { input: "[-2,1,-3,4,-1,2,1,-5,4]", output: "6" },
    { input: "[1]", output: "1" },
    { input: "[5,4,-1,7,8]", output: "23" },
  ],
  examples: {
    JAVASCRIPT: {
      input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
      output: "6",
      explanation: "The subarray [4,-1,2,1] has the largest sum 6.",
    },
    PYTHON: {
      input: "nums = [1]",
      output: "1",
      explanation: "The only subarray is [1], so the answer is 1.",
    },
    JAVA: {
      input: "nums = [5,4,-1,7,8]",
      output: "23",
      explanation: "The whole array has the largest sum 23.",
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
  // Write your code here
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const nums = JSON.parse(line.trim());
  console.log(maxSubArray(nums));
  rl.close();
});`,
    PYTHON: `class Solution:
    def maxSubArray(self, nums):
        # Write your code here
        pass

if __name__ == "__main__":
    import sys, json
    nums = json.loads(sys.stdin.readline().strip())
    sol = Solution()
    print(sol.maxSubArray(nums))`,
    JAVA: `import java.util.*;

class Main {
    public int maxSubArray(int[] nums) {
        // Write your code here
        return 0;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine().trim();
        input = input.substring(1, input.length() - 1);
        String[] parts = input.isEmpty() ? new String[0] : input.split(",");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            nums[i] = Integer.parseInt(parts[i].trim());
        }
        Main main = new Main();
        System.out.println(main.maxSubArray(nums));
        scanner.close();
    }
}`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
  let current = nums[0];
  let best = nums[0];

  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    best = Math.max(best, current);
  }

  return best;
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const nums = JSON.parse(line.trim());
  console.log(maxSubArray(nums));
  rl.close();
});`,
    PYTHON: `class Solution:
    def maxSubArray(self, nums):
        current = best = nums[0]
        for num in nums[1:]:
            current = max(num, current + num)
            best = max(best, current)
        return best

if __name__ == "__main__":
    import sys, json
    nums = json.loads(sys.stdin.readline().strip())
    sol = Solution()
    print(sol.maxSubArray(nums))`,
    JAVA: `import java.util.*;

class Main {
    public int maxSubArray(int[] nums) {
        int current = nums[0];
        int best = nums[0];

        for (int i = 1; i < nums.length; i++) {
            current = Math.max(nums[i], current + nums[i]);
            best = Math.max(best, current);
        }

        return best;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine().trim();
        input = input.substring(1, input.length() - 1);
        String[] parts = input.isEmpty() ? new String[0] : input.split(",");
        int[] nums = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            nums[i] = Integer.parseInt(parts[i].trim());
        }
        Main main = new Main();
        System.out.println(main.maxSubArray(nums));
        scanner.close();
    }
}`,
  },
};

// ─── NEW: Linked List ────────────────────────────────────────────────────────

export const sampleLinkedListProblem = {
  title: "Reverse Linked List",
  description:
    "Given the head of a singly linked list, reverse the list, and return the reversed list. The list is represented as a space-separated sequence of integers. Output the reversed sequence.",
  difficulty: "EASY",
  tags: ["Linked List", "Iterative", "Recursion"],
  constraints: "0 <= number of nodes <= 5000\n-5000 <= Node.val <= 5000",
  hints: "Use three pointers — prev, curr, and next — to iteratively reverse each link as you traverse the list.",
  editorial:
    "Iterate through the list maintaining a prev pointer initialised to null. At each step, save next, flip curr.next to prev, then advance both pointers. When curr reaches null, prev is the new head.",
  testCases: [
    { input: "1 2 3 4 5", output: "5 4 3 2 1" },
    { input: "1 2", output: "2 1" },
    { input: "", output: "" },
  ],
  examples: {
    JAVASCRIPT: {
      input: "head = [1,2,3,4,5]",
      output: "[5,4,3,2,1]",
      explanation: "The linked list 1→2→3→4→5 becomes 5→4→3→2→1.",
    },
    PYTHON: {
      input: "head = [1,2]",
      output: "[2,1]",
      explanation: "The linked list 1→2 becomes 2→1.",
    },
    JAVA: {
      input: "head = []",
      output: "[]",
      explanation: "An empty list reversed is still empty.",
    },
  },
  codeSnippets: {
    JAVASCRIPT: `class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function reverseList(head) {
  // Write your code here
}

// --- I/O boilerplate ---
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, terminal: false });

rl.on('line', (line) => {
  const vals = line.trim().split(' ').filter(Boolean).map(Number);
  let head = null;
  for (let i = vals.length - 1; i >= 0; i--) head = new ListNode(vals[i], head);
  let node = reverseList(head);
  const result = [];
  while (node) { result.push(node.val); node = node.next; }
  console.log(result.join(' '));
  rl.close();
});`,
    PYTHON: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def reverseList(self, head):
        # Write your code here
        pass

if __name__ == "__main__":
    import sys
    vals = sys.stdin.readline().strip().split()
    head = None
    for v in reversed(vals):
        head = ListNode(int(v), head)
    sol = Solution()
    node = sol.reverseList(head)
    result = []
    while node:
        result.append(str(node.val))
        node = node.next
    print(' '.join(result))`,
    JAVA: `import java.util.*;

class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }

    public ListNode reverseList(ListNode head) {
        // Write your code here
        return null;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine().trim();
        ListNode dummy = new ListNode(0), cur = dummy;
        if (!line.isEmpty()) {
            for (String s : line.split(" ")) {
                cur.next = new ListNode(Integer.parseInt(s));
                cur = cur.next;
            }
        }
        Main m = new Main();
        ListNode node = m.reverseList(dummy.next);
        StringBuilder sb = new StringBuilder();
        while (node != null) {
            if (sb.length() > 0) sb.append(' ');
            sb.append(node.val);
            node = node.next;
        }
        System.out.println(sb);
    }
}`,
  },
  referenceSolutions: {
    JAVASCRIPT: `class ListNode {
  constructor(val, next = null) { this.val = val; this.next = next; }
}

function reverseList(head) {
  let prev = null, curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, terminal: false });
rl.on('line', (line) => {
  const vals = line.trim().split(' ').filter(Boolean).map(Number);
  let head = null;
  for (let i = vals.length - 1; i >= 0; i--) head = new ListNode(vals[i], head);
  let node = reverseList(head);
  const result = [];
  while (node) { result.push(node.val); node = node.next; }
  console.log(result.join(' '));
  rl.close();
});`,
    PYTHON: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def reverseList(self, head):
        prev, curr = None, head
        while curr:
            nxt = curr.next
            curr.next = prev
            prev = curr
            curr = nxt
        return prev

if __name__ == "__main__":
    import sys
    vals = sys.stdin.readline().strip().split()
    head = None
    for v in reversed(vals):
        head = ListNode(int(v), head)
    sol = Solution()
    node = sol.reverseList(head)
    result = []
    while node:
        result.append(str(node.val))
        node = node.next
    print(' '.join(result))`,
    JAVA: `import java.util.*;

class Main {
    static class ListNode {
        int val; ListNode next;
        ListNode(int val) { this.val = val; }
    }

    public ListNode reverseList(ListNode head) {
        ListNode prev = null, curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine().trim();
        ListNode dummy = new ListNode(0), cur = dummy;
        if (!line.isEmpty()) {
            for (String s : line.split(" ")) {
                cur.next = new ListNode(Integer.parseInt(s));
                cur = cur.next;
            }
        }
        Main m = new Main();
        ListNode node = m.reverseList(dummy.next);
        StringBuilder sb = new StringBuilder();
        while (node != null) {
            if (sb.length() > 0) sb.append(' ');
            sb.append(node.val);
            node = node.next;
        }
        System.out.println(sb);
    }
}`,
  },
};

// ─── NEW: Stack ──────────────────────────────────────────────────────────────

export const sampleStackProblem = {
  title: "Valid Parentheses",
  description:
    "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets and in the correct order, and every close bracket has a corresponding open bracket.",
  difficulty: "EASY",
  tags: ["Stack", "String"],
  constraints: "1 <= s.length <= 10^4\ns consists of parentheses only '()[]{}'",
  hints: "Use a stack. Push every opening bracket. When you encounter a closing bracket, check whether the top of the stack is the matching opener.",
  editorial:
    "Push each opening bracket onto a stack. For each closing bracket, pop the top and verify it matches. If the stack is empty when you try to pop, or non-empty at the end, the string is invalid.",
  testCases: [
    { input: "()", output: "true" },
    { input: "()[]{}", output: "true" },
    { input: "(]", output: "false" },
    { input: "([)]", output: "false" },
    { input: "{[]}", output: "true" },
  ],
  examples: {
    JAVASCRIPT: {
      input: 's = "()"',
      output: "true",
      explanation: "The single pair of parentheses is correctly matched.",
    },
    PYTHON: {
      input: 's = "()[]{}"',
      output: "true",
      explanation: "All three bracket pairs are correctly matched in order.",
    },
    JAVA: {
      input: 's = "(]"',
      output: "false",
      explanation: "The opening '(' is closed by ']', which is not the matching bracket.",
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  // Write your code here
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, terminal: false });
rl.on('line', (line) => {
  console.log(isValid(line.trim()) ? "true" : "false");
  rl.close();
});`,
    PYTHON: `class Solution:
    def isValid(self, s: str) -> bool:
        # Write your code here
        pass

if __name__ == "__main__":
    import sys
    s = sys.stdin.readline().strip()
    sol = Solution()
    print(str(sol.isValid(s)).lower())`,
    JAVA: `import java.util.*;

class Main {
    public boolean isValid(String s) {
        // Write your code here
        return false;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine().trim();
        Main m = new Main();
        System.out.println(m.isValid(s) ? "true" : "false");
    }
}`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const ch of s) {
    if ('({['.includes(ch)) {
      stack.push(ch);
    } else {
      if (stack.pop() !== map[ch]) return false;
    }
  }
  return stack.length === 0;
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, terminal: false });
rl.on('line', (line) => {
  console.log(isValid(line.trim()) ? "true" : "false");
  rl.close();
});`,
    PYTHON: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        mapping = {')': '(', '}': '{', ']': '['}
        for ch in s:
            if ch in mapping:
                top = stack.pop() if stack else '#'
                if mapping[ch] != top:
                    return False
            else:
                stack.append(ch)
        return not stack

if __name__ == "__main__":
    import sys
    s = sys.stdin.readline().strip()
    sol = Solution()
    print(str(sol.isValid(s)).lower())`,
    JAVA: `import java.util.*;

class Main {
    public boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char ch : s.toCharArray()) {
            if (ch == '(' || ch == '{' || ch == '[') {
                stack.push(ch);
            } else {
                if (stack.isEmpty()) return false;
                char top = stack.pop();
                if ((ch == ')' && top != '(') ||
                    (ch == '}' && top != '{') ||
                    (ch == ']' && top != '[')) return false;
            }
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine().trim();
        Main m = new Main();
        System.out.println(m.isValid(s) ? "true" : "false");
    }
}`,
  },
};

// ─── NEW: Binary Tree ────────────────────────────────────────────────────────

export const sampleBinaryTreeProblem = {
  title: "Maximum Depth of Binary Tree",
  description:
    "Given the root of a binary tree, return its maximum depth. The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node. The tree is given as a level-order (BFS) array where 'null' represents a missing node.",
  difficulty: "EASY",
  tags: ["Binary Tree", "DFS", "BFS", "Recursion"],
  constraints: "0 <= number of nodes <= 10^4\n-100 <= Node.val <= 100",
  hints: "The depth of a node equals 1 plus the maximum depth of its two children. Base case: a null node has depth 0.",
  editorial:
    "Use recursive DFS: maxDepth(root) = 1 + max(maxDepth(root.left), maxDepth(root.right)), with 0 returned for a null node. Alternatively, BFS level-by-level increments a counter for each level processed.",
  testCases: [
    { input: "[3,9,20,null,null,15,7]", output: "3" },
    { input: "[1,null,2]", output: "2" },
    { input: "[]", output: "0" },
  ],
  examples: {
    JAVASCRIPT: {
      input: "root = [3,9,20,null,null,15,7]",
      output: "3",
      explanation: "The tree has three levels: root 3, children 9 and 20, grandchildren 15 and 7.",
    },
    PYTHON: {
      input: "root = [1,null,2]",
      output: "2",
      explanation: "The root 1 has only a right child 2, giving a depth of 2.",
    },
    JAVA: {
      input: "root = []",
      output: "0",
      explanation: "An empty tree has depth 0.",
    },
  },
  codeSnippets: {
    JAVASCRIPT: `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val; this.left = left; this.right = right;
  }
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
function maxDepth(root) {
  // Write your code here
}

// --- I/O boilerplate ---
function buildTree(vals) {
  if (!vals.length || vals[0] === 'null') return null;
  const root = new TreeNode(parseInt(vals[0]));
  const queue = [root];
  let i = 1;
  while (queue.length && i < vals.length) {
    const node = queue.shift();
    if (vals[i] !== 'null') { node.left = new TreeNode(parseInt(vals[i])); queue.push(node.left); }
    i++;
    if (i < vals.length && vals[i] !== 'null') { node.right = new TreeNode(parseInt(vals[i])); queue.push(node.right); }
    i++;
  }
  return root;
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, terminal: false });
rl.on('line', (line) => {
  const raw = line.trim().replace(/[\\[\\]]/g, '').split(',').map(s => s.trim()).filter(Boolean);
  console.log(maxDepth(buildTree(raw)));
  rl.close();
});`,
    PYTHON: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

class Solution:
    def maxDepth(self, root) -> int:
        # Write your code here
        pass

if __name__ == "__main__":
    import sys
    from collections import deque
    line = sys.stdin.readline().strip().strip('[]')
    vals = [v.strip() for v in line.split(',')] if line else []
    if not vals or vals[0] == 'null':
        root = None
    else:
        root = TreeNode(int(vals[0]))
        q, i = deque([root]), 1
        while q and i < len(vals):
            node = q.popleft()
            if i < len(vals) and vals[i] != 'null':
                node.left = TreeNode(int(vals[i])); q.append(node.left)
            i += 1
            if i < len(vals) and vals[i] != 'null':
                node.right = TreeNode(int(vals[i])); q.append(node.right)
            i += 1
    sol = Solution()
    print(sol.maxDepth(root))`,
    JAVA: `import java.util.*;

class Main {
    static class TreeNode {
        int val; TreeNode left, right;
        TreeNode(int val) { this.val = val; }
    }

    public int maxDepth(TreeNode root) {
        // Write your code here
        return 0;
    }

    static TreeNode buildTree(String[] vals) {
        if (vals.length == 0 || vals[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(vals[0]));
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        int i = 1;
        while (!q.isEmpty() && i < vals.length) {
            TreeNode node = q.poll();
            if (!vals[i].equals("null")) { node.left = new TreeNode(Integer.parseInt(vals[i])); q.add(node.left); }
            i++;
            if (i < vals.length && !vals[i].equals("null")) { node.right = new TreeNode(Integer.parseInt(vals[i])); q.add(node.right); }
            i++;
        }
        return root;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine().trim().replace("[", "").replace("]", "");
        String[] vals = line.isEmpty() ? new String[0] : line.split(",");
        for (int i = 0; i < vals.length; i++) vals[i] = vals[i].trim();
        Main m = new Main();
        System.out.println(m.maxDepth(buildTree(vals)));
    }
}`,
  },
  referenceSolutions: {
    JAVASCRIPT: `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val; this.left = left; this.right = right;
  }
}

function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

function buildTree(vals) {
  if (!vals.length || vals[0] === 'null') return null;
  const root = new TreeNode(parseInt(vals[0]));
  const queue = [root];
  let i = 1;
  while (queue.length && i < vals.length) {
    const node = queue.shift();
    if (vals[i] !== 'null') { node.left = new TreeNode(parseInt(vals[i])); queue.push(node.left); }
    i++;
    if (i < vals.length && vals[i] !== 'null') { node.right = new TreeNode(parseInt(vals[i])); queue.push(node.right); }
    i++;
  }
  return root;
}

const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, terminal: false });
rl.on('line', (line) => {
  const raw = line.trim().replace(/[\\[\\]]/g, '').split(',').map(s => s.trim()).filter(Boolean);
  console.log(maxDepth(buildTree(raw)));
  rl.close();
});`,
    PYTHON: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val; self.left = left; self.right = right

class Solution:
    def maxDepth(self, root) -> int:
        if not root:
            return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))

if __name__ == "__main__":
    import sys
    from collections import deque
    line = sys.stdin.readline().strip().strip('[]')
    vals = [v.strip() for v in line.split(',')] if line else []
    if not vals or vals[0] == 'null':
        root = None
    else:
        root = TreeNode(int(vals[0]))
        q, i = deque([root]), 1
        while q and i < len(vals):
            node = q.popleft()
            if i < len(vals) and vals[i] != 'null':
                node.left = TreeNode(int(vals[i])); q.append(node.left)
            i += 1
            if i < len(vals) and vals[i] != 'null':
                node.right = TreeNode(int(vals[i])); q.append(node.right)
            i += 1
    sol = Solution()
    print(sol.maxDepth(root))`,
    JAVA: `import java.util.*;

class Main {
    static class TreeNode {
        int val; TreeNode left, right;
        TreeNode(int val) { this.val = val; }
    }

    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }

    static TreeNode buildTree(String[] vals) {
        if (vals.length == 0 || vals[0].equals("null")) return null;
        TreeNode root = new TreeNode(Integer.parseInt(vals[0]));
        Queue<TreeNode> q = new LinkedList<>();
        q.add(root);
        int i = 1;
        while (!q.isEmpty() && i < vals.length) {
            TreeNode node = q.poll();
            if (!vals[i].equals("null")) { node.left = new TreeNode(Integer.parseInt(vals[i])); q.add(node.left); }
            i++;
            if (i < vals.length && !vals[i].equals("null")) { node.right = new TreeNode(Integer.parseInt(vals[i])); q.add(node.right); }
            i++;
        }
        return root;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine().trim().replace("[", "").replace("]", "");
        String[] vals = line.isEmpty() ? new String[0] : line.split(",");
        for (int i = 0; i < vals.length; i++) vals[i] = vals[i].trim();
        Main m = new Main();
        System.out.println(m.maxDepth(buildTree(vals)));
    }
}`,
  },
};

// ─── SAMPLE_PROBLEMS map (updated) ───────────────────────────────────────────

export const SAMPLE_PROBLEMS = {
  DP: sampleDPProblem,
  string: sampleStringProblem,
  array: sampleArrayProblem,
  linkedList: sampleLinkedListProblem,
  stack: sampleStackProblem,
  binaryTree: sampleBinaryTreeProblem,
};
