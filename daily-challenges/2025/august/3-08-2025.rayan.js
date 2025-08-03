// Task 1: Text Formatter
function formatText(text) {
  // Your implementation here
  text = text
    .trim()
    .split(" ")
    .map((word) =>
      word !== "" ? word[0].toUpperCase() + word.substring(1) : undefined
    )
    .filter((word) => word !== undefined)
    .join(" ");
  return text;
  // Hint: Use trim(), split(), map(), join()
}

// Task 2: Word Counter
function countWords(text) {
  // Your implementation here
  let ans = {};
  ans.words = text.split(" ").length;
  ans.characters = text.split(" ").reduce((acc, word) => {
    acc += word.length;
    return acc;
  }, 0);
  ans.sentences = text.split(/[.!?]/).filter((word) => word != "").length;

  return ans;
  // Return an object with words, characters, sentences
}

// Task 3: Text Reverser
function reverseWords(text) {
  // Your implementation here
  text = text.split(" ").reverse().join(" ");
  return text;
  // Hint: split() and reverse() will be helpful
}

// Task 4: Simple Validator
function validateEmail(email) {
  // Your implementation here
  // Must contain exactly one '@' symbol
  // Must have at least one character before '@'
  // Must have at least one '.' after '@'
  // Must have at least 2 characters after the last '.'
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(email);
  // Return true or false
}

// Task 5: Text Analyzer
function analyzeText(text) {
  // Your implementation here
  // Return the most frequent word
}

// Test your functions
console.log("=== Task 1: Format Text ===");
console.log(formatText("  hello   world  javascript  "));

console.log("\n=== Task 2: Count Words ===");
console.log(countWords("Hello world! How are you? I'm fine."));

console.log("\n=== Task 3: Reverse Words ===");
console.log(reverseWords("JavaScript is awesome"));

console.log("\n=== Task 4: Validate Email ===");
console.log(validateEmail("user@example.com"));
console.log(validateEmail("invalid.email"));

console.log("\n=== Task 5: Analyze Text ===");
console.log(analyzeText("JavaScript is great. I love JavaScript programming."));

// Test bonus functions if completed
// console.log("\n=== Bonus: Palindrome ===");
// console.log(isPalindrome("racecar"));
