# React Hooks Guide: useContext Hook

## What is useContext Hook?

The **useContext hook** is a React hook that allows you to read and subscribe to context from your component. It provides a way to pass data through the component tree without having to pass props down manually at every level, solving the "prop drilling" problem.

### Key Definitions from Multiple Sources:

- **React Official Documentation**: useContext is a React Hook that lets you read and subscribe to context from your component. It returns the context value for the calling component
- **W3Schools**: React Context is a way to manage state globally. It can be used together with the useState Hook to share state between deeply nested components more easily
- **DEV Community**: useContext hook allows you to consume context values directly in functional components without wrapping them in Context.Consumer
- **Peerlist**: The useContext hook in React allows components to consume data without manually passing props at each level, enabling components to access shared state or configuration

## What is React Context?

**React Context** is a feature that allows you to share values between components without explicitly passing props through every level of the tree. It's designed to share data that can be considered "global" for a tree of React components.

**Common use cases:**

- **Theme data** (light/dark mode)
- **User authentication** status
- **Language/locale** preferences
- **Shopping cart** state
- **Current user** information

## Basic Syntax

```js
const value = useContext(SomeContext);
```

**Parameters:**

- **SomeContext**: The context object created with `createContext`

**Returns:**

- The context value for the calling component

## Three Steps to Use useContext

### 1. Create Context

```js
import { createContext } from "react";
const ThemeContext = createContext();
```

### 2. Provide Context

```js
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>
```

### 3. Consume Context

```js
import { useContext } from "react";

function MyComponent() {
  const theme = useContext(ThemeContext);
  return <div>Current theme: {theme}</div>;
}
```

## Import Statement

```js
import { useContext, createContext } from "react";
```

## Complete Basic Example

```js
import { createContext, useContext, useState } from "react";

// Step 1: Create Context
const UserContext = createContext();

// Main App Component
function App() {
  const [user, setUser] = useState("John Doe");

  return (
    // Step 2: Provide Context
    <UserContext.Provider value={user}>
      <div>
        <h1>Hello {user}!</h1>
        <Component2 />
      </div>
    </UserContext.Provider>
  );
}

// Intermediate Component (no need to pass props)
function Component2() {
  return (
    <div>
      <h2>Component 2</h2>
      <Component3 />
    </div>
  );
}

// Deep Component consuming context
function Component3() {
  // Step 3: Consume Context
  const user = useContext(UserContext);

  return (
    <div>
      <h3>Component 3</h3>
      <p>Hello {user} from deep component!</p>
    </div>
  );
}
```

## Advanced Examples

### Theme Context Example

```js
import { createContext, useContext, useState } from "react";

// Create Theme Context
const ThemeContext = createContext();

// Theme Provider Component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Component using theme
function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header
      style={{
        background: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#333" : "#fff",
      }}
    >
      <h1>My App</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "dark" : "light"} mode
      </button>
    </header>
  );
}

// Main App
function App() {
  return (
    <ThemeProvider>
      <Header />
      <main>Content goes here</main>
    </ThemeProvider>
  );
}
```

### Authentication Context Example

```js
import { createContext, useContext, useState } from "react";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // Simulate API call
      const userData = await loginAPI(email, password);
      setUser(userData);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Component using auth context
function LoginButton() {
  const { user, login, logout, isLoading } = useContext(AuthContext);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {user ? (
        <div>
          <span>Welcome, {user.name}!</span>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={() => login("test@example.com", "password")}>
          Login
        </button>
      )}
    </div>
  );
}

// App with Auth Provider
function App() {
  return (
    <AuthProvider>
      <LoginButton />
    </AuthProvider>
  );
}
```

### Multiple Context Values

```js
import { createContext, useContext } from "react";

// Create multiple contexts
const UserContext = createContext();
const ThemeContext = createContext();

function App() {
  return (
    <UserContext.Provider value="Alice">
      <ThemeContext.Provider value="dark">
        <Profile />
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

function Profile() {
  // Consume multiple contexts
  const user = useContext(UserContext);
  const theme = useContext(ThemeContext);

  return (
    <div
      style={{
        background: theme === "dark" ? "#333" : "#fff",
        color: theme === "dark" ? "#fff" : "#333",
      }}
    >
      <h1>User Profile</h1>
      <p>Welcome, {user}!</p>
      <p>Current theme: {theme}</p>
    </div>
  );
}
```

### Shopping Cart Context Example

```js

import { createContext, useContext, useReducer } from 'react';

// Create Cart Context
const CartContext = createContext();

// Cart Reducer
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];

    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.payload);

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
}

// Cart Provider
function CartProvider({ children }) {
const [cart, dispatch] = useReducer(cartReducer, []);

const addToCart = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
};

const removeFromCart = (productId) => {
dispatch({ type: 'REMOVE_ITEM', payload: productId });
};

const clearCart = () => {
dispatch({ type: 'CLEAR_CART' });
};

const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
const totalPrice = cart.reduce((sum, item) => sum + (item.price \* item.quantity), 0);

return (
<CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      totalItems,
      totalPrice
    }}>
{children}
</CartContext.Provider>
);
}

// Product Component
function Product({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div>
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}


// Cart Component
function Cart() {
  const { cart, removeFromCart, totalPrice, totalItems } =
    useContext(CartContext);

  return (
    <div>
      <h2>Shopping Cart ({totalItems} items)</h2>
      {cart.map((item) => (
        <div key={item.id}>
          <span>
            {item.name} - Qty: {item.quantity}
          </span>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <h3>Total: ${totalPrice.toFixed(2)}</h3>
    </div>
  );
}


```

## Custom Hook Pattern

Create custom hooks to encapsulate context logic and improve reusability:

```js
import { createContext, useContext, useState } from "react";

// Create context
const AuthContext = createContext();

// Auth Provider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

// Usage in component
function LoginButton() {
  const { user, login, logout } = useAuth();

  return (
    <button onClick={user ? logout : login}>{user ? "Logout" : "Login"}</button>
  );
}
```

## Important Concepts & Best Practices

### 1. Context Value Updates Trigger Re-renders

```js
// All components consuming this context will re-render when value changes
function App() {
  const [count, setCount] = useState(0);

  return (
    <CountContext.Provider value={{ count, setCount }}>
      <Child /> {/_ Will re-render when count changes _/}
    </CountContext.Provider>
  );
}
```

### 2. Avoid Creating New Objects in Render

```js
// ❌ Bad - Creates new object every render
function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Child />
    </UserContext.Provider>
  );
}

// ✅ Good - Memoize the value
function App() {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return (
    <UserContext.Provider value={value}>
      <Child />
    </UserContext.Provider>
  );
}
```

### 3. Provider Must Be Above Consumer

```js
// ❌ Wrong - useContext called outside provider
function App() {
  return (
    <div>
      <Component /> {/_ This won't work _/}
      <ThemeContext.Provider value="dark">
        <OtherComponent />
      </ThemeContext.Provider>
    </div>
  );
}

// ✅ Correct - useContext called inside provider
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Component /> {/_ This works _/}
    </ThemeContext.Provider>
  );
}
```

### 4. Default Values

```js
// Set default value when creating context
const ThemeContext = createContext("light"); // default value

// Component will use default if no provider found
function Component() {
  const theme = useContext(ThemeContext); // 'light' if no provider
  return <div>Theme: {theme}</div>;
}
```

## Common Patterns

### 1. Conditional Context Consumption

```js
function useOptionalAuth() {
  return useContext(AuthContext); // Can return null
}

function Component() {
  const auth = useOptionalAuth();

  if (!auth) {
    return <div>No auth context available</div>;
  }

  return <div>Logged in as {auth.user.name}</div>;
}
```

### 2. Multiple Providers

```js
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <MainApp />
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
```

### 3. Context with Reducer

```js
const StateContext = createContext();

function StateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
}
```

## When to Use useContext

### ✅ Good Use Cases:

- **Theme/styling** preferences
- **Authentication** state
- **Language/locale** settings
- **Shopping cart** state
- **User preferences**
- Data needed by many components

### ❌ Avoid for:

- **Frequent updates** (can cause performance issues)
- **Local component state** (use useState instead)
- **Props that only go 1-2 levels down**
- **Complex state logic** (consider useReducer instead)

## Performance Considerations

### 1. Split Contexts by Update Frequency

```js
// Separate frequently updated data from stable data
const UserContext = createContext(); // Stable user info
const UserActivityContext = createContext(); // Frequently updated activity
```

### 2. Use React.memo to Prevent Unnecessary Re-renders

```js
const ExpensiveComponent = React.memo(function ExpensiveComponent() {
  const theme = useContext(ThemeContext);
  return <div>Expensive computation here</div>;
});
```

## Key Takeaways

- **useContext** eliminates prop drilling for deeply nested components
- **Must be used with Provider** - context consumers must be wrapped in a Provider
- **Triggers re-renders** when context value changes
- **Best for global state** like themes, auth, user preferences
- **Create custom hooks** to encapsulate context logic
- **Avoid frequent updates** as they cause all consumers to re-render
- **Can have multiple contexts** in the same component
- **Provider must be above** the components that consume the context

## Context vs Props vs State Management

| Use Case            | Solution                    |
| ------------------- | --------------------------- |
| 1-2 levels down     | Props                       |
| 3+ levels down      | useContext                  |
| Complex state logic | useReducer + useContext     |
| Global app state    | Context or external library |
| Frequent updates    | External state management   |

---

_This guide covers all essential patterns and use cases for the useContext hook in React functional components._

```

You can now copy this complete markdown file for your useContext revision notes!

[1](https://blog.jimmydc.com/react-context-hooks/)
[2](https://react.dev/reference/react/useContext)
[3](https://www.w3schools.com/react/react_usecontext.asp)
[4](https://legacy.reactjs.org/docs/hooks-reference.html)
[5](https://dev.to/srishtikprasad/guide-to-react-hook-usecontext-3lp7)
[6](https://peerlist.io/blog/engineering/how-to-use-usecontext-hook-in-react)
[7](https://react.dev/learn/passing-data-deeply-with-context)
[8](https://legacy.reactjs.org/docs/context.html)
[9](https://react.dev/reference/react/hooks)
```
