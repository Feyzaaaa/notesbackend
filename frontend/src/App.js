// src/App.js
import React from 'react';
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import { getNotes, addNote, updateNote, deleteNote } from "./services/api";
import styled from "styled-components";

const SearchInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
`;

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Arama terimini tutan state

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getNotes();
        setNotes(data);
        setLoading(false);
      } catch (error) {
        setError("Notları yüklerken bir hata oluştu.");
        setLoading(false);
        console.error("Notları yükleme hatası:", error);
        toast.error("Notları yüklerken bir hata oluştu!");
      }
    };

    fetchNotes();
  }, []);

  const handleAdd = async (newNoteData) => {
    try {
      const addedNote = await addNote(newNoteData);
      setNotes([...notes, addedNote]);
      toast.success("Not başarıyla eklendi!");
    } catch (error) {
      console.error("Not ekleme hatası:", error);
      toast.error("Not eklenirken bir hata oluştu!");
    }
  };

  const handleUpdate = async (updatedNote) => {
    try {
      const response = await updateNote(updatedNote.id, updatedNote);
      setNotes(notes.map(note => (note.id === updatedNote.id ? response : note)));
      toast.success("Not başarıyla güncellendi!");
      setEditingNote(null);
    } catch (error) {
      console.error("Not güncelleme hatası:", error);
      toast.error("Not güncellenirken bir hata oluştu!");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu notu silmek istediğinizden emin misiniz?")) {
      try {
        await deleteNote(id);
        setNotes(notes.filter(note => note.id !== id));
        toast.info("Not silindi.");
      } catch (error) {
        console.error("Not silme hatası:", error);
        toast.error("Not silinirken bir hata oluştu!");
      }
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
  };

  const clearEditingNote = () => {
    setEditingNote(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Notları arama terimine göre filtrele
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return <div>Hata: {error}</div>;
  }

  return (
    <div>
      <h1>Notlarım</h1>
      <NoteForm onAdd={handleAdd} onUpdate={handleUpdate} editingNote={editingNote} clearEditingNote={clearEditingNote} />
      <SearchInput
        type="text"
        placeholder="Notlarda ara..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <NoteList notes={filteredNotes} onDelete={handleDelete} onEdit={handleEdit} />
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default App;