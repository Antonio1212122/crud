import { useEffect, useState } from "react";
import BookForm from "../components/BookForm";

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then(setBooks);
  }, []);

  function updateBook(id) {
    const newTitle = prompt("Nuevo título:");
    const newAuthor = prompt("Nuevo autor:");
    if (!newTitle || !newAuthor) return;

    fetch(`/api/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, author: newAuthor }),
    }).then(() => location.reload());
  }

  function deleteBook(id) {
    fetch(`/api/books/${id}`, { method: "DELETE" }).then(() => location.reload());
  }

  return (
    <div>
      <BookForm
        onSubmit={(book) =>
          fetch("/api/books", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(book),
          }).then(() => location.reload())
        }
      />
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author}{" "}
            <button onClick={() => updateBook(book.id)}>Editar</button>
            <button onClick={() => deleteBook(book.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
