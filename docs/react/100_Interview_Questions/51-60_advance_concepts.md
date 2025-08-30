# Advanced Concepts - Interview Answers (Concise & Memorable)

## **1. What is React Context API?**

**Answer:**
"Context API is React's **built-in state management** that lets you **share data globally** without prop drilling. Creates a **Provider-Consumer pattern** where data flows from Provider to any nested component.

```javascript
const MyContext = createContext();
// Provider wraps app, Consumer uses useContext hook
```

Like a **broadcasting tower** sending signals to multiple receivers."

**Key Words:** Built-in state management, Share globally, Provider-Consumer, Broadcasting tower

---

## **2. When should you use Context vs Props?**

**Answer:**
"Use **Context** for **global/shared data** needed by many components. Use **Props** for **direct parent-child communication**.

| Context                       | Props                      |
| ----------------------------- | -------------------------- |
| **Global** data (theme, user) | **Local** data             |
| **Many components** need it   | **Few components** need it |
| **Deep nesting**              | **1-2 levels** down        |
| **Avoids prop drilling**      | **Simple passing**         |

**Rule of thumb:** If more than **3 levels deep**, consider Context."

**Key Words:** Global vs Local, Many vs Few, Deep nesting vs Simple, 3 levels rule

---

## **3. What is prop drilling and how Context solves it?**

**Answer:**
"Prop drilling is **passing props through intermediate components** that don't need them, just to reach deeply nested children. Like **passing a message through many people**.

**Problem:**

```
App → Header → Navbar → UserProfile → UserName
// UserName needs user data, but Header & Navbar don't care
```

**Context Solution:** Create **direct connection** between Provider and Consumer, **skipping intermediates**. Like having a **direct phone line** instead of message chain."

**Key Words:** Through intermediates, Message through people, Direct connection, Direct phone line

---

## **4. What are Higher-Order Components (HOCs)?**

**Answer:**
"HOC is a **function that takes a component** and **returns an enhanced component**. It's a **wrapper pattern** for adding functionality.

```javascript
const withLoading = (Component) => {
  return (props) => {
    if (props.loading) return <div>Loading...</div>;
    return <Component {...props} />;
  };
};
```

Like **decorating a gift** - adds features without changing the original."

**Key Words:** Function takes component, Returns enhanced, Wrapper pattern, Decorating gift

---

## **5. What is render prop pattern?**

**Answer:**
"Render prop is a **prop that's a function** telling component **what to render**. Enables **sharing logic** between components.

```javascript
<DataProvider render={(data) => <Display data={data} />} />
// or
<DataProvider>{(data) => <Display data={data} />}</DataProvider>
```

Like giving someone **instructions on what to cook** with ingredients you provide."

**Key Words:** Prop that's function, What to render, Sharing logic, Instructions to cook

---

## **6. What are controlled and uncontrolled components?**

**Answer:**
"**Controlled:** React **controls the input** via state. **Uncontrolled:** DOM **controls the input**, React uses refs to access.

| Controlled                     | Uncontrolled               |
| ------------------------------ | -------------------------- |
| **React state** controls value | **DOM** controls value     |
| **value + onChange**           | **defaultValue + ref**     |
| **Real-time validation**       | **Submit-time validation** |
| **More predictable**           | **Simpler setup**          |

**Example:** `<input value={state} onChange={handler} />` vs `<input ref={inputRef} />`"

**Key Words:** React vs DOM control, value+onChange vs ref, Real-time vs Submit-time

---

## **7. What is lifting state up?**

**Answer:**
"Lifting state up means **moving state to common parent** when **multiple children need to share** the same data. **Single source of truth**.

```javascript
// Move state from Child1 & Child2 to Parent
function Parent() {
  const [shared, setShared] = useState("");
  return (
    <>
      <Child1 data={shared} onChange={setShared} />
      <Child2 data={shared} />
    </>
  );
}
```

Like **family budget** - kept by parents, used by all children."

**Key Words:** Move to common parent, Multiple children share, Single source, Family budget

---

## **8. What are refs in React and when to use them?**

**Answer:**
"Refs provide **direct access to DOM elements** or **store mutable values** that don't trigger re-renders.

```javascript
const inputRef = useRef(null);
inputRef.current.focus(); // Direct DOM access
```

**Use cases:** Focus management, scroll position, timers, third-party libraries.
**Think:** Emergency **backdoor** when React's normal flow isn't enough."

**Key Words:** Direct DOM access, Mutable values, Don't trigger re-renders, Emergency backdoor

---

## **9. What is React.memo and when to use it?**

**Answer:**
"React.memo is a **HOC that memoizes functional components**. **Prevents re-renders** when props haven't changed.

```javascript
const MyComponent = React.memo(function MyComponent({ name }) {
  return <div>{name}</div>;
});
```

**Use when:** Component renders often with same props, expensive rendering.
Like having a **smart cache** that skips work when input is same."

**Key Words:** HOC memoizes components, Prevents re-renders, Same props, Smart cache

---

## **10. What are React fragments?**

**Answer:**
"Fragments **group multiple elements** without adding extra DOM nodes. **Two syntaxes:**

```javascript
// Short syntax
<>
  <h1>Title</h1>
  <p>Description</p>
</>

// Full syntax (when you need keys)
<React.Fragment key={item.id}>
  <h1>Title</h1>
</React.Fragment>
```

Like **invisible wrapper** - groups things without cluttering DOM."

**Key Words:** Group elements, No extra DOM nodes, Two syntaxes, Invisible wrapper

---

## **Quick Memory Aids:**

### **Advanced Concepts (C-H-R-C-L-R-M-F):**

- **C** - **Context** (global state)
- **H** - **HOCs** (wrapper functions)
- **R** - **Render props** (function props)
- **C** - **Controlled** components (React controls)
- **L** - **Lifting state** (move to parent)
- **R** - **Refs** (DOM access)
- **M** - **Memo** (prevent re-renders)
- **F** - **Fragments** (grouping without DOM)

### **When to Use What:**

- **Global data** → Context
- **Add functionality** → HOCs
- **Share render logic** → Render props
- **Form inputs** → Controlled components
- **Shared state** → Lift state up
- **DOM manipulation** → Refs
- **Performance** → React.memo
- **Multiple elements** → Fragments

### **Common Patterns:**

- **Context** = Broadcasting tower
- **HOCs** = Gift wrapping
- **Render props** = Cooking instructions
- **Lifting state** = Family budget
- **Refs** = Emergency backdoor
- **Memo** = Smart cache
- **Fragments** = Invisible wrapper

[1](https://www.greatfrontend.com/blog/top-30-reactjs-interview-questions-and-answers)
[2](https://www.geeksforgeeks.org/reactjs/reactjs-interview-question-and-answers-advance-level/)
[3](https://www.codechef.com/practice/react-advanced)
[4](https://www.interviewbit.com/react-interview-questions/)
[5](https://talentgrid.io/react-interview-questions/)
[6](https://climbtheladder.com/react-context-api-interview-questions/)
[7](https://stackoverflow.com/questions/58855777/render-props-vs-hoc)
[8](https://www.geeksforgeeks.org/reactjs/controlled-vs-uncontrolled-components-in-reactjs/)
[9](https://www.geeksforgeeks.org/reactjs/lifting-state-up-in-reactjs/)
[10](https://react.dev/reference/react/useMemo)
[11](https://www.greatfrontend.com/questions/quiz/what-are-react-fragments-used-for)
[12](https://rescript-lang.org/docs/react/latest/refs-and-the-dom)
[13](https://www.testgorilla.com/blog/advanced-react-js-interview-questions/)
[14](https://www.linkedin.com/posts/akshaymarch7_react-javascript-frontend-activity-7089637160005332992-6bmB)
[15](https://dev.to/yisakt/exploring-advanced-react-patterns-render-props-higher-order-components-and-hooks-54h7)
[16](https://www.greatfrontend.com/questions/quiz/what-is-the-difference-between-controlled-and-uncontrolled-react-components)
[17](https://codeskiller.codingblocks.com/library/articles/lifting-state-up-in-react-js)
[18](https://www.geeksforgeeks.org/reactjs/how-does-react-memo-optimize-functional-components-in-react/)
