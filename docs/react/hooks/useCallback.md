# React Hooks Guide: useCallback Hook

## What is useCallback Hook?

The **useCallback hook** is a React hook that lets you cache a function definition between re-renders. It returns a memoized version of the callback function that only changes if one of its dependencies has changed, helping to optimize performance by preventing unnecessary re-creations of functions.

### Key Definitions from Multiple Sources:

- **React Official Documentation**: useCallback is a React Hook that lets you cache a function definition between re-renders. React will return (not call!) your function back to you during the initial render
- **W3Schools**: The useCallback Hook is used to memoize a callback function. Memoizing a function means caching the result of a function so that it does not need to be recreated on every render
- **Hygraph**: useCallback is a part of the built-in React Hooks that optimizes the performance of React applications by preventing unnecessary re-renders of components through memoizing callback functions
- **DEV Community**: useCallback hook is a built-in performance optimization function used for optimizing functions declared inside a component, to ensure they only run when certain data doesn't change

## Why useCallback is Needed

In React, **every time a component re-renders, all functions inside that component are recreated**. This can cause performance issues because:

1. **New function references** are created on each render
2. **Child components receive "new" props** even if the function logic hasn't changed
3. **Components wrapped with React.memo** will re-render unnecessarily
4. **Event handlers and callbacks** get recreated constantly

## Basic Syntax

```js
const memoizedCallback = useCallback(() => {
  // Your function logic here
}, [dependencies]);
```

**Parameters:**

- **Function**: The first argument - the function you want to memoize
- **Dependencies**: The second argument - array of values that determine when to recreate the function

**Returns:**

- The memoized function (same reference between renders unless dependencies change)

## Import Statement

```js
import { useCallback } from "react";
```

## Basic Example: Preventing Unnecessary Re-renders

### Without useCallback (Problem)

```js
import React, { useState } from "react";

// Child component wrapped with React.memo
const Button = React.memo(({ onClick, text }) => {
  console.log(`${text} button rendered`);
  return <button onClick={onClick}>{text}</button>;
});

function WithoutCallbackExample() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  // These functions are recreated on EVERY render
  const handleClick1 = () => {
    setCount1(count1 + 1);
  };

  const handleClick2 = () => {
    setCount2(count2 + 1);
  };

  console.log("Parent rendered");

  return (
    <div>
      <p>Count 1: {count1}</p>
      <p>Count 2: {count2}</p>
      {/* Both buttons re-render every time parent renders */}
      <Button onClick={handleClick1} text="Button 1" />
      <Button onClick={handleClick2} text="Button 2" />
    </div>
  );
}
```

**Problem**: All buttons re-render when any state changes because functions are recreated.

### With useCallback (Solution)

```js
import React, { useState, useCallback } from "react";

const Button = React.memo(({ onClick, text }) => {
  console.log(`${text} button rendered`);
  return <button onClick={onClick}>{text}</button>;
});

function WithCallbackExample() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  // These functions are memoized
  const handleClick1 = useCallback(() => {
    setCount1((prevCount) => prevCount + 1);
  }, []); // No dependencies - function never changes

  const handleClick2 = useCallback(() => {
    setCount2((prevCount) => prevCount + 1);
  }, []); // No dependencies - function never changes

  console.log("Parent rendered");

  return (
    <div>
      <p>Count 1: {count1}</p>
      <p>Count 2: {count2}</p>
      {/* Only the clicked button's parent re-renders */}
      <Button onClick={handleClick1} text="Button 1" />
      <Button onClick={handleClick2} text="Button 2" />
    </div>
  );
}
```

**Solution**: Functions are memoized, preventing unnecessary child re-renders.

## Real-World Examples

### 1. Form Handling with Multiple Inputs

```js
import React, { useState, useCallback } from "react";

const FormField = React.memo(({ label, value, onChange, type = "text" }) => {
  console.log(`${label} field rendered`);
  return (
    <div>
      <label>{label}:</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </div>
  );
});

function UserRegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    password: "",
  });

  // Memoized handlers for each field
  const handleFirstNameChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, firstName: e.target.value }));
  }, []);

  const handleLastNameChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, lastName: e.target.value }));
  }, []);

  const handleEmailChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, email: e.target.value }));
  }, []);

  const handleAgeChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, age: e.target.value }));
  }, []);

  const handlePasswordChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, password: e.target.value }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log("Form submitted:", formData);
      // Handle form submission
    },
    [formData]
  );

  return (
    <form onSubmit={handleSubmit}>
      <h2>User Registration</h2>

      <FormField
        label="First Name"
        value={formData.firstName}
        onChange={handleFirstNameChange}
      />

      <FormField
        label="Last Name"
        value={formData.lastName}
        onChange={handleLastNameChange}
      />

      <FormField
        label="Email"
        value={formData.email}
        onChange={handleEmailChange}
        type="email"
      />

      <FormField
        label="Age"
        value={formData.age}
        onChange={handleAgeChange}
        type="number"
      />

      <FormField
        label="Password"
        value={formData.password}
        onChange={handlePasswordChange}
        type="password"
      />

      <button type="submit">Register</button>
    </form>
  );
}
```

### 2. Todo List with Optimized Operations

```js
import React, { useState, useCallback } from "react";

const TodoItem = React.memo(({ todo, onToggle, onDelete, onEdit }) => {
  console.log(`Todo ${todo.id} rendered`);

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(todo.id, editText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid #ccc",
        margin: "5px 0",
        textDecoration: todo.completed ? "line-through" : "none",
      }}
    >
      {isEditing ? (
        <input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          autoFocus
        />
      ) : (
        <span onClick={() => onToggle(todo.id)}>{todo.text}</span>
      )}

      <button onClick={handleEdit} style={{ marginLeft: "10px" }}>
        {isEditing ? "Save" : "Edit"}
      </button>

      <button onClick={() => onDelete(todo.id)} style={{ marginLeft: "10px" }}>
        Delete
      </button>
    </div>
  );
});

function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Master useCallback", completed: false },
    { id: 3, text: "Build awesome apps", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  // Memoized callback functions
  const handleToggle = useCallback((id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const handleDelete = useCallback((id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  const handleEdit = useCallback((id, newText) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  }, []);

  const handleAddTodo = useCallback(
    (e) => {
      e.preventDefault();
      if (newTodo.trim()) {
        setTodos((prevTodos) => [
          ...prevTodos,
          {
            id: Date.now(),
            text: newTodo,
            completed: false,
          },
        ]);
        setNewTodo("");
      }
    },
    [newTodo]
  );

  return (
    <div>
      <h1>Todo List</h1>

      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo..."
        />
        <button type="submit">Add Todo</button>
      </form>

      <div>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}
```

### 3. Data Fetching with Search Functionality

```js
import React, { useState, useEffect, useCallback } from "react";

const SearchResult = React.memo(({ user, onSelect }) => {
  console.log(`User ${user.id} rendered`);

  return (
    <div
      onClick={() => onSelect(user)}
      style={{
        padding: "10px",
        border: "1px solid #ddd",
        cursor: "pointer",
        margin: "5px 0",
      }}
    >
      <h4>{user.name}</h4>
      <p>Email: {user.email}</p>
      <p>Company: {user.company.name}</p>
    </div>
  );
});

function UserSearch() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const userData = await response.json();
        setUsers(userData);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Memoized search function
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  // Memoized user selection
  const handleSelectUser = useCallback((user) => {
    setSelectedUser(user);
  }, []);

  // Memoized clear selection
  const handleClearSelection = useCallback(() => {
    setSelectedUser(null);
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div>
      <h1>User Search</h1>

      <input
        type="text"
        placeholder="Search users by name or email..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
      />

      {selectedUser && (
        <div
          style={{
            background: "#f0f8ff",
            padding: "15px",
            marginBottom: "20px",
            border: "2px solid #007bff",
          }}
        >
          <h3>Selected User</h3>
          <p>
            <strong>Name:</strong> {selectedUser.name}
          </p>
          <p>
            <strong>Email:</strong> {selectedUser.email}
          </p>
          <p>
            <strong>Phone:</strong> {selectedUser.phone}
          </p>
          <p>
            <strong>Website:</strong> {selectedUser.website}
          </p>
          <button onClick={handleClearSelection}>Clear Selection</button>
        </div>
      )}

      <div>
        <h3>Search Results ({filteredUsers.length})</h3>
        {filteredUsers.map((user) => (
          <SearchResult key={user.id} user={user} onSelect={handleSelectUser} />
        ))}
      </div>
    </div>
  );
}
```

### 4. Shopping Cart with Item Management

```js
import React, { useState, useCallback } from "react";

const CartItem = React.memo(({ item, onUpdateQuantity, onRemove }) => {
  console.log(`CartItem ${item.id} rendered`);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        border: "1px solid #eee",
        margin: "5px 0",
      }}
    >
      <div>
        <h4>{item.name}</h4>
        <p>Price: ${item.price}</p>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
          -
        </button>
        <span style={{ margin: "0 10px" }}>{item.quantity}</span>
        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
          +
        </button>
        <button
          onClick={() => onRemove(item.id)}
          style={{ marginLeft: "10px", background: "red", color: "white" }}
        >
          Remove
        </button>
      </div>
    </div>
  );
});

const ProductItem = React.memo(({ product, onAddToCart }) => {
  console.log(`Product ${product.id} rendered`);

  return (
    <div
      style={{
        padding: "15px",
        border: "1px solid #ddd",
        margin: "10px 0",
      }}
    >
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
});

function ShoppingApp() {
  const [cart, setCart] = useState([]);
  const [products] = useState([
    {
      id: 1,
      name: "Laptop",
      price: 999,
      description: "High-performance laptop",
    },
    { id: 2, name: "Mouse", price: 25, description: "Wireless optical mouse" },
    { id: 3, name: "Keyboard", price: 75, description: "Mechanical keyboard" },
    { id: 4, name: "Monitor", price: 299, description: "24-inch LED monitor" },
  ]);

  // Memoized cart operations
  const handleAddToCart = useCallback((product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, []);

  const handleUpdateQuantity = useCallback((productId, newQuantity) => {
    if (newQuantity <= 0) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  }, []);

  const handleRemoveFromCart = useCallback((productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  }, []);

  const handleClearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Calculate totals
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* Products Section */}
      <div style={{ flex: 1 }}>
        <h2>Products</h2>
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {/* Cart Section */}
      <div style={{ flex: 1 }}>
        <h2>Shopping Cart ({totalItems} items)</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveFromCart}
              />
            ))}

            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                background: "#f9f9f9",
              }}
            >
              <h3>Total: ${totalPrice.toFixed(2)}</h3>
              <button
                onClick={handleClearCart}
                style={{
                  background: "orange",
                  color: "white",
                  padding: "10px",
                }}
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
```

## useCallback with Custom Hooks

```js
import React, { useState, useCallback, useEffect } from "react";

// Custom hook for API operations
function useApi(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Memoized fetch function
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Failed to fetch");
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  // Memoized refresh function
  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, fetchData, refresh };
}

// Custom hook for local storage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  // Memoized setter function
  const setValue = useCallback(
    (value) => {
      try {
        setStoredValue(value);
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    },
    [key]
  );

  // Memoized remove function
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

// Component using custom hooks
function UserPreferences() {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const [language, setLanguage] = useLocalStorage("language", "en");
  const { data: user, fetchData, refresh } = useApi("/api/user");

  // Memoized handlers
  const handleThemeChange = useCallback(
    (newTheme) => {
      setTheme(newTheme);
    },
    [setTheme]
  );

  const handleLanguageChange = useCallback(
    (newLanguage) => {
      setLanguage(newLanguage);
    },
    [setLanguage]
  );

  const handleRefreshUser = useCallback(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div
      style={{
        background: theme === "dark" ? "#333" : "#fff",
        color: theme === "dark" ? "#fff" : "#333",
        padding: "20px",
      }}
    >
      <h2>User Preferences</h2>

      <div>
        <label>
          Theme:
          <select
            value={theme}
            onChange={(e) => handleThemeChange(e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Language:
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </label>
      </div>

      {user && (
        <div>
          <h3>User Info</h3>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <button onClick={handleRefreshUser}>Refresh User Data</button>
        </div>
      )}
    </div>
  );
}
```

## Important Concepts & Best Practices

### 1. When to Use useCallback

✅ **Good Use Cases:**

- **Functions passed to memoized child components** (React.memo)
- **Event handlers** in complex component trees
- **Callback functions** with expensive operations
- **Functions used in useEffect dependencies**
- **Custom hook functions** that other hooks depend on

❌ **Avoid useCallback for:**

- **Simple inline functions** that don't cause performance issues
- **Functions not passed as props** to other components
- **Every function** (premature optimization)
- **Functions that change on every render anyway**

### 2. Dependencies Array Rules

```js
// ✅ Good - Include all used variables
function Component({ userId, callback }) {
  const handleClick = useCallback(() => {
    callback(userId);
  }, [callback, userId]); // Both callback and userId included
}

// ❌ Bad - Missing dependencies
function Component({ userId, callback }) {
  const handleClick = useCallback(() => {
    callback(userId);
  }, []); // Missing callback and userId dependencies
}
```

### 3. Using Functional Updates

```js
// ✅ Good - No dependencies needed with functional update
const handleIncrement = useCallback(() => {
  setCount((prevCount) => prevCount + 1);
}, []); // Empty dependencies array

// ❌ Less optimal - Requires count as dependency
const handleIncrement = useCallback(() => {
  setCount(count + 1);
}, [count]); // Function recreated when count changes
```

### 4. Combining with React.memo

```js
// Child component wrapped with React.memo
const ExpensiveChild = React.memo(({ onAction, data }) => {
  console.log("ExpensiveChild rendered");

  return (
    <div>
      <p>{data}</p>
      <button onClick={onAction}>Action</button>
    </div>
  );
});

function Parent() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState("");

  // Without useCallback, ExpensiveChild re-renders when otherState changes
  const handleAction = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []); // Function reference stays the same

  return (
    <div>
      <input
        value={otherState}
        onChange={(e) => setOtherState(e.target.value)}
      />
      <ExpensiveChild onAction={handleAction} data={count} />
    </div>
  );
}
```

## Common Pitfalls

### 1. Over-using useCallback

```js
// ❌ Unnecessary - Simple function, not passed to child
function Component() {
  const simpleHandler = useCallback(() => {
    console.log("Clicked");
  }, []); // Not needed if not passed to children

  return <button onClick={simpleHandler}>Click me</button>;
}

// ✅ Better - Direct inline function for simple cases
function Component() {
  return <button onClick={() => console.log("Clicked")}>Click me</button>;
}
```

### 2. Incorrect Dependencies

```js
// ❌ Wrong - Missing dependencies
function Component({ items }) {
  const processItems = useCallback(() => {
    return items.map((item) => item.name);
  }, []); // Missing 'items' dependency
}

// ✅ Correct - All dependencies included
function Component({ items }) {
  const processItems = useCallback(() => {
    return items.map((item) => item.name);
  }, [items]); // Include 'items' dependency
}
```

### 3. Stale Closures

```js
// ❌ Stale closure - count value is captured
function Component() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log(count); // This will always log the initial count value
  }, []); // Empty dependencies cause stale closure
}

// ✅ Fix with dependency
function Component() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log(count); // Current count value
  }, [count]); // Include count as dependency
}

// ✅ Alternative fix with functional update
function Component() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount((prevCount) => {
      console.log(prevCount); // Current count value
      return prevCount + 1;
    });
  }, []); // No dependencies needed
}
```

## Performance Considerations

### 1. Measuring Performance Impact

```js
function Component() {
  const expensiveHandler = useCallback(() => {
    console.time("Expensive Operation");
    // Expensive operation here
    console.timeEnd("Expensive Operation");
  }, []);

  return <button onClick={expensiveHandler}>Click</button>;
}
```

### 2. Use React DevTools Profiler

Enable the Profiler in React DevTools to measure the actual performance impact of your optimizations.

## Key Takeaways

- **useCallback** prevents functions from being recreated on every render
- **Essential for optimizing child components** wrapped with React.memo
- **Include all dependencies** in the dependency array
- **Use functional updates** to reduce dependencies
- **Don't overuse** - only optimize when there's a real performance issue
- **Combine with React.memo** for maximum effectiveness
- **Prevents unnecessary re-renders** in complex component trees
- **Great for event handlers** and callback functions passed as props

## useCallback vs useMemo vs React.memo

| Hook/HOC        | Purpose            | Use Case                                |
| --------------- | ------------------ | --------------------------------------- |
| **useCallback** | Memoize functions  | Event handlers, callback functions      |
| **useMemo**     | Memoize values     | Expensive calculations, computed values |
| **React.memo**  | Memoize components | Prevent component re-renders            |

---

_This guide covers all essential patterns and use cases for the useCallback hook in React functional components._

```


[1](https://react.dev/reference/react/useCallback)
[2](https://www.w3schools.com/react/react_usecallback.asp)
[3](https://legacy.reactjs.org/docs/hooks-reference.html)
[4](https://hygraph.com/blog/react-usecallback-a-complete-guide)
[5](https://www.haikel-fazzani.eu.org/reactjs/react-usecallback)
[6](https://dev.to/kansoldev/the-usecallback-hook-33mi)
[7](https://react.dev/reference/react/hooks)
[8](https://deadsimplechat.com/blog/usecallback-guide-use-cases-and-examples/)
[9](https://semaphore.io/blog/react-usecallback-hook)
```
