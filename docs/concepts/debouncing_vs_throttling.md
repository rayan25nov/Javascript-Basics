## Debouncing vs Throttling

**Debouncing** and **Throttling**, are the two important concepts for optimizing the performance of JavaScript applications. These techniques are used to **rate-limit function calls** to prevent an event, such as a user typing or a window resizing, from triggering an excessive number of function executions.

---

### Debouncing

**Debouncing** is a technique that ensures a function is called only after a specified period of inactivity. This means that if the event is continuously triggered, the function will not execute until the event stops firing for a certain amount of time.

* **When to use it**: Debouncing is ideal for scenarios where you only want to perform an action after the user has finished their activity.
* **Example**: A search bar on an e-commerce site. Instead of making an API call for every keystroke, debouncing ensures the search is performed only after the user stops typing for a few hundred milliseconds.

---

### Throttling

**Throttling** limits the execution of a function to a maximum of one call per a specified time interval. It ensures that the function is executed at a regular, controlled rate, regardless of how many times the event is triggered.

* **When to use it**: Throttling is a good choice for scenarios where you want to perform an action periodically while an event is occurring.
* **Example**: Handling a rapid series of button clicks in a video game. Throttling can ensure that the "fire" function is called at a fixed rate, preventing the user from firing too quickly.

---

### Conclusion

The video concludes that there is no single "better" option between debouncing and throttling. The choice between the two depends entirely on the **specific use case** and the desired behavior.
http://googleusercontent.com/youtube_content/2