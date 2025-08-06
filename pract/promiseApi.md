# JavaScript Promise API Guide 🚀

A comprehensive guide to understanding and using JavaScript's Promise static methods.

_Based on concepts from "Namaste JavaScript" by Akshay Saini and hands-on examples_

## Promise Terminology 📚

Before diving into the APIs, let's understand the correct terminology (as explained in Namaste JavaScript):

- **Settled**: A promise that has either resolved or rejected (completed its execution)
- **Fulfilled**: A promise that has resolved successfully
- **Rejected**: A promise that has failed with an error
- **Pending**: A promise that is still in progress (not yet settled)

Understanding these terms is crucial for technical interviews and proper JavaScript communication.

## Overview

JavaScript provides four main Promise static methods that help you work with multiple promises simultaneously. Each method has different behavior and use cases:

- **Promise.all()** - Wait for all promises to resolve (parallel API calls)
- **Promise.allSettled()** - Wait for all promises to settle (resolve or reject)
- **Promise.race()** - Get the first promise to settle (fastest wins)
- **Promise.any()** - Get the first promise to resolve (first success wins)

_As Akshay Saini explains in Namaste JavaScript, these APIs are essential for handling multiple asynchronous operations efficiently._

## Promise.all() 📋

**Behavior**: Waits for ALL promises to resolve. **Fails fast** if ANY promise rejects.

**Use Case**: Making multiple parallel API calls where all must succeed (as emphasized in Namaste JavaScript).

```javascript
// All must succeed - perfect for parallel API calls
Promise.all([promise1, promise2, promise3])
  .then((results) => {
    // Array of all results in order
    console.log(results); // ["result1", "result2", "result3"]
  })
  .catch((error) => {
    // First error that occurred (fail fast behavior)
    console.log(error.message);
  });
```

**Returns**:

- **Success**: Array of all results in the same order as input promises
- **Failure**: First error encountered (fails fast - key concept from Namaste JS)

**Real-world example**: Loading user profile, settings, and permissions - all are required for the page to work.

## Promise.allSettled() 📊

**Behavior**: Waits for ALL promises to **settle** (resolve OR reject). Never rejects itself.

**Use Case**: When you want to know the outcome of all promises, regardless of individual success/failure (as explained in Namaste JavaScript).

```javascript
// Get all results, successes and failures
Promise.allSettled([promise1, promise2, promise3]).then((results) => {
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`Promise ${index}: Success - ${result.value}`);
    } else {
      console.log(`Promise ${index}: Failed - ${result.reason}`);
    }
  });
});
```

**Returns**: Always an array of objects with:

- `{status: 'fulfilled', value: result}` for successful promises
- `{status: 'rejected', reason: error}` for failed promises

**Key Point**: This API will **never fail** - it always returns results for all promises.

**Real-world example**: Health checks for multiple services - you want to know the status of each service.

## Promise.race() 🏁

**Behavior**: Returns the first promise to **settle** (resolve OR reject). It's literally a "race" between promises.

**Use Case**: When you want the fastest response or need to implement timeouts (as demonstrated in Namaste JavaScript).

```javascript
// First to finish wins (success or failure) - it's a race!
Promise.race([promise1, promise2, promise3])
  .then((result) => {
    console.log("First to resolve:", result);
  })
  .catch((error) => {
    console.log("First to reject:", error.message);
  });
```

**Returns**: The result (success or failure) of whichever promise settles first.

**Important**: The "winner" can be either a success OR a failure - whoever finishes first!

**Real-world examples**:

- Implementing request timeouts
- Getting data from the fastest mirror/CDN
- User interaction races (first button click wins)

## Promise.any() 🎯

**Behavior**: Returns the first promise to **RESOLVE** (succeed). Ignores rejections until it finds a successful one.

**Use Case**: When you have multiple sources and only need one to succeed (seeking first success, as explained in Namaste JavaScript).

```javascript
// First success wins, ignores failures
Promise.any([promise1, promise2, promise3])
  .then((result) => {
    console.log("First success:", result);
  })
  .catch((error) => {
    // AggregateError - all promises failed
    console.log("All failed:", error.message);
    console.log("Individual errors:", error.errors);
  });
```

**Returns**:

- **Success**: First successful result (ignores any rejections before it)
- **Failure**: **AggregateError** containing all rejection reasons (only if ALL promises reject)

**Key Difference from Promise.race()**:

- `race()` returns first to settle (success OR failure)
- `any()` returns first to succeed (ignores failures until all fail)

**Real-world example**: Trying multiple API endpoints - you only need one to respond successfully.

## Comparison Table

| Method                 | Wait For         | Fails When      | Returns                         | Use Case                    |
| ---------------------- | ---------------- | --------------- | ------------------------------- | --------------------------- |
| `Promise.all()`        | All to resolve   | Any rejects     | Array of results OR first error | All operations must succeed |
| `Promise.allSettled()` | All to settle    | Never fails     | Array of status objects         | Need all outcomes           |
| `Promise.race()`       | First to settle  | First rejection | First result OR first error     | Need fastest response       |
| `Promise.any()`        | First to resolve | All reject      | First success OR AggregateError | Need any one success        |

## Practical Examples

### Loading Multiple Resources (Promise.all)

```javascript
const loadUserData = async () => {
  try {
    const [profile, settings, permissions] = await Promise.all([
      fetchUserProfile(),
      fetchUserSettings(),
      fetchUserPermissions(),
    ]);

    // All data loaded successfully
    renderUserDashboard({ profile, settings, permissions });
  } catch (error) {
    // Any one failed - show error page
    showErrorPage(error.message);
  }
};
```

### Service Health Dashboard (Promise.allSettled)

```javascript
const checkServiceHealth = async () => {
  const services = ["api", "database", "cache", "queue"];

  const results = await Promise.allSettled(
    services.map((service) => checkService(service))
  );

  results.forEach((result, index) => {
    const serviceName = services[index];
    if (result.status === "fulfilled") {
      updateServiceStatus(serviceName, "healthy", result.value);
    } else {
      updateServiceStatus(serviceName, "unhealthy", result.reason);
    }
  });
};
```

### Request with Timeout (Promise.race)

```javascript
const fetchWithTimeout = (url, timeoutMs = 5000) => {
  const fetchPromise = fetch(url);
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Request timeout")), timeoutMs)
  );

  return Promise.race([fetchPromise, timeoutPromise]);
};
```

### Fallback API Endpoints (Promise.any)

```javascript
const fetchDataFromBestEndpoint = () => {
  const endpoints = [
    "https://api-primary.com/data",
    "https://api-backup.com/data",
    "https://api-fallback.com/data",
  ];

  return Promise.any(endpoints.map((url) => fetch(url).then((r) => r.json())));
};
```

## Best Practices

1. **Choose the right method** based on your specific needs
2. **Handle errors appropriately** - each method has different error behaviors
3. **Consider performance** - Promise.all fails fast, while allSettled waits for everything
4. **Use timeouts with race** for better user experience
5. **Provide fallbacks** when using Promise.any

## Interview Questions & Key Points 🎯

_Based on common JavaScript interview scenarios and Namaste JavaScript teachings:_

**Q1: What's the difference between Promise.race() and Promise.any()?**

- `Promise.race()`: First to **settle** (success OR failure)
- `Promise.any()`: First to **succeed** (ignores failures)

**Q2: What happens when all promises fail in Promise.all() vs Promise.any()?**

- `Promise.all()`: Fails on first rejection (fail fast)
- `Promise.any()`: Returns AggregateError only when ALL fail

**Q3: Which Promise API never rejects?**

- `Promise.allSettled()` - always returns results, never rejects

**Q4: What is "fail fast" behavior?**

- `Promise.all()` immediately rejects when the first promise fails, without waiting for others

**Q5: What's an AggregateError?**

- Special error type returned by `Promise.any()` containing all individual errors when all promises fail

## Aggregate Error Details

When `Promise.any()` fails (all promises reject), it returns an `AggregateError`:

```javascript
Promise.any([rejectedPromise1, rejectedPromise2]).catch((aggregateError) => {
  console.log(aggregateError.message); // "All promises were rejected"
  console.log(aggregateError.errors); // Array of individual errors

  // Access individual errors
  aggregateError.errors.forEach((error, index) => {
    console.log(`Error ${index}:`, error.message);
  });
});
```

## Common Gotchas & Important Notes ⚠️

- **Promise.all** fails immediately on first rejection - other promises keep running in background
- **Promise.race** can resolve OR reject first - handle both cases properly
- **Promise.any** only available in modern environments (ES2021)
- **AggregateError** from Promise.any contains an `errors` array property
- Understanding **settled vs fulfilled vs rejected** terminology is crucial for interviews
- **Parallel execution**: All these APIs run promises in parallel, not sequentially

## Browser Support

- **Promise.all()**: ✅ All modern browsers
- **Promise.allSettled()**: ✅ ES2020+ (widely supported)
- **Promise.race()**: ✅ All modern browsers
- **Promise.any()**: ✅ ES2021+ (check compatibility for older browsers)

---

## References & Further Learning 📚

- **Namaste JavaScript** by Akshay Saini: [Promise APIs + Interview Questions](https://youtu.be/DlTVt1rZjIo)
- **MDN Web Docs**: Promise API Documentation
- **JavaScript.info**: Promises, async/await

_Happy coding with Promises! 🎉_

_"Understanding Promise APIs is essential for modern JavaScript development and technical interviews!"_ - Key takeaway from Namaste JavaScript
