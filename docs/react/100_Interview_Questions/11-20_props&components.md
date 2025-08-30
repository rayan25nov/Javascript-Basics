# Components & Props - Interview Answers (Precise & Memorable)

## **1. What are props in React?**

**Answer:**
"Props are **properties** that let you pass **data from parent to child components**. Think of props like **function arguments** - you pass them in and use them inside.

**Example:**
```javascript
// Parent passes data
<Welcome name="John" age={25} />

// Child receives data
function Welcome(props) {
  return <h1>Hello {props.name}, you are {props.age}!</h1>;
}
```

Props are **read-only** and **immutable** - the child component cannot change them. It's like receiving a **gift** - you can use it but can't change what's inside the box."

**Key Words:** Properties, Parent to Child, Function Arguments, Read-only, Gift

***

## **2. How do you pass data between components?**

**Answer:**
"Data flows **one-way** in React - **downward from parent to child** through props. I remember it as **'Water flows downhill'**.

**Three main ways:**
1. **Parent → Child**: Use props
2. **Child → Parent**: Pass callback functions as props
3. **Sibling → Sibling**: Lift state up to common parent

**Example:**
```javascript
// Parent → Child
<Child message="Hello" />

// Child → Parent  
<Child onButtonClick={handleClick} />

// Sibling communication through parent
function Parent() {
  const [data, setData] = useState('');
  return (
    <>
      <Child1 onDataChange={setData} />
      <Child2 data={data} />
    </>
  );
}
```

**Key Words:** One-way, Downward, Water flows downhill, Callback functions, Lift up

***

## **3. What is props drilling and how to avoid it?**

**Answer:**
"Props drilling is when you pass props **through multiple levels** of components that don't need them, just to reach a deeply nested child. It's like **passing a message through many people** where most don't care about the message.

**Problem:**
```javascript
App → Header → Navbar → UserProfile → UserName
// UserName needs user data, but Header & Navbar don't
```

**Solutions:**
1. **React Context** - Like a **global messenger**
2. **Component composition** - **Restructure components**
3. **State management libraries** - Redux, Zustand

**Context Example:**
```javascript
const UserContext = createContext();
// Now any child can directly access user data
```

**Key Words:** Multiple levels, Passing message, Global messenger, Context, Restructure

***

## **4. What are default props?**

**Answer:**
"Default props are **backup values** for props when they're not provided by the parent. Think of them as **safety nets** or **fallback options**.

**Two ways to set them:**

**Method 1 - Function parameter:**
```javascript
function Greeting({ name = "Guest", age = 0 }) {
  return <h1>Hello {name}, age {age}</h1>;
}
```

**Method 2 - defaultProps:**
```javascript
Greeting.defaultProps = {
  name: "Guest",
  age: 0
};
```

If parent doesn't pass props, **defaults kick in automatically**. It prevents **undefined errors** and makes components more **robust**."

**Key Words:** Backup values, Safety nets, Fallback options, Prevents errors, Robust

***

## **5. How do you validate props?**

**Answer:**
"Props validation **checks if props have correct types** before using them. It's like having a **security guard** checking IDs at the door.

**Using PropTypes:**
```javascript
import PropTypes from 'prop-types';

function UserCard({ name, age, isActive }) {
  return <div>{name} is {age} years old</div>;
}

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
  isActive: PropTypes.bool
};
```

**Benefits:**
- **Catches bugs early** in development
- **Documents** what props component expects
- **Better debugging** with clear error messages

**Note:** Only works in **development mode**, not production."

**Key Words:** Security guard, Checks types, Catches bugs, Documents, Development only

***

## **6. Can you modify props inside a component?**

**Answer:**
"**No, absolutely not!** Props are **read-only** and **immutable**. Trying to modify props is like trying to **change a library book** - it's not allowed and breaks the rules.

**Wrong way:**
```javascript
function BadComponent(props) {
  props.name = "Changed"; // ❌ Error! Cannot modify
  return <h1>{props.name}</h1>;
}
```

**Right way:**
```javascript
function GoodComponent({ name }) {
  const [displayName, setDisplayName] = useState(name);
  // Now you can modify displayName, not props
  return <h1>{displayName}</h1>;
}
```

**Why?** Props ensure **predictable data flow** and prevent **unexpected bugs**. If you need to change data, use **state** instead."

**Key Words:** Read-only, Immutable, Library book, Predictable, Use state instead

***

## **7. What's the difference between props and attributes?**

**Answer:**
"**Props** are React-specific for **passing data between components**. **Attributes** are standard **HTML attributes** for DOM elements.

| Props | Attributes |
|-------|------------|
| **React components** | **HTML elements** |
| **Any data type** | **Strings only** |
| **camelCase** naming | **lowercase** naming |
| **Custom names** allowed | **Predefined** names |

**Examples:**
```javascript
// Props (React components)
<MyComponent userName="John" isActive={true} />

// Attributes (HTML elements) 
<input type="text" class="form-control" />
<img src="photo.jpg" alt="User photo" />
```

**Think of it as:** Props = **Component communication**, Attributes = **HTML styling/behavior**."

**Key Words:** React vs HTML, Any data vs Strings, camelCase vs lowercase, Custom vs Predefined

***

## **8. How do you pass functions as props?**

**Answer:**
"You pass functions as props just like any other data, but **wrap them in curly braces**. It's like **giving someone your phone number** so they can call you back.

**Example:**
```javascript
// Parent component
function Parent() {
  const handleClick = (message) => {
    alert(`Child says: ${message}`);
  };

  return <Child onButtonClick={handleClick} />;
}

// Child component
function Child({ onButtonClick }) {
  return (
    <button onClick={() => onButtonClick("Hello Parent!")}>
      Click me
    </button>
  );
}
```

**Common use cases:**
- **Event handling**
- **Data updates** (child → parent communication)  
- **Callback functions**

**Remember:** Functions let children **talk back** to parents."

**Key Words:** Curly braces, Phone number, Talk back, Event handling, Callback

***

## **9. What are children props?**

**Answer:**
"Children props represent **content between component tags**. It's like a **container** where you can put anything inside.

**Example:**
```javascript
// Usage - content between tags
<Card>
  <h1>Title</h1>
  <p>This is the content inside Card</p>
</Card>

// Card component receives children
function Card({ children }) {
  return (
    <div className="card-container">
      {children}
    </div>
  );
}
```

**Think of it as:**
- **HTML tags** can have content inside: `<div>content</div>`
- **React components** can too: `<Card>content</Card>`

Children props make components **flexible wrappers** that can contain **any content**."

**Key Words:** Content between tags, Container, Flexible wrappers, Any content

***

## **10. How do you handle events in React?**

**Answer:**
"React uses **Synthetic Events** - wrapped versions of native browser events that work **consistently across all browsers**. It's like having a **universal translator**.

**Basic event handling:**
```javascript
function Button() {
  const handleClick = (e) => {
    e.preventDefault(); // Works in all browsers
    console.log('Button clicked!', e.target);
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

**Key points:**
- **camelCase** naming: `onClick`, `onChange`, `onSubmit`
- **Pass function reference**, not function call
- **Event object** available as first parameter
- **Automatic event binding** (no manual binding needed)

**Common events:** onClick, onChange, onSubmit, onFocus, onBlur."

**Key Words:** Synthetic Events, Universal translator, camelCase, Function reference, Automatic binding

***

## **Quick Review Tips:**

### **Memory Techniques:**
- **Props = Properties** (like function arguments)
- **One-way flow = Water flows downhill**
- **Props drilling = Message through many people**
- **Default props = Safety nets**
- **PropTypes = Security guard**
- **Props immutable = Library book (can't change)**
- **Children = Container**
- **Events = Universal translator**

### **Common Interview Flow:**
1. **Define** the concept clearly
2. **Give practical example**
3. **Explain when/why** to use it
4. **Show understanding** of best practices

### **Power Phrases:**
- "In my React projects, I typically..."
- "The key difference here is..."
- "This helps prevent common bugs like..."
- "For better code organization, I use..."
- "This pattern makes components more reusable..."

### **Props Flow Summary:**
```
Parent Component
     ↓ (props)
Child Component
     ↓ (callback via props)
Parent Component
```

[1](https://www.crsinfosolutions.com/react-js-props-and-state-interview-questions/)
[2](https://www.interviewbit.com/react-interview-questions/)
[3](https://www.geeksforgeeks.org/reactjs/react-interview-questions/)
[4](https://www.greatfrontend.com/blog/100-react-interview-questions-straight-from-ex-interviewers)
[5](https://www.akalinfo.com/blog/reactjs-interview-questions/)
[6](https://github.com/sudheerj/reactjs-interview-questions)
[7](https://frontendlead.com/handbook/react-interview-questions)