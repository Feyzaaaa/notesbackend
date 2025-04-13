package com.feyza.notesbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.feyza.notesbackend.model.Note;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {
}

