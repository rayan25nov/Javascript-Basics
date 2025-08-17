## **Event Delegation** in JavaScript.

### What is Event Delegation?

**Event delegation** is a programming pattern that uses **event bubbling** to handle events efficiently. Instead of attaching a separate event listener to every single element, you attach a single listener to a parent element. This single listener can then manage events for all of its child elements, even those added dynamically.

---

### Why Use Event Delegation?

- **Performance**: Attaching a single event handler to a parent element is more memory-efficient and performs better than attaching multiple handlers to individual elements, especially on pages with many interactive items.
- **Simplified Code**: It makes the code cleaner and easier to manage.
- **Dynamic Elements**: It automatically handles events for new elements added to the DOM after the initial page load without requiring new event listeners.

---

### How to Implement It

1.  Identify a common parent element for all the elements you want to handle events for.
2.  Attach a single event listener to this parent element.
3.  Inside the event handler function, use the **`e.target`** property of the event object. This property refers to the specific child element that was clicked.
4.  You can then use properties like **`e.target.id`** or **`e.target.tagName`** to identify the clicked element and perform the appropriate action.

---

### When to Use It

Event delegation is a good choice for lists, tables, or any container where child elements share a similar function. However, it only works for events that **bubble up** the DOM, such as `click`, `keyup`, and `submit`. Events that don't bubble, like `focus` and `blur`, are not suitable for this pattern.

#### Event Delegation Explained with Code

```html
<ul id="fruit-list">
  <li id="apple">Apple</li>
  <li id="banana">Banana</li>
  <li id="orange">Orange</li>
</ul>

<button id="add-fruit">Add Fruit</button>
```

#### JavaScript Code — Event Delegation

```js
// 1. Identify the common parent element
const list = document.getElementById("fruit-list");

// 2. Attach a single event listener to the parent
list.addEventListener("click", function (e) {
  // 3. Use e.target to determine the actual clicked element
  if (e.target && e.target.nodeName === "LI") {
    // e.target is the clicked <li>
    alert("You clicked on: " + e.target.id);
  }
});

// 4. Dynamically add a new item (shows why delegation is useful)
document.getElementById("add-fruit").addEventListener("click", function () {
  const newFruit = document.createElement("li");
  newFruit.textContent = "Mango";
  newFruit.id = "mango";
  list.appendChild(newFruit);
});
```

For more information, you can view the video at [https://youtu.be/3KJI1WZGDrg?si=vpN8MZP54pELICh8](https://youtu.be/3KJI1WZGDrg?si=vpN8MZP54pELICh8).
http://googleusercontent.com/youtube_content/7
