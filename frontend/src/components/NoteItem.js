// src/components/NoteItem.js
import React from 'react';
import styled from "styled-components";

const NoteContainer = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Title = styled.h3`
  margin-bottom: 0.5rem;
`;

const Content = styled.p`
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-self: flex-end;
`;

const EditButton = styled.button`
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #1976d2;
  }
`;

const DeleteButton = styled.button`
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #d9363e;
  }
`;

export default function NoteItem({ note, onDelete, onEdit }) {
  return (
    <NoteContainer>
      <Title>{note.title}</Title>
      <Content>{note.content}</Content>
      <ButtonContainer>
        <EditButton onClick={() => onEdit(note)}>Düzenle</EditButton>
        <DeleteButton onClick={() => onDelete(note.id)}>Sil</DeleteButton>
      </ButtonContainer>
    </NoteContainer>
  );
}