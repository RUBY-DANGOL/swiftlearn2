export interface CodingChallenge {
  id: string;
  title: string;
  description: string;
  starterCode: {
    javascript: string;
    python: string;
    c: string;
  };
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const codingChallenges: CodingChallenge[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    starterCode: {
      javascript: `function twoSum(nums, target) {\n  // Your code here\n}`,
      python: `def two_sum(nums, target):\n  # Your code here\n  pass`,
      c: `int* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n  // Your code here\n}`
    },
    difficulty: 'Easy',
  },
  {
    id: 'reverse-string',
    title: 'Reverse a String',
    description: 'Write a function that reverses a string. The input string is given as an array of characters `s`. You must do this by modifying the input array in-place with O(1) extra memory.',
    starterCode: {
      javascript: `function reverseString(s) {\n  // Your code here\n}`,
      python: `def reverse_string(s):\n  # Your code here\n  pass`,
      c: `void reverseString(char* s, int sSize) {\n  // Your code here\n}`
    },
    difficulty: 'Easy',
  },
  {
    id: 'fibonacci',
    title: 'Fibonacci Number',
    description: 'The Fibonacci numbers, commonly denoted `F(n)`, form a sequence such that each number is the sum of the two preceding ones, starting from 0 and 1. That is, F(0) = 0, F(1) = 1, F(n) = F(n - 1) + F(n - 2), for n > 1. Given `n`, calculate `F(n)`.',
    starterCode: {
      javascript: `function fib(n) {\n  // Your code here\n}`,
      python: `def fib(n):\n  # Your code here\n  pass`,
      c: `int fib(int n) {\n  // Your code here\n}`
    },
    difficulty: 'Medium',
  },
  {
    id: 'palindrome-check',
    title: 'Palindrome Check',
    description: 'Given a string, write a function to check if it is a palindrome. A palindrome is a word, phrase, number, or other sequence of characters that reads the same backward as forward. Ignore case and non-alphanumeric characters.',
    starterCode: {
        javascript: `function isPalindrome(s) {\n  // Your code here\n}`,
        python: `def is_palindrome(s):\n  # Your code here\n  pass`,
        c: `bool isPalindrome(char* s) {\n  // Your code here\n}`
    },
    difficulty: 'Easy',
  },
];
