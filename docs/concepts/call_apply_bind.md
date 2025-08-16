# JavaScript call(), apply(), and bind() Methods

## Overview

In JavaScript, `call()`, `apply()`, and `bind()` are methods available on functions used to explicitly set the `this` context and invoke or create new functions based on it.

---

## 1. call()

The `call()` method calls a function with a given `this` value and arguments passed individually.

### Syntax
```js
func.call(thisArg, arg1, arg2, ...);
```

### Description
- Invokes the function immediately.
- The first argument is the value to use as `this`.
- Subsequent arguments are passed individually to the function.

### Example
```js
function greet(greeting) {
  console.log(greeting + ', ' + this.name);
}
const person = { name: 'Alice' };
greet.call(person, 'Hello'); // Output: Hello, Alice
```

### Use Cases
- Borrowing methods from other objects.
- Setting the context explicitly for a single function call.

---

## 2. apply()

The `apply()` method is similar to `call()` but accepts arguments as an array.

### Syntax
```js
func.apply(thisArg, [argsArray]);
```

### Description
- Invokes the function immediately.
- First argument sets `this`.
- Second argument is an array of arguments passed to the function.

### Example
```js
function sum(a, b) {
  return a + b;
}
const numbers = [5, 10];
console.log(sum.apply(null, numbers)); // Output: 15
```

### Use Cases
- Invoking functions where arguments are already in an array.
- Useful for variadic functions where you want to spread an array as arguments.

---

## 3. bind()

The `bind()` method returns a new function permanently bound to a specific `this` value, and optionally prepends arguments.

### Syntax
```js
const boundFunc = func.bind(thisArg, arg1, arg2, ...);
```

### Description
- Does **not** call the function immediately.
- Returns a new function.
- When called, the new function uses the specified `this` and prepended arguments.

### Example
```js
const person = { name: 'Bob' };
function sayHi(punctuation) {
  console.log('Hi, ' + this.name + punctuation);
}
const sayHiBob = sayHi.bind(person, '!');
sayHiBob(); // Output: Hi, Bob!
```

### Use Cases
- Ensuring callbacks keep the correct `this` context.
- Creating partially applied functions.
- Event handling when `this` might otherwise change.

---

## Differences Summary

| Method  | Arguments                 | Invokes Function Immediately? | Returns New Function? | Use Case                        |
|---------|---------------------------|-------------------------------|----------------------|--------------------------------|
| call()  | List of arguments          | Yes                           | No                   | Single call with explicit `this`|
| apply() | Array of arguments         | Yes                           | No                   | Single call with argument array |
| bind()  | List of arguments (optional) | No                        | Yes                  | Creates new bound function       |

---

## Additional Notes
- `call()` and `apply()` are almost identical, differing only in how arguments are passed.
- `bind()` is useful when you want to create a function with a fixed `this` context to be called later.
- When using `call()` or `apply()` in constructors for inheritance, be cautious as they do not set up prototype chains.

---

## References
- MDN Web Docs
- GeeksforGeeks
- Educative.io

Here are notes on the video "call, apply and bind method in JavaScript" by Akshay Saini, which explains three key JavaScript methods.

### Call Method
The **`call`** method allows you to invoke a function and explicitly set the value of the **`this`** keyword. The arguments are passed to the function individually, separated by commas. It is often used for "function borrowing" between objects.

### Apply Method
The **`apply`** method is similar to **`call`**, but it takes the arguments as an array rather than as individual parameters. This can be useful when you have an array of arguments that you need to pass to a function.

### Bind Method
Unlike **`call`** and **`apply`**, the **`bind`** method does not immediately execute the function. Instead, it creates and returns a **new function** with the specified **`this`** value and arguments permanently bound to it. This new function can be called later.

***

### Summary
* **`call`**: Immediately invokes the function. Arguments are passed individually.
* **`apply`**: Immediately invokes the function. Arguments are passed as an array.
* **`bind`**: Returns a new function that can be executed later.

For more details, you can view the video at [https://youtu.be/75W8UPQ5l7k?si=rNNdJZFI5B7THKiC](https://youtu.be/75W8UPQ5l7k?si=rNNdJZFI5B7THKiC).
http://googleusercontent.com/youtube_content/1
