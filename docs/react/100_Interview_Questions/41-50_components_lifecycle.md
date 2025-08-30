# Component Lifecycle & Effects - Interview Answers (Concise & Memorable)

## **1. What is component lifecycle in React?**

**Answer:**
"Component lifecycle is the **series of phases** a component goes through from **creation to destruction**. It's like a **person's life stages** - birth, growth, changes, and death. React provides **methods/hooks** to run code at specific lifecycle moments."

**Key Words:** Series of phases, Creation to destruction, Life stages, Methods/hooks

***

## **2. What are the phases of component lifecycle?**

**Answer:**
"**Three main phases** (M-U-U):
1. **M** - **Mounting** (component created and added to DOM)
2. **U** - **Updating** (component re-renders due to state/props changes)  
3. **U** - **Unmounting** (component removed from DOM)

Think: **Birth → Growth → Death**"

**Key Words:** M-U-U, Mounting-Updating-Unmounting, Birth-Growth-Death

***

## **3. What is componentDidMount and its equivalent hook?**

**Answer:**
"**componentDidMount** runs **once after initial render** in class components. **Hook equivalent**: `useEffect(() => {}, [])` with **empty dependency array**.
```javascript
useEffect(() => {
  // API calls, subscriptions
}, []); // Empty array = runs once
```
Perfect for **data fetching**."

**Key Words:** Once after render, Empty dependency array, Data fetching

***

## **4. What is componentWillUnmount and its hook equivalent?**

**Answer:**
"**componentWillUnmount** runs **before component is destroyed**. **Hook equivalent**: **cleanup function** in useEffect.
```javascript
useEffect(() => {
  return () => {
    // Cleanup code here
  };
}, []);
```
Use for **cleaning timers, subscriptions, event listeners**."

**Key Words:** Before destroyed, Cleanup function, Timers/subscriptions/listeners

***

## **5. What is componentDidUpdate and its hook equivalent?**

**Answer:**
"**componentDidUpdate** runs **after every update** in class components. **Hook equivalent**: `useEffect` **without empty array**.
```javascript
useEffect(() => {
  // Runs after every render
});
// OR with dependencies
useEffect(() => {}, [dependency]);
```

**Key Words:** After every update, Without empty array, With dependencies

***

## **6. How do you handle errors in React components?**

**Answer:**
"**Two ways**:
1. **Error Boundaries** - Catch **rendering errors** in child components
2. **Try-catch blocks** - Handle **event handler errors**

Error boundaries **can't catch**: event handlers, async code, SSR errors."

**Key Words:** Error Boundaries, Try-catch, Rendering vs event handlers, Can't catch async

***

## **7. What is Error Boundary?**

**Answer:**
"Error Boundary is a **class component** that **catches JavaScript errors** in child component tree. Shows **fallback UI** instead of crashing app.
```javascript
class ErrorBoundary extends React.Component {
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return <h1>Something went wrong</h1>;
    return this.props.children;
  }
}
```

**Key Words:** Class component, Catches errors, Fallback UI, Child component tree

***

## **8. What is conditional rendering?**

**Answer:**
"Conditional rendering **shows/hides components** based on conditions. **Three ways**:
1. **if/else** statements
2. **Ternary operator** `{condition ? <A/> : <B/>}`
3. **Logical AND** `{condition && <Component/>}`

Like **showing different pages** based on user login status."

**Key Words:** Shows/hides, Three ways, if/else, Ternary, Logical AND

***

## **9. How do you render lists in React?**

**Answer:**
"Use **JavaScript map()** method to **transform arrays into JSX elements**.
```javascript
const items = ['apple', 'banana'];
return (
  <ul>
    {items.map(item => <li key={item}>{item}</li>)}
  </ul>
);
```
**Always provide unique keys** for each list item."

**Key Words:** JavaScript map(), Transform arrays, Always provide keys

***

## **10. What is the importance of keys in lists?**

**Answer:**
"Keys help React **identify which items changed**. Without keys, React **re-renders entire list**. With keys, React **updates only changed items**.

**Performance benefits:**
- **Faster rendering**
- **Preserves component state**
- **Efficient DOM updates**

**Best practice:** Use **unique IDs**, avoid array indexes."

**Key Words:** Identify changes, Faster rendering, Preserves state, Unique IDs

***

## **Quick Memory Aids:**

### **Lifecycle Phases (M-U-U):**
- **M** - **Mount** (birth)
- **U** - **Update** (growth) 
- **U** - **Unmount** (death)

### **Hook Equivalents:**
- **componentDidMount** → `useEffect(() => {}, [])`
- **componentWillUnmount** → `useEffect(() => { return cleanup; }, [])`
- **componentDidUpdate** → `useEffect(() => {})`

### **Conditional Rendering (I-T-A):**
- **I** - **if/else**
- **T** - **Ternary** operator
- **A** - **AND** operator (&&)

### **Error Handling:**
- **Error Boundaries** → Rendering errors
- **Try-catch** → Event handler errors

### **Lists & Keys:**
- **map()** → Transform arrays
- **Keys** → React optimization
- **Unique IDs** → Best practice


[1](https://www.interviewbit.com/react-interview-questions/)
[2](https://www.geeksforgeeks.org/reactjs/react-interview-questions/)
[3](https://testbook.com/interview/react-lifecycle-interview-questions)
[4](https://www.geeksforgeeks.org/reactjs/reactjs-lifecycle-components/)
[5](https://github.com/sudheerj/reactjs-interview-questions)
[6](https://www.greatfrontend.com/questions/quiz/what-are-error-boundaries-in-react-for)
[7](https://www.w3schools.com/react/react_conditional_rendering.asp)
[8](https://legacy.reactjs.org/docs/lists-and-keys.html)
[9](https://www.geeksforgeeks.org/reactjs/reactjs-keys/)
[10](https://www.greatfrontend.com/blog/100-react-interview-questions-straight-from-ex-interviewers)
[11](https://www.crsinfosolutions.com/error-handling-react-js-interview-questions/)
[12](https://www.geeksforgeeks.org/reactjs/reactjs-conditional-rendering/)
[13](https://www.dhiwise.com/post/react-lists-and-keys-the-key-to-efficient-rendering)
[14](https://www.geeksforgeeks.org/reactjs/reactjs-lists/)
[15](https://www.w3schools.com/react/react_lists.asp)