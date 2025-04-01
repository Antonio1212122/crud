"use client"; // Importante para componentes interactivos
import { useState } from "react";

export default function BookForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, author });
    setTitle("");
    setAuthor("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        required
      />
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Autor"
        required
      />
      <button type="submit">Agregar libro</button>
    </form>
  );
}