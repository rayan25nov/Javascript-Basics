## **The JavaScript `Error` Object**

When a runtime error occurs, JavaScript generates and throws an `Error` object. This object is fundamental to error handling as it contains key information about what went wrong. The two most important properties are:

- `name`: A string that specifies the type of error (e.g., "TypeError").
- `message`: A string providing a human-readable description of the error.

You can also create and throw your own custom errors, which is useful for application-specific logic.

```javascript
try {
  throw new Error("This is a custom error message.");
} catch (e) {
  console.error(e.name); // Output: Error
  console.error(e.message); // Output: This is a custom error message.
}
```

---

### **Common Error Types in JavaScript**

Understanding the different types of built-in errors helps in quickly diagnosing and fixing bugs.

#### **1. SyntaxError**

This is one of the most common errors. A `SyntaxError` occurs when the JavaScript engine encounters code that violates the language's syntax rules. The code cannot be parsed or compiled, and it will not run at all.

**Common Causes:**

- Missing parentheses, brackets, or braces.
- Misspelled keywords (e.g., `funtion` instead of `function`).
- Improper use of operators.

**Example:**

```javascript
// This code will throw a SyntaxError before execution
// because of the missing closing parenthesis.
try {
  eval("console.log('Hello'");
} catch (e) {
  console.error(e.name); // SyntaxError
  console.error(e.message); // Unexpected identifier (or similar message)
}
```

#### **2. ReferenceError**

A `ReferenceError` is thrown when you try to use a variable that has not been declared or is not currently in scope.

**Common Causes:**

- A typo in a variable name.
- Attempting to access a variable outside of its scope (e.g., a block-scoped variable outside its block).
- Accessing a variable before it is declared.

**Example:**

```javascript
try {
  console.log(myVariable); // myVariable is not declared
} catch (e) {
  console.error(e.name); // ReferenceError
  console.error(e.message); // myVariable is not defined
}
```

#### **3. TypeError**

A `TypeError` occurs when an operation is performed on a value of the wrong data type. This error implies that the value exists, but its type is not what the operation expected.

**Common Causes:**

- Trying to call something that is not a function (e.g., `null`, `undefined`, or a number).
- Attempting to access properties on `null` or `undefined`.
- Reassigning a value to a `const` variable.

**Example:**

```javascript
let myVar = null;
try {
  myVar.toUpperCase(); // Cannot read properties of null
} catch (e) {
  console.error(e.name); // TypeError
  console.error(e.message); // Cannot read properties of null (reading 'toUpperCase')
}
```

#### **4. RangeError**

A `RangeError` is thrown when a numeric variable or parameter is outside of its valid range.

**Common Causes:**

- Creating an array with an invalid length (e.g., a negative number).
- Passing an out-of-bounds value to number methods like `toFixed()` or `toPrecision()`.

**Example:**

```javascript
try {
  const arr = new Array(-1); // Array length cannot be negative
} catch (e) {
  console.error(e.name); // RangeError
  console.error(e.message); // Invalid array length
}
```

#### **5. URIError**

This error is related to the global URI (Uniform Resource Identifier) handling functions. A `URIError` is thrown if you use illegal characters in a URI function like `decodeURIComponent()`.

**Example:**

```javascript
try {
  // This is invalid because '%' is not followed by two hex digits.
  let malformedURI = "https://example.com/search?q=%";
  decodeURI(malformedURI);
} catch (e) {
  if (e instanceof URIError) {
    console.error("Caught a URIError!");
    console.error("Error Name:", e.name); // "URIError"
    console.error("Error Message:", e.message); // "URI malformed" or "malformed URI sequence"
  } else {
    console.error("An unexpected error occurred:", e);
  }
}
```

#### **6. EvalError**

This error type is intended for issues related to the global `eval()` function. However, modern JavaScript engines no longer throw `EvalError`. Instead, errors during `eval()` parsing or execution now throw other error types like `SyntaxError` or `ReferenceError`. It is retained mainly for backward compatibility.

### **Error Handling in Practice**

The `try...catch...finally` statement is the primary way to handle exceptions in JavaScript.

- **`try`**: Contains the code that might throw an error.
- **`catch`**: Executes if an error is thrown in the `try` block. It receives the `Error` object.
- **`finally`**: Executes after `try` and `catch`, regardless of whether an error occurred. It's often used for cleanup.

You can use `instanceof` to check for specific error types and handle them differently.

```javascript
function processData(data) {
  try {
    if (typeof data !== "string") {
      throw new TypeError("Input data must be a string.");
    }
    const decoded = decodeURIComponent(data);
    console.log("Successfully decoded:", decoded);
  } catch (error) {
    if (error instanceof TypeError) {
      console.error("Handling TypeError:", error.message);
    } else if (error instanceof URIError) {
      console.error(
        "Handling URIError: Input is a malformed URI.",
        error.message
      );
    } else {
      console.error("An unexpected error occurred:", error.message);
      // Re-throw if it's an error you don't know how to handle
      throw error;
    }
  } finally {
    console.log("Processing finished.");
  }
}

processData(123); // Throws and catches a TypeError
processData("%E0%"); // Throws and catches a URIError
```

### References

[1] https://www.scaler.com/topics/types-of-errors-in-javascript/
[2] https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[3] https://www.w3schools.com/js/js_errors.asp
[4] https://www.codecademy.com/resources/docs/javascript/errors
[5] https://www.geekster.in/articles/what-are-different-types-of-errors-in-javascript/
[6] https://raygun.com/blog/top-6-javascript-errors/
[7] https://accreditly.io/articles/referenceerror-syntaxerror-typeerror-differences-in-javascript
[8] https://omkarkolate.hashnode.dev/errors-in-javascript
[9] https://stackoverflow.com/questions/12589391/difference-typeerror-and-referenceerror
[10] https://www.htmlgoodies.com/javascript/rangeerror-typeerror-and-urierror-javascript-error-types/
[11] https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors
[12] https://www.tutorialspoint.com/javascript/javascript_error_handling.htm
[13] https://stackoverflow.com/questions/41669426/javascript-error-object-properties
