// Sample Data
const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    pages: 180,
    isRead: true,
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    year: 1960,
    pages: 281,
    isRead: false,
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    year: 1949,
    pages: 328,
    isRead: true,
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    year: 1813,
    pages: 432,
    isRead: false,
  },
  {
    id: 5,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    year: 1951,
    pages: 277,
    isRead: true,
  },
];

// Task 1: Get all book titles
function getBookTitles(books) {
  // Your implementation here
  return books.map((book) => book.title);
  // Hint: Use map() to extract titles
}

// Task 2: Get books that have been read
function getReadBooks(books) {
  return books.filter((book) => book.isRead);
  // Your implementation here
  // Hint: Use filter() to find books where isRead is true
}

// Task 3: Find books by author
function findBooksByAuthor(books, authorName) {
  // Your implementation here
  return books.filter((book) => book.author === authorName);
  // Hint: Use filter() to match author names
}

// Task 4: Get library statistics
function getLibraryStats(books) {
  // Your implementation here
  const res = {};
  res.totalBooks = books.length;
  res.booksRead = books.filter((book) => book.isRead);
  res.booksUnread = books.filter((book) => !book.isRead);
  res.totalPages = books.reduce((pages, book) => {
    return pages + book.pages;
  }, 0);
  return res;
  // Return an object with totalBooks, booksRead, booksUnread, totalPages
}

// Task 5: Add a new book
function addBook(books, newBook) {
  // Your implementation here
  const id = books.length + 1;
  newBook.id = id;
  books.push(newBook);
  return newBook;
  // Hint: Create new ID and add to array
}

// Bonus Round
function findOldestBook(books) {
  let oldest = books[0];
  books.map((book) => {
    if (book.year < oldest.year) {
      oldest = book;
    }
  });
  return oldest;
}

function calculateAveragePages(books) {
  const totalPages = books.reduce((pages, book) => {
    return pages + book.pages;
  }, 0);
  return (totalPages / books.length).toLocaleString(2);
}

function markAsRead(books, id) {
  const book = books.find((b) => b.id === id);
  if (book) book.isRead = true;
  return book;
}

// Test your functions
console.log("=== Task 1: Book Titles ===");
console.log(getBookTitles(books));

console.log("\n=== Task 2: Read Books ===");
console.log(getReadBooks(books));

console.log("\n=== Task 3: Books by George Orwell ===");
console.log(findBooksByAuthor(books, "George Orwell"));

console.log("\n=== Task 4: Library Statistics ===");
console.log(getLibraryStats(books));

console.log("\n=== Task 5: Add New Book ===");
const newBook = {
  title: "Brave New World",
  author: "Aldous Huxley",
  year: 1600,
  pages: 268,
  isRead: false,
};
console.log(addBook(books, newBook));

// Uncomment to test bonus functions
console.log("\n=== Bonus: Oldest Book ===");
console.log(findOldestBook(books));

console.log("\n=== Bonus: Average Pages ===");
console.log(calculateAveragePages(books));

console.log("\n=== Bonus: Mark As Read ===");
console.log(markAsRead(books, 2)); // Marks book with id 2 as read
