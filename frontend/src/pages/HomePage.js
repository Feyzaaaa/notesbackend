// src/pages/HomePage.js
import React from 'react';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';

export default function HomePage({
  notes,
  onAdd,
  onUpdate,
  onDelete,
  editingNote,
  setEditingNote
}) {
  const clearEditingNote = () => setEditingNote(null);

  return (
    <div className="container">
      <h1>Not Uygulaması</h1>
      <NoteForm
        onAdd={onAdd}
        onUpdate={onUpdate}
        editingNote={editingNote}
        clearEditingNote={clearEditingNote}
      />
      <NoteList notes={notes} onDelete={onDelete} onEdit={setEditingNote} />
    </div>
  );
}
