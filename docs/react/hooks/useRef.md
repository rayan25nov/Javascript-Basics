# React Hooks Guide: useRef Hook

## What is useRef Hook?

The **useRef hook** is a React hook that lets you reference a value that's not needed for rendering. It returns a mutable ref object whose `.current` property is initialized to the passed argument and persists for the full lifetime of the component.

### Key Definitions from Multiple Sources:

- **React Official Documentation**: useRef is a React Hook that lets you reference a value that's not needed for rendering. It returns an object with a single property: current
- **W3Schools**: The useRef Hook allows you to persist values between renders. It can be used to store a mutable value that does not cause a re-render when updated
- **Hygraph**: The useRef Hook is a versatile tool for managing references, optimizing performance, and interacting directly with the Document Object Model (DOM)
- **Refine Dev**: The useRef hook is one of the built-in hooks in React. You can use it to persist or preserve values between re-renders

## Key Characteristics of useRef

1. **Persists values** between renders without causing re-renders
2. **Mutable object** - you can modify `.current` property directly
3. **Returns same object** reference across renders
4. **Does not trigger re-renders** when the value changes
5. **Direct DOM access** - can hold references to DOM elements

## Basic Syntax

```js
const ref = useRef(initialValue);
```

**Parameters:**

- **initialValue**: The value you want the ref object's current property to be initially (can be any type)

**Returns:**

- An object with a single `current` property set to the initial value

## Import Statement

```js
import { useRef } from "react";
```

## Basic Examples

### 1. Simple Value Storage

```js
import { useRef, useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);

  // This increments on every render but doesn't cause re-render
  renderCount.current += 1;

  return (
    <div>
      <p>Count: {count}</p>
      <p>Render count: {renderCount.current}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
    </div>
  );
}
```

### 2. DOM Element Access

```js
import { useRef, useEffect } from "react";

function FocusInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus the input element when component mounts
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="This input will be focused on mount"
      />
    </div>
  );
}
```

## Real-World Examples

### 1. Form Management and Validation

```js
import { useRef, useState } from "react";

function ContactForm() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!nameRef.current.value.trim()) {
      newErrors.name = "Name is required";
      nameRef.current.focus();
      return newErrors;
    }

    if (!emailRef.current.value.trim()) {
      newErrors.email = "Email is required";
      emailRef.current.focus();
      return newErrors;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailRef.current.value)) {
      newErrors.email = "Please enter a valid email";
      emailRef.current.focus();
      return newErrors;
    }

    if (!messageRef.current.value.trim()) {
      newErrors.message = "Message is required";
      messageRef.current.focus();
      return newErrors;
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Clear form
      nameRef.current.value = "";
      emailRef.current.value = "";
      messageRef.current.value = "";

      alert("Form submitted successfully!");
    } catch (error) {
      alert("Failed to submit form");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    nameRef.current.value = "";
    emailRef.current.value = "";
    messageRef.current.value = "";
    setErrors({});
    nameRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Contact Form</h2>

      <div>
        <label>
          Name:
          <input ref={nameRef} type="text" placeholder="Enter your name" />
          {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
        </label>
      </div>

      <div>
        <label>
          Email:
          <input ref={emailRef} type="email" placeholder="Enter your email" />
          {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
        </label>
      </div>

      <div>
        <label>
          Message:
          <textarea
            ref={messageRef}
            placeholder="Enter your message"
            rows={4}
          />
          {errors.message && (
            <span style={{ color: "red" }}>{errors.message}</span>
          )}
        </label>
      </div>

      <div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        <button type="button" onClick={handleClear}>
          Clear
        </button>
      </div>
    </form>
  );
}
```

### 2. Video Player Controller

```js
import { useRef, useState } from "react";

function VideoPlayer({ src }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    videoRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const handleFullscreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <video
        ref={videoRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        style={{ width: "100%", height: "auto" }}
      />

      <div style={{ padding: "10px", background: "#f0f0f0" }}>
        <div style={{ marginBottom: "10px" }}>
          <button onClick={handlePlayPause}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button onClick={handleFullscreen} style={{ marginLeft: "10px" }}>
            Fullscreen
          </button>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Progress: </label>
          <input
            type="range"
            min="0"
            max="100"
            value={duration ? (currentTime / duration) * 100 : 0}
            onChange={handleSeek}
            style={{ width: "60%" }}
          />
          <span style={{ marginLeft: "10px" }}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>

        <div>
          <label>Volume: </label>
          <input
            type="range"
            min="0"
            max="100"
            value={volume * 100}
            onChange={handleVolumeChange}
            style={{ width: "200px" }}
          />
          <span style={{ marginLeft: "10px" }}>
            {Math.round(volume * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}
```

### 3. Scroll Position Tracker

```js
import { useRef, useState, useEffect } from "react";

function ScrollTracker() {
  const scrollContainerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef.current;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;

      setScrollPosition(scrollTop);
      setIsAtTop(scrollTop === 0);
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 1);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    scrollContainerRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    scrollContainerRef.current.scrollTo({
      top: scrollContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const scrollToPosition = (position) => {
    scrollContainerRef.current.scrollTo({
      top: position,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <span>Scroll Position: {Math.round(scrollPosition)}px</span>
        <button
          onClick={scrollToTop}
          disabled={isAtTop}
          style={{ marginLeft: "10px" }}
        >
          Top
        </button>
        <button
          onClick={scrollToBottom}
          disabled={isAtBottom}
          style={{ marginLeft: "10px" }}
        >
          Bottom
        </button>
        <button
          onClick={() => scrollToPosition(500)}
          style={{ marginLeft: "10px" }}
        >
          Middle
        </button>
      </div>

      <div
        ref={scrollContainerRef}
        style={{
          height: "300px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "20px",
        }}
      >
        {Array.from({ length: 100 }, (_, i) => (
          <div
            key={i}
            style={{ padding: "10px", borderBottom: "1px solid #eee" }}
          >
            <h3>Item {i + 1}</h3>
            <p>
              This is some content for item {i + 1}. Lorem ipsum dolor sit amet.
            </p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "10px" }}>
        <p>At Top: {isAtTop ? "Yes" : "No"}</p>
        <p>At Bottom: {isAtBottom ? "Yes" : "No"}</p>
      </div>
    </div>
  );
}
```

### 4. Timer and Stopwatch

```js
import { useRef, useState, useEffect } from "react";

function TimerStopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("stopwatch"); // 'stopwatch' or 'timer'
  const [timerDuration, setTimerDuration] = useState(60);

  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const pausedTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - pausedTimeRef.current;

      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const elapsed = now - startTimeRef.current;

        if (mode === "stopwatch") {
          setTime(elapsed);
        } else {
          // Timer mode - count down
          const remaining = timerDuration * 1000 - elapsed;
          if (remaining <= 0) {
            setTime(0);
            setIsRunning(false);
            pausedTimeRef.current = 0;
            alert("Timer finished!");
          } else {
            setTime(remaining);
          }
        }
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, mode, timerDuration]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
    pausedTimeRef.current =
      mode === "stopwatch" ? time : timerDuration * 1000 - time;
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(mode === "stopwatch" ? 0 : timerDuration * 1000);
    pausedTimeRef.current = 0;
  };

  const handleModeChange = (newMode) => {
    handleReset();
    setMode(newMode);
    setTime(newMode === "stopwatch" ? 0 : timerDuration * 1000);
  };

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${ms.toString().padStart(2, "0")}`;
  };

  const handleTimerDurationChange = (e) => {
    const newDuration = parseInt(e.target.value);
    setTimerDuration(newDuration);
    if (mode === "timer" && !isRunning) {
      setTime(newDuration * 1000);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>{mode === "stopwatch" ? "Stopwatch" : "Timer"}</h2>

      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => handleModeChange("stopwatch")}
          style={{
            marginRight: "10px",
            backgroundColor: mode === "stopwatch" ? "#007bff" : "#f8f9fa",
            color: mode === "stopwatch" ? "white" : "black",
          }}
        >
          Stopwatch
        </button>
        <button
          onClick={() => handleModeChange("timer")}
          style={{
            backgroundColor: mode === "timer" ? "#007bff" : "#f8f9fa",
            color: mode === "timer" ? "white" : "black",
          }}
        >
          Timer
        </button>
      </div>

      {mode === "timer" && (
        <div style={{ marginBottom: "20px" }}>
          <label>
            Timer Duration (seconds):
            <input
              type="number"
              min="1"
              max="3600"
              value={timerDuration}
              onChange={handleTimerDurationChange}
              disabled={isRunning}
              style={{ marginLeft: "10px", width: "80px" }}
            />
          </label>
        </div>
      )}

      <div
        style={{
          fontSize: "48px",
          fontFamily: "monospace",
          marginBottom: "20px",
          color: mode === "timer" && time < 10000 ? "red" : "black",
        }}
      >
        {formatTime(time)}
      </div>

      <div>
        {!isRunning ? (
          <button
            onClick={handleStart}
            style={{ fontSize: "18px", padding: "10px 20px" }}
          >
            Start
          </button>
        ) : (
          <button
            onClick={handlePause}
            style={{ fontSize: "18px", padding: "10px 20px" }}
          >
            Pause
          </button>
        )}
        <button
          onClick={handleReset}
          style={{
            fontSize: "18px",
            padding: "10px 20px",
            marginLeft: "10px",
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
```

### 5. Previous Value Tracker

```js
import { useRef, useState, useEffect } from "react";

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

function SearchWithHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const previousSearchTerm = usePrevious(searchTerm);
  const searchHistoryRef = useRef([]);

  useEffect(() => {
    if (searchTerm && searchTerm !== previousSearchTerm) {
      // Add to search history
      if (!searchHistoryRef.current.includes(searchTerm)) {
        searchHistoryRef.current = [
          searchTerm,
          ...searchHistoryRef.current.slice(0, 9),
        ];
      }

      // Simulate search
      setIsLoading(true);

      setTimeout(() => {
        const mockResults = Array.from({ length: 5 }, (_, i) => ({
          id: i,
          title: `Result ${i + 1} for "${searchTerm}"`,
          description: `This is a mock search result for "${searchTerm}"`,
        }));

        setResults(mockResults);
        setIsLoading(false);
      }, 500);
    }
  }, [searchTerm, previousSearchTerm]);

  const handleSearchFromHistory = (term) => {
    setSearchTerm(term);
  };

  const clearHistory = () => {
    searchHistoryRef.current = [];
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>Search with History</h2>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter search term..."
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
          marginBottom: "20px",
        }}
      />

      {searchHistoryRef.current.length > 0 && (
        <div style={{ marginBottom: "20px" }}>
          <h3>Search History</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
            {searchHistoryRef.current.map((term, index) => (
              <button
                key={index}
                onClick={() => handleSearchFromHistory(term)}
                style={{
                  padding: "5px 10px",
                  background: "#e9ecef",
                  border: "none",
                  borderRadius: "15px",
                  cursor: "pointer",
                }}
              >
                {term}
              </button>
            ))}
          </div>
          <button
            onClick={clearHistory}
            style={{
              marginTop: "10px",
              background: "red",
              color: "white",
              border: "none",
              padding: "5px 10px",
            }}
          >
            Clear History
          </button>
        </div>
      )}

      {previousSearchTerm && (
        <p>
          Previous search: <em>{previousSearchTerm}</em>
        </p>
      )}

      {isLoading && <p>Searching...</p>}

      {results.length > 0 && (
        <div>
          <h3>Results for "{searchTerm}"</h3>
          {results.map((result) => (
            <div
              key={result.id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "10px",
              }}
            >
              <h4>{result.title}</h4>
              <p>{result.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

## Advanced Use Cases

### 1. Caching Expensive Calculations

```js
import { useRef, useState, useMemo } from "react";

function ExpensiveCalculator() {
  const [input, setInput] = useState("");
  const [triggerRecalculate, setTriggerRecalculate] = useState(0);

  const cacheRef = useRef({});
  const calculationCountRef = useRef(0);

  const expensiveResult = useMemo(() => {
    // Check cache first
    if (cacheRef.current[input]) {
      console.log("Retrieved from cache");
      return cacheRef.current[input];
    }

    // Perform expensive calculation
    console.log("Performing expensive calculation...");
    calculationCountRef.current += 1;

    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.sqrt(i) * parseInt(input || "1");
    }

    // Cache the result
    cacheRef.current[input] = result;

    return result;
  }, [input, triggerRecalculate]);

  const clearCache = () => {
    cacheRef.current = {};
    setTriggerRecalculate((prev) => prev + 1);
  };

  return (
    <div>
      <h3>Expensive Calculator with Caching</h3>
      <input
        type="number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a number"
      />

      <div>
        <p>Result: {expensiveResult.toFixed(2)}</p>
        <p>Calculations performed: {calculationCountRef.current}</p>
        <p>Cached results: {Object.keys(cacheRef.current).length}</p>
      </div>

      <button onClick={clearCache}>Clear Cache</button>
    </div>
  );
}
```

### 2. Component Instance Counter

```js
import { useRef } from "react";

// Global counter using useRef
let globalInstanceCounter = 0;

function InstanceTracker({ name }) {
  const instanceIdRef = useRef(null);

  // Assign unique ID only once
  if (instanceIdRef.current === null) {
    instanceIdRef.current = ++globalInstanceCounter;
  }

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        margin: "5px",
        background: `hsl(${instanceIdRef.current * 60}, 70%, 90%)`,
      }}
    >
      <h4>
        {name} (Instance #{instanceIdRef.current})
      </h4>
      <p>
        This component has a unique instance ID that persists across re-renders.
      </p>
    </div>
  );
}

function InstanceApp() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Re-render (Count: {count})
      </button>

      <InstanceTracker name="Component A" />
      <InstanceTracker name="Component B" />
      <InstanceTracker name="Component C" />
    </div>
  );
}
```

## Important Concepts & Best Practices

### 1. When to Use useRef

✅ **Good Use Cases:**

- **Accessing DOM elements** (focus, scroll, measurements)
- **Storing mutable values** that don't trigger re-renders
- **Keeping references** to intervals, timeouts, or subscriptions
- **Caching expensive calculations** between renders
- **Tracking previous values** of props or state
- **Integrating with third-party libraries** that need DOM references

❌ **Avoid useRef for:**

- **Values that should trigger re-renders** (use useState instead)
- **Rendering data** (use state or props)
- **Complex state logic** (use useReducer instead)
- **Shared data between components** (use Context or props)

### 2. useRef vs useState Comparison

| Feature                      | useRef            | useState             |
| ---------------------------- | ----------------- | -------------------- |
| **Triggers re-render**       | No                | Yes                  |
| **Mutable**                  | Yes (`.current`)  | No (requires setter) |
| **Persists between renders** | Yes               | Yes                  |
| **Initial value**            | Any type          | Any type             |
| **Access pattern**           | `ref.current`     | Direct variable      |
| **Use case**                 | Side effects, DOM | UI state             |

### 3. Common Mistakes to Avoid

#### Don't Read/Write During Render

```js
// ❌ Bad - Reading ref during render
function BadComponent() {
  const countRef = useRef(0);

  // Don't do this - unpredictable behavior
  countRef.current += 1;

  return <div>Count: {countRef.current}</div>;
}

// ✅ Good - Use in event handlers or effects
function GoodComponent() {
  const countRef = useRef(0);
  const [, forceRender] = useState({});

  const handleIncrement = () => {
    countRef.current += 1;
    forceRender({}); // Force re-render to show new value
  };

  return (
    <div>
      <div>Count: {countRef.current}</div>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}
```

#### Don't Depend on Ref Values in useEffect

```js
// ❌ Bad - Ref changes don't trigger useEffect
function BadComponent() {
  const valueRef = useRef(0);

  useEffect(() => {
    console.log("Value changed:", valueRef.current);
  }, [valueRef.current]); // This won't work as expected
}

// ✅ Good - Use state for values that trigger effects
function GoodComponent() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    console.log("Value changed:", value);
  }, [value]); // This works correctly
}
```

### 4. Cleaning Up Refs

```js
function ComponentWithCleanup() {
  const intervalRef = useRef(null);
  const subscriptionRef = useRef(null);

  useEffect(() => {
    // Set up interval
    intervalRef.current = setInterval(() => {
      console.log("Interval tick");
    }, 1000);

    // Set up subscription
    subscriptionRef.current = someAPI.subscribe((data) => {
      console.log("Data received:", data);
    });

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
    };
  }, []);

  return <div>Component with cleanup</div>;
}
```

## useRef vs createRef

### Differences:

| Feature                 | useRef                     | createRef              |
| ----------------------- | -------------------------- | ---------------------- |
| **Component Type**      | Function components        | Class components       |
| **Reference Stability** | Same object across renders | New object each render |
| **Initial Value**       | Can set initial value      | Always starts as null  |
| **Usage**               | Modern React (16.8+)       | Legacy React           |

```js
// useRef (Function Components)
function ModernComponent() {
  const ref = useRef(null);
  return <input ref={ref} />;
}

// createRef (Class Components)
class LegacyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  render() {
    return <input ref={this.ref} />;
  }
}
```

## Key Takeaways

- **useRef** provides a way to persist mutable values between renders
- **Does not trigger re-renders** when the value changes
- **Perfect for DOM manipulation** and storing mutable references
- **Use for side effects** like timers, subscriptions, and third-party integrations
- **Avoid reading/writing during render** - use in event handlers and effects
- **Great for caching** and tracking previous values
- **Don't use for UI state** that needs to trigger re-renders
- **Clean up properly** to prevent memory leaks

## Common Patterns Summary

1. **DOM Access**: Focus, scroll, measurements
2. **Timers**: setInterval, setTimeout references
3. **Previous Values**: Tracking state/prop changes
4. **Caching**: Expensive calculations or API responses
5. **Third-party Integration**: Libraries that need DOM nodes
6. **Instance Variables**: Component-specific data that persists
7. **Event Listeners**: Storing cleanup functions

---

_This guide covers all essential patterns and use cases for the useRef hook in React functional components._

```


[1](https://react.dev/reference/react/useRef)
[2](https://www.w3schools.com/react/react_useref.asp)
[3](https://legacy.reactjs.org/docs/hooks-reference.html)
[4](https://hygraph.com/blog/react-useref-a-complete-guide)
[5](https://dev.to/opensauced/the-react-useref-hook-not-just-for-html-elements-3cf3)
[6](https://refine.dev/blog/react-useref-hook-and-ref/)
[7](https://peerlist.io/blog/engineering/reactjs-useref-hook)
[8](https://react.dev/reference/react/hooks)
```
