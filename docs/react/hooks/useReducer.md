# React Hooks Guide: useReducer Hook

## What is useReducer Hook?

The **useReducer hook** is a React hook that lets you add a reducer to your component. It's an alternative to useState that's better suited for managing complex state logic that involves multiple sub-values or when the next state depends on the previous one.

### Key Definitions from Multiple Sources:

- **React Official Documentation**: useReducer is a React Hook that lets you add a reducer to your component. It accepts a reducer function as its first parameter and the initial state as the second
- **W3Schools**: The useReducer Hook is similar to the useState Hook. It allows for custom state logic. If you find yourself keeping track of multiple pieces of state that rely on complex logic, useReducer may be useful
- **LogRocket**: The useReducer Hook is used to store and update states, just like the useState Hook, but it's designed to handle more complex state changes more efficiently
- **Telerik**: useReducer is intended to handle more complex state changes more efficiently by providing a reducer function and a dispatch function to trigger state changes

## Basic Syntax

```js
const [state, dispatch] = useReducer(reducer, initialState, init?)
```

**Parameters:**

- **reducer**: A function that specifies how the state gets updated
- **initialState**: The initial state value
- **init**: Optional function to initialize state lazily

**Returns:**

- **state**: The current state value
- **dispatch**: Function to dispatch actions to update state

## Import Statement

```js
import { useReducer } from "react";
```

## How useReducer Works

1. **Define Reducer Function**: Create a pure function that takes current state and action, returns new state
2. **Initialize State**: Pass initial state to useReducer
3. **Dispatch Actions**: Use dispatch function to send actions to reducer
4. **State Updates**: Reducer calculates new state based on action, React re-renders component

## Basic Example: Counter

```js
import { useReducer } from "react";

// Step 1: Define reducer function
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      throw new Error("Unknown action type");
  }
}

// Step 2: Define initial state
const initialState = { count: 0 };

function Counter() {
  // Step 3: Use useReducer hook
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+1</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-1</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}
```

## Advanced Examples

### Todo List Application

```js
import { useReducer, useState } from "react";

// Action types
const ADD_TODO = "ADD_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const DELETE_TODO = "DELETE_TODO";
const EDIT_TODO = "EDIT_TODO";

// Initial state
const initialState = {
  todos: [],
  nextId: 1,
};

// Reducer function
function todoReducer(state, action) {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: state.nextId,
            text: action.payload,
            completed: false,
          },
        ],
        nextId: state.nextId + 1,
      };

    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        ),
      };

    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim()) {
      dispatch({ type: ADD_TODO, payload: inputValue });
      setInputValue("");
    }
  };

  return (
    <div>
      <h1>Todo App</h1>

      <div>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add new todo"
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>

      <ul>
        {state.todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
              onClick={() => dispatch({ type: TOGGLE_TODO, payload: todo.id })}
            >
              {todo.text}
            </span>
            <button
              onClick={() => dispatch({ type: DELETE_TODO, payload: todo.id })}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <p>Total todos: {state.todos.length}</p>
      <p>Completed: {state.todos.filter((t) => t.completed).length}</p>
    </div>
  );
}
```

### Form Management Example

```js
import { useReducer } from "react";

// Initial form state
const initialFormState = {
  name: "",
  email: "",
  age: "",
  errors: {},
  isSubmitting: false,
  isSubmitted: false,
};

// Action types
const FORM_ACTIONS = {
  UPDATE_FIELD: "UPDATE_FIELD",
  SET_ERROR: "SET_ERROR",
  CLEAR_ERRORS: "CLEAR_ERRORS",
  SUBMIT_START: "SUBMIT_START",
  SUBMIT_SUCCESS: "SUBMIT_SUCCESS",
  SUBMIT_ERROR: "SUBMIT_ERROR",
  RESET_FORM: "RESET_FORM",
};

// Reducer function
function formReducer(state, action) {
  switch (action.type) {
    case FORM_ACTIONS.UPDATE_FIELD:
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: "" },
      };

    case FORM_ACTIONS.SET_ERROR:
      return {
        ...state,
        errors: { ...state.errors, ...action.errors },
      };

    case FORM_ACTIONS.CLEAR_ERRORS:
      return {
        ...state,
        errors: {},
      };

    case FORM_ACTIONS.SUBMIT_START:
      return {
        ...state,
        isSubmitting: true,
        errors: {},
      };

    case FORM_ACTIONS.SUBMIT_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
        isSubmitted: true,
      };

    case FORM_ACTIONS.SUBMIT_ERROR:
      return {
        ...state,
        isSubmitting: false,
        errors: action.errors,
      };

    case FORM_ACTIONS.RESET_FORM:
      return initialFormState;

    default:
      return state;
  }
}

function UserForm() {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  const updateField = (field, value) => {
    dispatch({
      type: FORM_ACTIONS.UPDATE_FIELD,
      field,
      value,
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!state.name.trim()) {
      errors.name = "Name is required";
    }

    if (!state.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(state.email)) {
      errors.email = "Email is invalid";
    }

    if (!state.age) {
      errors.age = "Age is required";
    } else if (state.age < 18) {
      errors.age = "Must be 18 or older";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      dispatch({
        type: FORM_ACTIONS.SET_ERROR,
        errors,
      });
      return;
    }

    dispatch({ type: FORM_ACTIONS.SUBMIT_START });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      dispatch({ type: FORM_ACTIONS.SUBMIT_SUCCESS });
    } catch (error) {
      dispatch({
        type: FORM_ACTIONS.SUBMIT_ERROR,
        errors: { general: "Failed to submit form" },
      });
    }
  };

  if (state.isSubmitted) {
    return (
      <div>
        <h2>Form Submitted Successfully!</h2>
        <button onClick={() => dispatch({ type: FORM_ACTIONS.RESET_FORM })}>
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>User Registration</h2>

      <div>
        <label>
          Name:
          <input
            type="text"
            value={state.name}
            onChange={(e) => updateField("name", e.target.value)}
          />
          {state.errors.name && (
            <span className="error">{state.errors.name}</span>
          )}
        </label>
      </div>

      <div>
        <label>
          Email:
          <input
            type="email"
            value={state.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
          {state.errors.email && (
            <span className="error">{state.errors.email}</span>
          )}
        </label>
      </div>

      <div>
        <label>
          Age:
          <input
            type="number"
            value={state.age}
            onChange={(e) => updateField("age", parseInt(e.target.value))}
          />
          {state.errors.age && (
            <span className="error">{state.errors.age}</span>
          )}
        </label>
      </div>

      {state.errors.general && (
        <div className="error">{state.errors.general}</div>
      )}

      <button type="submit" disabled={state.isSubmitting}>
        {state.isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
```

### Shopping Cart Example

```js
import { useReducer } from "react";

// Initial state
const initialCartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

// Action types
const CART_ACTIONS = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  CLEAR_CART: "CLEAR_CART",
};

// Reducer function
function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItem = state.items.find(
        (item) => item.id === action.item.id
      );

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === action.item.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );

        return calculateTotals({
          ...state,
          items: updatedItems,
        });
      } else {
        const newItems = [...state.items, { ...action.item, quantity: 1 }];

        return calculateTotals({
          ...state,
          items: newItems,
        });
      }
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const filteredItems = state.items.filter(
        (item) => item.id !== action.itemId
      );

      return calculateTotals({
        ...state,
        items: filteredItems,
      });
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      if (action.quantity <= 0) {
        return cartReducer(state, {
          type: CART_ACTIONS.REMOVE_ITEM,
          itemId: action.itemId,
        });
      }

      const updatedItems = state.items.map((item) =>
        item.id === action.itemId
          ? { ...item, quantity: action.quantity }
          : item
      );

      return calculateTotals({
        ...state,
        items: updatedItems,
      });
    }

    case CART_ACTIONS.CLEAR_CART:
      return initialCartState;

    default:
      return state;
  }
}

// Helper function to calculate totals
function calculateTotals(state) {
  const itemCount = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return {
    ...state,
    itemCount,
    total: Math.round(total * 100) / 100,
  };
}

function ShoppingCart() {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

  // Sample products
  const products = [
    { id: 1, name: "Laptop", price: 999.99 },
    { id: 2, name: "Phone", price: 699.99 },
    { id: 3, name: "Headphones", price: 199.99 },
  ];

  const addToCart = (product) => {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      item: product,
    });
  };

  const removeFromCart = (itemId) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      itemId,
    });
  };

  const updateQuantity = (itemId, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      itemId,
      quantity,
    });
  };

  return (
    <div>
      <h2>Shopping Cart</h2>

      <div>
        <h3>Products</h3>
        {products.map((product) => (
          <div key={product.id}>
            <span>
              {product.name} - ${product.price}
            </span>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <div>
        <h3>Cart ({cartState.itemCount} items)</h3>
        {cartState.items.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <>
            {cartState.items.map((item) => (
              <div key={item.id}>
                <span>{item.name}</span>
                <input
                  type="number"
                  min="0"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value))
                  }
                />
                <span>${(item.price * item.quantity).toFixed(2)}</span>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            ))}

            <div>
              <strong>Total: ${cartState.total}</strong>
            </div>

            <button onClick={() => dispatch({ type: CART_ACTIONS.CLEAR_CART })}>
              Clear Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
}
```

## useReducer with useContext

Combining useReducer with useContext for global state management:

```js
import { createContext, useContext, useReducer } from "react";

// Create context
const AppStateContext = createContext();

// Initial state
const initialState = {
  user: null,
  theme: "light",
  notifications: [],
};

// Action types
const APP_ACTIONS = {
  SET_USER: "SET_USER",
  TOGGLE_THEME: "TOGGLE_THEME",
  ADD_NOTIFICATION: "ADD_NOTIFICATION",
  REMOVE_NOTIFICATION: "REMOVE_NOTIFICATION",
};

// Reducer
function appReducer(state, action) {
  switch (action.type) {
    case APP_ACTIONS.SET_USER:
      return { ...state, user: action.user };

    case APP_ACTIONS.TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };

    case APP_ACTIONS.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.notification],
      };

    case APP_ACTIONS.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notif) => notif.id !== action.id
        ),
      };

    default:
      return state;
  }
}

// Provider component
function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
}

// Custom hook to use app state
function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within AppProvider");
  }
  return context;
}

// Component using the state
function Header() {
  const { state, dispatch } = useAppState();

  const toggleTheme = () => {
    dispatch({ type: APP_ACTIONS.TOGGLE_THEME });
  };

  return (
    <header
      style={{
        background: state.theme === "light" ? "#fff" : "#333",
        color: state.theme === "light" ? "#333" : "#fff",
      }}
    >
      <h1>My App</h1>
      <button onClick={toggleTheme}>
        Switch to {state.theme === "light" ? "dark" : "light"} theme
      </button>
      {state.user && <span>Welcome, {state.user.name}!</span>}
    </header>
  );
}
```

## Lazy Initialization

Use the third parameter for expensive initial state calculations:

```js
// Expensive initialization function
function initializeState(initialArg) {
  // Expensive computation here
  return {
    count: initialArg,
    history: [],
    lastUpdated: new Date(),
  };
}

function Counter({ initialCount }) {
  // The initializeState function only runs on initial render
  const [state, dispatch] = useReducer(reducer, initialCount, initializeState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <p>Last updated: {state.lastUpdated.toLocaleString()}</p>
    </div>
  );
}
```

## useState vs useReducer Comparison

### When to use useState:

- **Simple state** (single value, boolean, string)
- **Independent state updates**
- **Few state transitions**
- **State doesn't depend on previous state**

```js
// Good for useState
const [name, setName] = useState("");
const [isOpen, setIsOpen] = useState(false);
```

### When to use useReducer:

- **Complex state** (objects with multiple properties)
- **Multiple related state updates**
- **State transitions depend on previous state**
- **Complex update logic**

```js
// Good for useReducer
const [state, dispatch] = useReducer(reducer, {
  items: [],
  filter: "all",
  isLoading: false,
  error: null,
});
```

## Important Concepts & Best Practices

### 1. Pure Reducer Functions

Reducers must be pure functions - same input always produces same output:

```js
// ✅ Good - Pure function
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    default:
      return state;
  }
}

// ❌ Bad - Impure function (side effects)
function badReducer(state, action) {
  console.log("Action:", action); // Side effect!
  fetch("/api/log", { method: "POST" }); // Side effect!
  return { count: state.count + 1 };
}
```

### 2. Don't Mutate State

Always return new state objects:

```js
// ❌ Bad - Mutating state
function badReducer(state, action) {
  state.count++; // Mutating existing state
  return state;
}

// ✅ Good - Creating new state
function goodReducer(state, action) {
  return { ...state, count: state.count + 1 };
}
```

### 3. Action Objects Structure

Use consistent action structure with type and payload:

```js
// ✅ Good action structure
dispatch({
  type: "UPDATE_USER",
  payload: { name: "John", age: 30 },
});

// ✅ Alternative structure
dispatch({
  type: "ADD_ITEM",
  item: { id: 1, name: "Product" },
  quantity: 2,
});
```

### 4. Handle Default Cases

Always include a default case in your reducer:

```js
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
    // or return state; for graceful handling
  }
}
```

## Key Takeaways

- **useReducer** is ideal for complex state logic and multiple related state updates
- **Reducer functions** must be pure - no side effects or mutations
- **Actions** describe what happened, reducers specify how state changes
- **dispatch** function is stable and won't cause re-renders when passed as prop
- **Combine with useContext** for global state management
- **Use lazy initialization** for expensive initial state calculations
- **Always handle default cases** in reducer switch statements
- **Choose useReducer over useState** when state logic becomes complex

## Performance Benefits

- **Stable dispatch function** - doesn't change between re-renders
- **Predictable state updates** - all logic centralized in reducer
- **Easier testing** - pure reducer functions are easy to test
- **Better debugging** - action history provides clear state change trail

---

_This guide covers all essential patterns and use cases for the useReducer hook in React functional components._

```
[1](https://react.dev/reference/react/useReducer)
[2](https://legacy.reactjs.org/docs/hooks-reference.html)
[3](https://www.w3schools.com/react/react_usereducer.asp)
[4](https://react.dev/reference/react/hooks)
[5](https://www.telerik.com/blogs/react-usereducer-hook)
[6](https://dev.to/craigaholliday/using-the-usereducer-hook-in-react-with-typescript-27m1)
[7](https://blog.logrocket.com/react-usereducer-hook-ultimate-guide/)
[8](https://pnp.github.io/blog/post/how-to-use-the-usereducer-hook-for-managing-complex-state-in-spfx-projects-step-by-step-guide/)
[9](https://javascript.plainenglish.io/using-usereducer-for-forms-in-react-d80f297cfc0a)
```
