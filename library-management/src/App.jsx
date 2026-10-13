import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [books, setBooks] = useState([]);
  const [editId, setEditId] = useState(null);

  function addBook() {
    if (title === "" || author === "") {
      alert("Please fill all fields");
      return;
    }

    if (editId === null) {
      const newBook = {
        id: Date.now(),
        title: title,
        author: author
      };

      setBooks([...books, newBook]);
    } else {
      setBooks(
        books.map((book) =>
          book.id === editId
            ? { ...book, title: title, author: author }
            : book
        )
      );

      setEditId(null);
    }

    setTitle("");
    setAuthor("");
  }

  function updateBook(book) {
    setTitle(book.title);
    setAuthor(book.author);
    setEditId(book.id);
  }

  function deleteBook(id) {
    setBooks(books.filter((book) => book.id !== id));
  }

  return (
    <div>
      <h1>Library Management System</h1>

      <input
        type="text"
        placeholder="Enter book title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Enter author name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <br /><br />

      <button onClick={addBook}>
        {editId === null ? "Add Book" : "Update Book"}
      </button>

      <h2>Book List</h2>

      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        books.map((book) => (
          <div key={book.id}>
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>

            <button onClick={() => updateBook(book)}>
              Edit
            </button>

            <button onClick={() => deleteBook(book.id)}>
              Delete
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default App;