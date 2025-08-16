## Currying

**function currying** in JavaScript is a technique that transforms a function with multiple arguments into a series of functions that each take a single argument. The video demonstrates two methods for implementing this.

***

### Method 1: Using the `bind` method

The `bind` method can be used to create a new function with a pre-set value for one of its arguments. This is demonstrated with a `multiply` function. By using `bind`, a new function like `multiplyByTwo` is created, where the first argument of the `multiply` function is permanently set to `2`.

***

### Method 2: Using Closures

A **closure** is a function that remembers the variables from its surrounding environment. This method involves creating a function that takes one argument and returns another function. The inner function "closes over" and remembers the argument passed to the outer function, allowing for a curried implementation.

***

### Summary

Function currying allows for the creation of more specific, reusable functions from a generic function. Both the built-in **`bind`** method and **closures** can be used to achieve this.

### Example

#### Method 1: Using the bind Method
``` javascript

function multiply(a, b) {
  return a * b;
}

// Create a new function with the first argument permanently set to 2
const multiplyByTwo = multiply.bind(null, 2);

console.log(multiplyByTwo(5)); // Output: 10
console.log(multiplyByTwo(10)); // Output: 20

```

#### Method 2: Using Closures
``` js
function multiply(a) {
  return function(b) {
    return a * b;
  };
}

// Use the curried function
const multiplyByThree = multiply(3);

console.log(multiplyByThree(5)); // Output: 15
console.log(multiplyByThree(10)); // Output: 30
```

For more information, you can view the video at [https://youtu.be/vQcCNpuaJO8?si=sO2_iW3u2e_rI_2X](https://youtu.be/vQcCNpuaJO8?si=sO2_iW3u2e_rI_2X).
http://googleusercontent.com/youtube_content/4