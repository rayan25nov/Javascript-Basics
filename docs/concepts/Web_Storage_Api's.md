## Web Storage Api

**Web Storage API**, a tool for developers to store key-value pairs of strings directly in a user's web browser.

### **Session Storage**

- This type of storage only lasts for a single session.
- The data is automatically cleared as soon as the user closes the browser tab or window.
- It is more secure and efficient than cookies because the data is not sent to the server with every request.
- It has a larger storage capacity of at least 5MB.

#### Code Example for sessionStorage:

```javascript
// Store data for the current session
sessionStorage.setItem("sessionID", "xyz-abc-123");

// This data will be gone once the tab is closed.
```

---

### **Local Storage**

- Unlike session storage, local storage has no expiration date.
- Data persists even after the browser is closed and the computer is shut down.
- Common use cases include storing user-specific data like recently viewed products or browsing history to improve page speed.
- It also has a storage capacity of at least 5MB.

#### Code Examples for localStorage:

```js
// 1. Storing data
localStorage.setItem("username", "Alice");
localStorage.setItem("theme", "dark");

// 2. Retrieving data
const username = localStorage.getItem("username"); // "Alice"
console.log(username);

// 3. Storing an object (requires JSON)
const userProfile = { id: 123, subscribed: true };
localStorage.setItem("profile", JSON.stringify(userProfile));

// 4. Retrieving and parsing an object
const retrievedProfile = JSON.parse(localStorage.getItem("profile"));
console.log(retrievedProfile.id); // 123

// 5. Removing a single item
localStorage.removeItem("theme");

// 6. Clearing all data for the origin
localStorage.clear();
```

---

### **Same-Origin Policy**

- Both session and local storage follow a same-origin policy for security.
- This means that data stored for one website (or "origin") cannot be accessed by another. An origin is defined by the protocol, domain, and port.

---

- **Using the Local Storage API**
  - **`localStorage.setItem()`**: Stores a key-value pair.
  - **`localStorage.getItem()`**: Retrieves data based on the key.
  - **`localStorage.removeItem()`**: Deletes a specific item.
  - **`localStorage.clear()`**: Deletes all data from local storage for that origin.
  - Since local storage only accepts strings, objects must be converted to strings using **`JSON.stringify()`** before being saved and then converted back to objects using **`JSON.parse()`** when retrieved.

### **Cookies**

Cookies are small text files stored in the browser. They were the original way to store client-side data and are still essential for many server-side operations.

- **Persistence**: Can be session-only or persistent with a manually set expiration date.
- **Storage Limit**: Very small, around 4KB.
- **Key Feature**: Cookies are **sent to the server with every HTTP request**. This makes them ideal for authentication and session management but can also slow down your application if used for large data.
- **Use Cases**: Managing user login sessions, tracking user behavior for analytics, and personalization.

#### **Code Examples for Cookies:**

```javascript
// 1. Creating a simple cookie
document.cookie = "username=Bob; path=/";

// 2. Creating a cookie with an expiration date (in UTC format)
const expires = new Date();
expires.setTime(expires.getTime() + 7 * 24 * 60 * 60 * 1000); // Expires in 7 days
document.cookie = `sessionToken=abc123xyz; expires=${expires.toUTCString()}; path=/`;

// 3. Reading cookies (returns all cookies in a single string)
const allCookies = document.cookie;
console.log(allCookies); // "username=Bob; sessionToken=abc123xyz"

// 4. Deleting a cookie (by setting its expiration date to the past)
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
```

---

### **Summary: Local Storage vs. Session Storage vs. Cookies**

| Feature            | Local Storage             | Session Storage          | Cookies                  |
| :----------------- | :------------------------ | :----------------------- | :----------------------- |
| **Persistence**    | Permanent (until cleared) | Per session (tab/window) | Manually set expiration  |
| **Storage Limit**  | ~5-10MB                   | ~5-10MB                  | ~4KB                     |
| **Sent to Server** | No                        | No                       | Yes (with every request) |
| **Accessibility**  | Client-side only          | Client-side only         | Client & Server          |
| **Primary Use**    | User preferences, carts   | Temporary session data   | Authentication, tracking |

You can view the video at [https://youtu.be/MOd5cTJ6kaA](https://www.google.com/search?q=https://youtu.be/MOd5cTJ6kaA).
http://googleusercontent.com/youtube_content/2
