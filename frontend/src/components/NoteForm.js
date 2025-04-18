// src/components/NoteForm.js
import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { addNote, updateNote } from "../services/api";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
`;

const Textarea = styled.textarea`
  padding: 0.5rem;
  font-size: 1rem;
  resize: vertical;
`;

const Button = styled.button`
  background-color: ${props => (props.$isEditing ? "#28a745" : "#1890ff")};
  color: white;
  border: none;
  padding: 0.5rem;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: ${props => (props.$isEditing ? "#218838" : "#40a9ff")};
  }
`;

export default function NoteForm({ onAdd, onUpdate, editingNote, clearEditingNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [editingNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingNote) {
      const updatedNote = await updateNote(editingNote.id, { title, content });
      onUpdate(updatedNote);
      clearEditingNote();
    } else {
      const newNote = await addNote({ title, content });
      onAdd(newNote);
    }
    setTitle("");
    setContent("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Başlık"
        required
      />
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="İçerik"
        required
      />
      <Button type="submit" $isEditing={!!editingNote}>
        {editingNote ? "Güncelle" : "Ekle"}
      </Button>
    </Form>
  );
}
