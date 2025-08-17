## Prototype and Prototypal In heritance

### Understanding Prototypes

- Every object in JavaScript has a hidden **prototype** property that is automatically attached by the JavaScript engine. This prototype is an object itself.
- The prototype object contains built-in methods and properties that the object can use. For example, arrays can use the `push()` method, and objects can use the `toString()` method because these methods are located on their respective prototypes.
- You can access an object's prototype using the `__proto__` property (e.g., `arr.__proto__`). This is the same as `Array.prototype` for an array.

---

### The Prototype Chain

- The **prototype chain** is a series of linked objects. Since a prototype is an object, it also has its own prototype, and so on. This creates a chain that allows an object to access methods and properties from multiple parent objects.
- The chain for an array looks like this: `arr.__proto__` -\> `Array.prototype` -\> `Object.prototype` -\> `null`.
- The chain for a function is: `fun.__proto__` -\> `Function.prototype` -\> `Object.prototype` -\> `null`.
- The `Object.prototype` is the ultimate parent of almost all objects in JavaScript.

---

### Prototypal Inheritance

- **Prototypal inheritance** is the mechanism through which an object inherits properties and methods from another object via the prototype chain.
- When you try to access a property on an object, the JavaScript engine first looks for that property on the object itself.
- If the property isn't found, the engine "walks up" the prototype chain to the next object in the chain (the prototype) and checks there. This process continues until the property is found or the chain ends at `null`.
- Modifying the `__proto__` property directly, is not the recommended way to set up inheritance and can cause performance issues.

You can watch the full video at [https://youtu.be/wstwjQ1yqWQ](https://www.google.com/search?q=https://youtu.be/wstwjQ1yqWQ).
http://googleusercontent.com/youtube_content/1
