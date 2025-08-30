# React Hooks - Interview Answers (Concise & Memorable)

## **1. What are React Hooks?**

**Answer:**
"Hooks are **functions that let you use React features** in functional components. They **'hook into'** React state and lifecycle without writing classes. Think of them as **power tools** for functional components."

**Key Words:** Functions, Hook into, Power tools

***

## **2. What is useState hook and how to use it?**

**Answer:**
"useState adds **state to functional components**. Returns **array with [value, setter]**. 
```javascript
const [count, setCount] = useState(0);
```
Like having a **variable with memory** that triggers re-renders when changed."

**Key Words:** State to functional, Array, Variable with memory

***

## **3. What is useEffect hook and when to use it?**

**Answer:**
"useEffect handles **side effects** like API calls, timers, DOM updates. Runs **after render**.
```javascript
useEffect(() => { /* side effect */ }, [dependencies]);
```
Use for **data fetching, subscriptions, cleanup**."

**Key Words:** Side effects, After render, Data fetching

***

## **4. What's the difference between useEffect and componentDidMount?**

**Answer:**
"**componentDidMount** runs once after **initial render** (class component). **useEffect** is more flexible - can run **after every render** or with **dependencies**. useEffect can **replace multiple lifecycle methods**."

**Key Words:** Once vs Flexible, Initial vs Every, Multiple lifecycle

***

## **5. How do you clean up effects in useEffect?**

**Answer:**
"Return a **cleanup function** from useEffect. Runs when **component unmounts** or **dependencies change**.
```javascript
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  return () => clearInterval(timer); // Cleanup
}, []);
```

**Key Words:** Return cleanup function, Unmounts, Dependencies change

***

## **6. What is useContext hook?**

**Answer:**
"useContext **consumes React Context** values without wrapping in Consumer. **Avoids prop drilling**.
```javascript
const value = useContext(MyContext);
```
Like accessing **global variables** from anywhere in component tree."

**Key Words:** Consumes Context, Avoids prop drilling, Global variables

***

## **7. What is useReducer hook and when to use it?**

**Answer:**
"useReducer manages **complex state logic** with a reducer function. **Alternative to useState** for multiple related state updates.
```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```
Use when **state depends on previous state** or **multiple sub-values**."

**Key Words:** Complex state, Alternative to useState, Depends on previous

***

## **8. What's the difference between useState and useReducer?**

**Answer:**
"**useState**: Simple state, **single values**. **useReducer**: Complex state, **multiple related values**.

| useState | useReducer |
|----------|------------|
| Simple updates | Complex logic |
| One value | Multiple values |
| Direct setter | Dispatch actions |"

**Key Words:** Simple vs Complex, Single vs Multiple, Direct vs Dispatch

***

## **9. What is useMemo hook and when to use it?**

**Answer:**
"useMemo **caches expensive calculations** between renders. Only recalculates when **dependencies change**.
```javascript
const expensiveValue = useMemo(() => heavyCalculation(), [deps]);
```
Use for **performance optimization** of costly operations."

**Key Words:** Caches calculations, Dependencies change, Performance optimization

***

## **10. What is useCallback hook?**

**Answer:**
"useCallback **memoizes functions** to prevent recreation on every render. **Prevents unnecessary child re-renders**.
```javascript
const memoizedCallback = useCallback(() => {}, [deps]);
```
Use when **passing functions to child components**."

**Key Words:** Memoizes functions, Prevents recreation, Child components

***

## **11. What's the difference between useMemo and useCallback?**

**Answer:**
"**useMemo** caches **computed values**. **useCallback** caches **functions**.

| useMemo | useCallback |
|---------|-------------|
| Returns **value** | Returns **function** |
| Expensive calculations | Function references |
| `useMemo(() => value, [])` | `useCallback(() => {}, [])` |"

**Key Words:** Value vs Function, Calculations vs References

***

## **12. What is useRef hook and its use cases?**

**Answer:**
"useRef creates **mutable reference** that **doesn't trigger re-renders**. Persists between renders.
```javascript
const inputRef = useRef(null);
```
**Use cases**: DOM access, storing timers, previous values, third-party libraries."

**Key Words:** Mutable reference, Doesn't trigger re-renders, DOM access

***

## **13. Can you use hooks in class components?**

**Answer:**
"**No, absolutely not!** Hooks **only work in functional components** and **custom hooks**. That's why they're called hooks - they **'hook into'** functional component features. Class components use **lifecycle methods** instead."

**Key Words:** No, Functional only, Hook into, Lifecycle methods

***

## **14. What are the rules of hooks?**

**Answer:**
"**Two main rules**:
1. **Only call at top level** - never in loops, conditions, or nested functions
2. **Only call from React functions** - functional components or custom hooks

These ensure **consistent hook order** between renders."

**Key Words:** Top level only, React functions only, Consistent order

***

## **15. How do you create custom hooks?**

**Answer:**
"Custom hooks are **JavaScript functions** starting with **'use'** that call other hooks.
```javascript
function useCounter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(c => c + 1);
  return { count, increment };
}
```
**Reuse stateful logic** across components."

**Key Words:** JavaScript functions, Start with 'use', Reuse stateful logic

***

## **Quick Memory Aids:**

### **Hook Categories (S-E-C-R-M-C-R):**
- **S** - **useState** (state)
- **E** - **useEffect** (effects)  
- **C** - **useContext** (context)
- **R** - **useReducer** (complex state)
- **M** - **useMemo** (memoize values)
- **C** - **useCallback** (memoize functions)
- **R** - **useRef** (references)

### **Hook Rules (T-R):**
- **T** - **Top level** only
- **R** - **React functions** only

### **When to Use What:**
- **Simple state** → useState
- **Complex state** → useReducer
- **Side effects** → useEffect
- **Global state** → useContext
- **Performance** → useMemo/useCallback
- **DOM access** → useRef


[1](https://www.scholarhat.com/tutorial/react/react-hooks-interview-questions-and-answers)
[2](https://www.geeksforgeeks.org/reactjs/top-react-hooks-interview-questions-answers/)
[3](https://www.greatfrontend.com/blog/30-essential-react-hooks-interview-questions-you-must-know)
[4](https://www.linkedin.com/pulse/react-hooks-interview-questions-praveen-kumar-bandi-huuve)
[5](https://testbook.com/interview/react-hooks-interview-questions)
[6](https://cloudfoundation.com/blog/react-hooks-interview-questions/)
[7](https://www.interviewbit.com/react-interview-questions/)
[8](https://www.crsinfosolutions.com/react-hooks-interview-questions/)