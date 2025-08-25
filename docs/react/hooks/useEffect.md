# React Hooks Guide: useEffect Hook

## What is useEffect Hook?

The **useEffect hook** is a React hook that allows you to perform side effects in functional components. useEffect lets you synchronize a component with an external system and handle component lifecycle events that were previously only available in class components.

### Key Definitions from Multiple Sources:

- **React Official Documentation**: useEffect is a React Hook that lets you synchronize a component with an external system. It tells React that your component needs to do something after render
- **W3Schools**: The useEffect Hook allows you to perform side effects in your components. Some examples of side effects are: fetching data, directly updating the DOM, and timers
- **Stack Overflow Community**: useEffect is one of the most important hooks in react and is a way to handle life cycle of the component in which it is present
- **Radix Web**: React useEffect allows you to perform side effects in function components throughout the application development. The primary goal of useEffect Hook is to execute additional code once React updates the DOM

## What Are Side Effects?

**Side effects** are operations that reach outside of your component function, such as:

- **Data fetching** (API calls)
- **DOM manipulation** (updating document title, focusing elements)
- **Setting up subscriptions** (event listeners, WebSocket connections)
- **Timers** (setTimeout, setInterval)
- **Logging** or analytics tracking

## Basic Syntax

```js
useEffect(() => {
  // Side effect code here
}, [dependencies]);
```

**Parameters:**

- **Effect function**: The first argument containing your side effect code
- **Dependencies array**: Optional second argument that controls when the effect runs

## Import Statement

```js
import { useEffect } from "react";
```

## How useEffect Works

1. **After Render**: useEffect runs after the component renders and the DOM is updated
2. **Non-blocking**: Effects don't block the browser from updating the screen, making your app feel more responsive
3. **Cleanup**: Effects can return a cleanup function to prevent memory leaks
4. **Dependencies**: You can control when effects run using the dependencies array

## useEffect Patterns

### 1. Effect Runs on Every Render

```js
import { useState, useEffect } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

**Explanation**: Without dependencies array, the effect runs after every render.

### 2. Effect Runs Only Once (Component Mount)

```js
import { useState, useEffect } from "react";

function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // This runs only once when component mounts
    fetchUserData().then((userData) => setUser(userData));
  }, []); // Empty dependency array

  return <div>{user ? <h1>Welcome, {user.name}!</h1> : <p>Loading...</p>}</div>;
}
```

**Explanation**: Empty dependency array makes the effect run only once after the initial render.

### 3. Effect Runs When Specific Values Change

```js
import { useState, useEffect } from "react";

function SearchResults() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      searchAPI(searchTerm).then((data) => setResults(data));
    }
  }, [searchTerm]); // Runs only when searchTerm changes

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {results.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

**Explanation**: Effect runs only when `searchTerm` changes.

## Cleanup Functions

### Timer Cleanup Example

```js
import { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // Cleanup function
    return () => {
      clearInterval(interval);
    };
  }, []); // Empty dependency - runs once

  return <div>Timer: {seconds} seconds</div>;
}
```

### Event Listener Cleanup Example

```js
import { useState, useEffect } from "react";

function WindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      Window size: {windowSize.width} x {windowSize.height}
    </div>
  );
}
```

### Subscription Cleanup Example

```js
import { useState, useEffect } from "react";

function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const subscription = subscribeToRoom(roomId, (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Cleanup function
    return () => {
      subscription.unsubscribe();
    };
  }, [roomId]); // Runs when roomId changes

  return (
    <div>
      {messages.map((msg) => (
        <div key={msg.id}>{msg.text}</div>
      ))}
    </div>
  );
}
```

## Data Fetching Examples

### Basic API Call

```js
import { useState, useEffect } from "react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### Async/Await with Cleanup

```js
import { useState, useEffect } from "react";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();

        if (!cancelled) {
          setUser(userData);
          setLoading(false);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Failed to fetch user:", error);
          setLoading(false);
        }
      }
    };

    fetchUser();

    // Cleanup function
    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (loading) return <div>Loading user...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

## Common Patterns and Use Cases

### 1. Document Title Updates

```js
useEffect(() => {
  document.title = `${pageTitle} - My App`;
}, [pageTitle]);
```

### 2. Focus Management

```js
useEffect(() => {
  inputRef.current?.focus();
}, []);
```

### 3. Local Storage Sync

```js
useEffect(() => {
  localStorage.setItem("userPreferences", JSON.stringify(preferences));
}, [preferences]);
```

### 4. Multiple Effects in One Component

```js
function Dashboard() {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // Effect for user data
  useEffect(() => {
    fetchUser().then(setUser);
  }, []);

  // Effect for notifications
  useEffect(() => {
    const interval = setInterval(() => {
      fetchNotifications().then(setNotifications);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Effect for document title
  useEffect(() => {
    document.title = user ? `Dashboard - ${user.name}` : "Dashboard";
  }, [user]);

  return <div>Dashboard Content</div>;
}
```

## Important Concepts & Best Practices

### 1. Dependencies Array Rules

- **Always include values from component scope that are used inside the effect**
- **Don't lie about dependencies** - include all used variables
- **Use ESLint plugin** `eslint-plugin-react-hooks` to catch dependency issues

### 2. Effect Execution Timing

- Effects run **after** the DOM has been updated
- Effects are **non-blocking** - they don't prevent browser painting
- For synchronous effects, use `useLayoutEffect` instead

### 3. Common Mistakes to Avoid

#### Missing Dependencies

```js
// ❌ Wrong - missing dependency
function BadExample({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, []); // Missing userId dependency

  return <div>{user?.name}</div>;
}

// ✅ Correct - include all dependencies
function GoodExample({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]); // Include userId

  return <div>{user?.name}</div>;
}
```

#### Infinite Loops

```js
// ❌ Wrong - will cause infinite loop
function BadExample() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then(setData);
  }, [data]); // data changes every time, causing infinite loop

  return <div>{data.length}</div>;
}

// ✅ Correct - empty dependency array
function GoodExample() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData().then(setData);
  }, []); // Runs only once

  return <div>{data.length}</div>;
}
```

### 4. useEffect vs Class Component Lifecycles

| useEffect Pattern                          | Class Component Equivalent                                  |
| ------------------------------------------ | ----------------------------------------------------------- |
| `useEffect(() => {})`                      | `componentDidMount` + `componentDidUpdate`                  |
| `useEffect(() => {}, [])`                  | `componentDidMount`                                         |
| `useEffect(() => { return cleanup; }, [])` | `componentDidMount` + `componentWillUnmount`                |
| `useEffect(() => {}, [dep])`               | `componentDidMount` + `componentDidUpdate` (with condition) |

## Key Takeaways

- **useEffect** handles side effects in functional components
- Effects run **after** rendering and DOM updates
- Use **dependencies array** to control when effects run
- Always **cleanup** subscriptions, timers, and event listeners
- **Include all dependencies** used inside the effect
- Effects are **non-blocking** and don't prevent browser updates
- You can have **multiple useEffect hooks** in one component
- **Cleanup functions** prevent memory leaks and unwanted behavior

## When NOT to Use useEffect

- **Don't use for**: Transforming data for rendering (use regular functions)
- **Don't use for**: Handling user events (use event handlers)
- **Don't use for**: Resetting state when props change (use key prop instead)

---

_This guide covers the essential patterns and use cases for useEffect hook in React functional components._

## References

```
[1](https://react.dev/reference/react/useEffect)
[2](https://legacy.reactjs.org/docs/hooks-effect.html)
[3](https://react.dev/reference/react/hooks)
[4](https://www.w3schools.com/react/react_useeffect.asp)
[5](https://blog.ohansemmanuel.com/react-hooks-documentation-easy-to-read/)
[6](https://stackoverflow.com/questions/77009292/what-is-useeffect-in-react)
[7](https://radixweb.com/blog/guide-to-useeffect-hook-in-react)
[8](https://legacy.reactjs.org/docs/hooks-reference.html)
[9](https://react.dev/learn/you-might-not-need-an-effect)
[10](https://react-redux.js.org/api/hooks)
```
