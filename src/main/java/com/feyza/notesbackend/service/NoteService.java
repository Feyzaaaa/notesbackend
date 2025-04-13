package com.feyza.notesbackend.service;

import java.util.List;
import com.feyza.notesbackend.model.Note;

public interface NoteService {
    List<Note> getAllNotes();

    Note getNoteById(Long id); // Belirli bir notu getirme metodu (ekledik)

    void deleteNote(Long id);

    Note createNote(Note note);

    Note updateNote(Long id, Note updatedNote); // Güncelleme metodu (ekledik)
}
