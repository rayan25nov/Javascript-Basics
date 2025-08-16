### **Normal Script Tag**

When a browser encounters a regular `<script>` tag, it pauses the HTML parsing and fetches and executes the script. This blocks the rendering of the page and can slow down the initial load time.

***

### **`async` Attribute**

The **`async`** attribute allows the script to be fetched in parallel with the HTML parsing. Once the script is downloaded, HTML parsing is paused, the script is executed, and then parsing resumes. A key point to remember is that `async` **does not** guarantee the execution order of multiple scripts. It is best used for independent scripts, like analytics.

***

### **`defer` Attribute**

The **`defer`** attribute also fetches the script in parallel with HTML parsing. However, it **defers** the script's execution until the entire HTML document has been parsed. Unlike `async`, `defer` **guarantees** that scripts will be executed in the order they appear in the HTML. This makes it suitable for most use cases, especially for scripts that rely on the DOM.

***

### Example
```html
<!-- Normal Script Tag -->
<!-- The browser pauses HTML parsing to fetch and execute this script immediately. 
     This blocks rendering until the script finishes loading and running. -->
<script src="script1.js"></script>

<!-- Async Script Tag -->
<!-- The script is fetched in parallel with HTML parsing. 
     Execution happens as soon as the script is downloaded, pausing HTML parsing at that moment.
     Execution order between multiple async scripts is NOT guaranteed. -->
<script src="script2.js" async></script>

<!-- Defer Script Tag -->
<!-- The script is fetched in parallel with HTML parsing. 
     Execution is deferred until after the entire HTML document is parsed.
     Deferred scripts are executed in the order they appear in the document. -->
<script src="script3.js" defer></script>

```
The video can be viewed at [https://youtu.be/IrHmpdORLu8?si=7iV6RsReTIAzwykZ](https://youtu.be/IrHmpdORLu8?si=7iV6RsReTIAzwykZ).
http://googleusercontent.com/youtube_content/5