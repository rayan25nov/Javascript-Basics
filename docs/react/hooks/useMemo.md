# React Hooks Guide: useMemo Hook

## What is useMemo Hook?

The **useMemo hook** is a React hook that lets you cache the result of a calculation between re-renders. It returns a memoized value and helps optimize performance by preventing expensive computations from being re-executed unnecessarily during component re-renders.

### Key Definitions from Multiple Sources:

- **React Official Documentation**: useMemo is a React Hook that lets you cache the result of a calculation between re-renders. It returns the cached value unless dependencies change
- **W3Schools**: The React useMemo Hook returns a memoized value. Think of memoization as caching a value so that it does not need to be recalculated
- **GeeksforGeeks**: The useMemo Hook is a built-in React Hook that helps optimize performance by memoizing the result of a computation and reusing it unless its dependencies change
- **FreeCodeCamp**: useMemo is a valuable tool in the React framework, designed to optimize performance by memoizing expensive computations

## What is Memoization?

**Memoization** is a technique where you cache the results of expensive function calls and return the cached result when the same inputs occur again. In React context, this means:

- **Avoiding recalculation** of expensive operations on every render
- **Caching computed values** until their dependencies change
- **Improving performance** by reducing unnecessary work

## Basic Syntax

```js
const memoizedValue = useMemo(() => {
  return expensiveCalculation(a, b);
}, [a, b]);
```

**Parameters:**

- **Function**: The first argument - a function that returns the computed value
- **Dependencies**: The second argument - an array of dependencies that trigger recalculation

**Returns:**

- The memoized value (cached result of the computation)

## Import Statement

```js
import { useMemo } from "react";
```

## Basic Example: Expensive Calculation

```js
import { useState, useMemo } from "react";

function ExpensiveComponent({ items }) {
  const [multiplier, setMultiplier] = useState(1);
  const [count, setCount] = useState(0);

  // Without useMemo - runs on every render
  // const expensiveValue = calculateExpensiveValue(items);

  // With useMemo - only runs when 'items' changes
  const expensiveValue = useMemo(() => {
    console.log("Calculating expensive value...");
    return calculateExpensiveValue(items);
  }, [items]);

  return (
    <div>
      <h3>Expensive Value: {expensiveValue}</h3>
      <p>Multiplier: {multiplier}</p>
      <p>Count: {count}</p>

      <button onClick={() => setMultiplier(multiplier + 1)}>
        Increase Multiplier
      </button>
      <button onClick={() => setCount(count + 1)}>Increase Count</button>
    </div>
  );
}

function calculateExpensiveValue(items) {
  // Simulate expensive calculation
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += items.length * Math.random();
  }
  return Math.floor(result);
}
```

**Explanation**: The expensive calculation only runs when `items` changes, not when `multiplier` or `count` change.

## Real-World Examples

### 1. Data Processing and Filtering

```js
import { useState, useMemo } from "react";

function ProductList({ products }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Memoize filtered and sorted products
  const processedProducts = useMemo(() => {
    console.log("Processing products...");

    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (category !== "all") {
      filtered = filtered.filter((product) => product.category === category);
    }

    // Sort products
    filtered.sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "price") {
        return a.price - b.price;
      }
      return 0;
    });

    return filtered;
  }, [products, searchTerm, category, sortBy]);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
        </select>
      </div>

      <div>
        <h3>Products ({processedProducts.length})</h3>
        {processedProducts.map((product) => (
          <div key={product.id}>
            <h4>{product.name}</h4>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 2. Complex Mathematical Calculations

```js
import { useState, useMemo } from "react";

function StatisticsCalculator({ data }) {
  const [precision, setPrecision] = useState(2);

  const statistics = useMemo(() => {
    console.log("Calculating statistics...");

    if (!data || data.length === 0) {
      return { mean: 0, median: 0, mode: 0, standardDeviation: 0 };
    }

    // Mean
    const sum = data.reduce((acc, val) => acc + val, 0);
    const mean = sum / data.length;

    // Median
    const sorted = [...data].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median =
      sorted.length % 2 === 0
        ? (sorted[mid - 1] + sorted[mid]) / 2
        : sorted[mid];

    // Mode
    const frequency = {};
    data.forEach((val) => {
      frequency[val] = (frequency[val] || 0) + 1;
    });
    const mode = Object.keys(frequency).reduce((a, b) =>
      frequency[a] > frequency[b] ? a : b
    );

    // Standard Deviation
    const variance =
      data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / data.length;
    const standardDeviation = Math.sqrt(variance);

    return {
      mean: parseFloat(mean.toFixed(precision)),
      median: parseFloat(median.toFixed(precision)),
      mode: parseFloat(mode),
      standardDeviation: parseFloat(standardDeviation.toFixed(precision)),
    };
  }, [data, precision]);

  return (
    <div>
      <h3>Statistics</h3>
      <div>
        <label>
          Precision:
          <input
            type="number"
            min="0"
            max="10"
            value={precision}
            onChange={(e) => setPrecision(parseInt(e.target.value))}
          />
        </label>
      </div>

      <div>
        <p>Mean: {statistics.mean}</p>
        <p>Median: {statistics.median}</p>
        <p>Mode: {statistics.mode}</p>
        <p>Standard Deviation: {statistics.standardDeviation}</p>
      </div>
    </div>
  );
}
```

### 3. Formatted Data Display

```js
import { useMemo } from "react";

function UserProfile({ user, preferences }) {
  // Memoize formatted user data
  const formattedUser = useMemo(() => {
    console.log("Formatting user data...");

    return {
      fullName: `${user.firstName} ${user.lastName}`,
      formattedBirthDate: new Date(user.birthDate).toLocaleDateString(
        preferences.locale,
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      ),
      age: Math.floor((Date.now() - new Date(user.birthDate)) / 31557600000),
      displayEmail: preferences.showEmail ? user.email : "Hidden",
      membershipDuration: calculateMembershipDuration(user.joinDate),
      formattedSalary:
        user.salary?.toLocaleString(preferences.locale, {
          style: "currency",
          currency: preferences.currency,
        }) || "Not specified",
    };
  }, [user, preferences]);

  return (
    <div>
      <h2>{formattedUser.fullName}</h2>
      <p>Age: {formattedUser.age}</p>
      <p>Birth Date: {formattedUser.formattedBirthDate}</p>
      <p>Email: {formattedUser.displayEmail}</p>
      <p>Member for: {formattedUser.membershipDuration}</p>
      <p>Salary: {formattedUser.formattedSalary}</p>
    </div>
  );
}

function calculateMembershipDuration(joinDate) {
  const now = new Date();
  const joined = new Date(joinDate);
  const diffTime = Math.abs(now - joined);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 30) {
    return `${diffDays} days`;
  } else if (diffDays < 365) {
    return `${Math.floor(diffDays / 30)} months`;
  } else {
    return `${Math.floor(diffDays / 365)} years`;
  }
}
```

### 4. API Data Transformation

```js
import { useState, useEffect, useMemo } from "react";

function SalesAnalytics() {
  const [salesData, setSalesData] = useState([]);
  const [timeRange, setTimeRange] = useState("month");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSalesData().then((data) => {
      setSalesData(data);
      setLoading(false);
    });
  }, []);

  // Memoize analytics calculations
  const analytics = useMemo(() => {
    console.log("Calculating analytics...");

    if (!salesData.length) return null;

    const now = new Date();
    let startDate;

    switch (timeRange) {
      case "week":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "year":
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(0);
    }

    const filteredData = salesData.filter(
      (sale) => new Date(sale.date) >= startDate
    );

    const totalRevenue = filteredData.reduce(
      (sum, sale) => sum + sale.amount,
      0
    );
    const totalOrders = filteredData.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Group by product
    const productAnalytics = filteredData.reduce((acc, sale) => {
      const product = sale.product;
      if (!acc[product]) {
        acc[product] = { revenue: 0, orders: 0 };
      }
      acc[product].revenue += sale.amount;
      acc[product].orders += 1;
      return acc;
    }, {});

    // Top products
    const topProducts = Object.entries(productAnalytics)
      .sort(([, a], [, b]) => b.revenue - a.revenue)
      .slice(0, 5);

    return {
      totalRevenue,
      totalOrders,
      averageOrderValue,
      topProducts,
      period: timeRange,
    };
  }, [salesData, timeRange]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Sales Analytics</h2>

      <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
        <option value="year">This Year</option>
      </select>

      {analytics && (
        <div>
          <h3>Summary for {analytics.period}</h3>
          <p>Total Revenue: ${analytics.totalRevenue.toFixed(2)}</p>
          <p>Total Orders: {analytics.totalOrders}</p>
          <p>Average Order Value: ${analytics.averageOrderValue.toFixed(2)}</p>

          <h4>Top Products</h4>
          {analytics.topProducts.map(([product, data]) => (
            <div key={product}>
              <strong>{product}</strong>: ${data.revenue.toFixed(2)} (
              {data.orders} orders)
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

async function fetchSalesData() {
  // Simulate API call
  return [
    { id: 1, product: "Laptop", amount: 999, date: "2025-08-25" },
    { id: 2, product: "Phone", amount: 599, date: "2025-08-26" },
    // ... more data
  ];
}
```

### 5. Text Analysis Tool

```js
import { useState, useMemo } from "react";

function TextAnalyzer() {
  const [text, setText] = useState("");
  const [includeSpaces, setIncludeSpaces] = useState(false);

  const textStats = useMemo(() => {
    console.log("Analyzing text...");

    if (!text) {
      return {
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        averageWordsPerSentence: 0,
        readingTime: 0,
        mostCommonWords: [],
      };
    }

    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;

    const words = text.trim() ? text.trim().split(/\s+/) : [];
    const wordCount = words.length;

    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const sentenceCount = sentences.length;

    const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
    const paragraphCount = paragraphs.length;

    const averageWordsPerSentence =
      sentenceCount > 0 ? wordCount / sentenceCount : 0;

    // Reading time (assuming 200 words per minute)
    const readingTime = Math.ceil(wordCount / 200);

    // Most common words
    const wordFrequency = {};
    words.forEach((word) => {
      const cleanWord = word.toLowerCase().replace(/[^\w]/g, "");
      if (cleanWord.length > 2) {
        // Ignore short words
        wordFrequency[cleanWord] = (wordFrequency[cleanWord] || 0) + 1;
      }
    });

    const mostCommonWords = Object.entries(wordFrequency)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([word, count]) => ({ word, count }));

    return {
      characters: includeSpaces ? characters : charactersNoSpaces,
      charactersNoSpaces,
      words: wordCount,
      sentences: sentenceCount,
      paragraphs: paragraphCount,
      averageWordsPerSentence: Math.round(averageWordsPerSentence * 10) / 10,
      readingTime,
      mostCommonWords,
    };
  }, [text, includeSpaces]);

  return (
    <div>
      <h2>Text Analyzer</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here..."
        rows={10}
        cols={50}
        style={{ width: "100%", marginBottom: "20px" }}
      />

      <label>
        <input
          type="checkbox"
          checked={includeSpaces}
          onChange={(e) => setIncludeSpaces(e.target.checked)}
        />
        Include spaces in character count
      </label>

      <div style={{ marginTop: "20px" }}>
        <h3>Statistics</h3>
        <p>
          Characters: <strong>{textStats.characters}</strong>
        </p>
        <p>
          Characters (no spaces):{" "}
          <strong>{textStats.charactersNoSpaces}</strong>
        </p>
        <p>
          Words: <strong>{textStats.words}</strong>
        </p>
        <p>
          Sentences: <strong>{textStats.sentences}</strong>
        </p>
        <p>
          Paragraphs: <strong>{textStats.paragraphs}</strong>
        </p>
        <p>
          Average words per sentence:{" "}
          <strong>{textStats.averageWordsPerSentence}</strong>
        </p>
        <p>
          Estimated reading time:{" "}
          <strong>{textStats.readingTime} minute(s)</strong>
        </p>

        {textStats.mostCommonWords.length > 0 && (
          <div>
            <h4>Most Common Words</h4>
            {textStats.mostCommonWords.map(({ word, count }) => (
              <div key={word}>
                <strong>{word}</strong>: {count} times
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

## useMemo with Custom Hooks

```js
import { useState, useEffect, useMemo } from "react";

// Custom hook with memoized calculations
function useShoppingCart() {
  const [items, setItems] = useState([]);

  const addItem = (product, quantity = 1) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeItem = (productId) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  // Memoized calculations
  const cartSummary = useMemo(() => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const averageItemPrice = totalItems > 0 ? totalPrice / totalItems : 0;

    // Apply discounts
    let discount = 0;
    if (totalPrice > 100) discount = 0.1; // 10% discount over $100
    if (totalPrice > 200) discount = 0.15; // 15% discount over $200

    const discountAmount = totalPrice * discount;
    const finalPrice = totalPrice - discountAmount;

    return {
      totalItems,
      totalPrice,
      averageItemPrice,
      discount,
      discountAmount,
      finalPrice,
    };
  }, [items]);

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    cartSummary,
  };
}

// Component using the custom hook
function ShoppingCartComponent() {
  const { items, addItem, removeItem, cartSummary } = useShoppingCart();

  const sampleProducts = [
    { id: 1, name: "Laptop", price: 999 },
    { id: 2, name: "Mouse", price: 25 },
    { id: 3, name: "Keyboard", price: 75 },
  ];

  return (
    <div>
      <h2>Shopping Cart</h2>

      <div>
        <h3>Products</h3>
        {sampleProducts.map((product) => (
          <div key={product.id}>
            <span>
              {product.name} - ${product.price}
            </span>
            <button onClick={() => addItem(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <div>
        <h3>Cart Items</h3>
        {items.map((item) => (
          <div key={item.id}>
            <span>
              {item.name} x {item.quantity} = ${item.price * item.quantity}
            </span>
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </div>
        ))}
      </div>

      <div>
        <h3>Summary</h3>
        <p>Total Items: {cartSummary.totalItems}</p>
        <p>Subtotal: ${cartSummary.totalPrice.toFixed(2)}</p>
        <p>
          Discount ({Math.round(cartSummary.discount * 100)}%): -$
          {cartSummary.discountAmount.toFixed(2)}
        </p>
        <p>
          <strong>Total: ${cartSummary.finalPrice.toFixed(2)}</strong>
        </p>
      </div>
    </div>
  );
}
```

## Important Concepts & Best Practices

### 1. When to Use useMemo

✅ **Good Use Cases:**

- **Expensive calculations** (complex math, data processing)
- **Heavy data transformations** (filtering, sorting large arrays)
- **Creating objects/arrays** that are passed as props to prevent unnecessary re-renders
- **Complex formatting operations**

❌ **Avoid useMemo for:**

- **Simple calculations** (basic math, string concatenation)
- **Primitive values** that are cheap to calculate
- **Functions** (use useCallback instead)
- **Every computation** (premature optimization)

### 2. Dependencies Array Rules

```js
// ✅ Good - Include all used variables
function Component({ users, searchTerm }) {
  const filteredUsers = useMemo(() => {
    return users.filter((user) => user.name.includes(searchTerm));
  }, [users, searchTerm]); // Both users and searchTerm included
}

// ❌ Bad - Missing dependency
function Component({ users, searchTerm }) {
  const filteredUsers = useMemo(() => {
    return users.filter((user) => user.name.includes(searchTerm));
  }, [users]); // Missing searchTerm dependency
}
```

### 3. Referential Equality

```js
// ✅ Good - Memoize object creation
function Component({ data }) {
  const processedData = useMemo(
    () => ({
      formatted: data.map((item) => ({ ...item, processed: true })),
      count: data.length,
    }),
    [data]
  );

  return <ChildComponent data={processedData} />;
}

// ❌ Bad - New object on every render
function Component({ data }) {
  const processedData = {
    formatted: data.map((item) => ({ ...item, processed: true })),
    count: data.length,
  };

  return <ChildComponent data={processedData} />;
}
```

### 4. Avoiding Unnecessary Memoization

```js
// ❌ Unnecessary - Simple calculation
const doubledValue = useMemo(() => value * 2, [value]);

// ✅ Better - Direct calculation
const doubledValue = value * 2;

// ✅ Good - Complex calculation worth memoizing
const complexResult = useMemo(() => {
  return data.reduce((acc, item) => {
    // Complex processing here
    return acc + heavyCalculation(item);
  }, 0);
}, [data]);
```

## Performance Considerations

### 1. Measuring Performance Impact

```js
function Component({ data }) {
  const expensiveCalculation = useMemo(() => {
    console.time("Expensive Calculation");
    const result = performHeavyWork(data);
    console.timeEnd("Expensive Calculation");
    return result;
  }, [data]);

  return <div>{expensiveCalculation}</div>;
}
```

### 2. Profiling with React DevTools

Use React DevTools Profiler to measure the actual performance impact of your memoizations.

## Common Pitfalls

### 1. Over-memoization

```js
// ❌ Over-memoizing simple values
function Component({ name }) {
  const upperName = useMemo(() => name.toUpperCase(), [name]);
  const greeting = useMemo(() => `Hello, ${upperName}!`, [upperName]);

  return <div>{greeting}</div>;
}

// ✅ Better - Direct calculation for simple operations
function Component({ name }) {
  const greeting = `Hello, ${name.toUpperCase()}!`;

  return <div>{greeting}</div>;
}
```

### 2. Incorrect Dependencies

```js
// ❌ Wrong - Object in dependencies will always be different
function Component({ config }) {
  const result = useMemo(() => {
    return processConfig(config);
  }, [config]); // config object might be new on every render
}

// ✅ Better - Use specific properties
function Component({ config }) {
  const result = useMemo(() => {
    return processConfig(config);
  }, [config.setting1, config.setting2]); // Specific dependencies
}
```

## Key Takeaways

- **useMemo** caches expensive calculations between re-renders
- **Only use for expensive operations** - avoid premature optimization
- **Include all dependencies** in the dependency array
- **Great for data transformations** like filtering, sorting, formatting
- **Prevents unnecessary recalculations** when dependencies haven't changed
- **Use React DevTools** to measure actual performance impact
- **Don't memoize functions** - use useCallback instead
- **Consider referential equality** when passing objects as props

## useMemo vs Other Hooks

| Hook            | Purpose             | Use Case                                     |
| --------------- | ------------------- | -------------------------------------------- |
| **useMemo**     | Memoize values      | Expensive calculations, data transformations |
| **useCallback** | Memoize functions   | Function references, event handlers          |
| **React.memo**  | Memoize components  | Prevent component re-renders                 |
| **useState**    | Manage state        | Component state that triggers re-renders     |
| **useEffect**   | Handle side effects | API calls, subscriptions, DOM updates        |

---

_This guide covers all essential patterns and use cases for the useMemo hook in React functional components._

```!

[1](https://react.dev/reference/react/useMemo)
[2](https://www.w3schools.com/react/react_usememo.asp)
[3](https://legacy.reactjs.org/docs/hooks-reference.html)
[4](https://www.geeksforgeeks.org/reactjs/react-js-usememo-hook/)
[5](https://www.freecodecamp.org/news/how-to-work-with-usememo-in-react/)
[6](https://refine.dev/blog/react-usememo/)
[7](https://www.telerik.com/blogs/learn-how-usememo-hook-once-all)
[8](https://deadsimplechat.com/blog/memo-vs-usememo-in-react/)
[9](https://react.dev/reference/react/hooks)
```
