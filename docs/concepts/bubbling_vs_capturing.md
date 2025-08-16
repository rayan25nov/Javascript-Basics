## Event Bubbling vs Capturing
**event bubbling** and **event capturing** are two concepts related to event propagation in JavaScript.

### Event Propagation

**Event propagation** is the process by which an event, such as a click, is handled by nested HTML elements. For example, if you click a `div` nested inside another `div`, the event can be handled by both elements in a specific order.

---

### Event Bubbling (Default Behavior)

**Event bubbling** is the default behavior in modern browsers. When an event is triggered on an element (e.g., clicking a `child` element), the event is handled by that element first. The event then "bubbles up" the DOM tree, triggering event handlers on its parent, then its grandparent, and so on, until it reaches the root of the document. The execution order is from the inner-most element to the outer-most element. 

---

### Event Capturing

**Event capturing** is the opposite of bubbling. The event propagation starts from the outermost element (the `grandparent`) and "trickles down" to the target element. The execution order is from the outer-most element to the inner-most element.
 
---

### Controlling Propagation

You can control the event propagation phase using the third argument of the **`addEventListener()`** method. By default, this argument is `false`, which enables bubbling. To use the capturing phase, you must explicitly set this argument to `true`.

---

### Example
```html
<div id="grandparent" style="padding: 20px; background: lightblue;">
    Grandparent
  <div id="parent" style="padding: 20px; background: lightgreen;">
      Parent
    <div id="child" style="padding: 20px; background: lightcoral;">
        Child (Click me)
    </div>
  </div>
</div>
```
#### Example: Event Bubbling
```js
<script>
  document.getElementById('grandparent').addEventListener('click', () => {
    console.log('Grandparent clicked');
  });

  document.getElementById('parent').addEventListener('click', () => {
    console.log('Parent clicked');
  });

  document.getElementById('child').addEventListener('click', () => {
    console.log('Child clicked');
  });
</script>
```

#### Example: Event Capturing
```js
document.getElementById('grandparent').addEventListener('click', () => {
  console.log('Grandparent clicked (capturing)');
}, true);

document.getElementById('parent').addEventListener('click', () => {
  console.log('Parent clicked (capturing)');
}, true);

document.getElementById('child').addEventListener('click', () => {
  console.log('Child clicked (capturing)');
}, true);
```


### Stopping Propagation

To stop an event from propagating further, you can use the **`e.stopPropagation()`** method within an event handler. This prevents the event from continuing its journey up or down the DOM tree.

#### Example: Stop Propagation
```js
document.getElementById('parent').addEventListener('click', (e) => {
  console.log('Parent clicked, stopping propagation');
  e.stopPropagation();
});

document.getElementById('grandparent').addEventListener('click', () => {
  console.log('Grandparent clicked'); // This will not fire if propagation stopped at parent
});
```

***

## Summary:

| Propagation Phase | Order of Execution       | How to Enable           | Default Behavior? |
|-------------------|-------------------------|------------------------|-------------------|
| Capturing         | Outer to Inner elements  | `addEventListener(..., true)` | No (off by default)  |
| Bubbling          | Inner to Outer elements  | `addEventListener(..., false)` or omitted | Yes (default)       |

***


You can view the full video at [https://youtu.be/aVSf0b1jVKk?si=dkkPkQnl6AIsyAui](https://youtu.be/aVSf0b1jVKk?si=dkkPkQnl6AIsyAui).
http://googleusercontent.com/youtube_content/6