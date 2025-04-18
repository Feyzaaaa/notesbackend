// src/components/NoteList.js
import React from 'react';
import NoteItem from "./NoteItem";

export default function NoteList({ notes, onDelete, onEdit }) {
  return (
    <div>
      {notes.map(note => (
        <NoteItem key={note.id} note={note} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
}