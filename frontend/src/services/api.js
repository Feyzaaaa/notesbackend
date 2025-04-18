// src/services/api.js
const API_URL = "http://localhost:8082/api/notes";

export async function getNotes() {
  const res = await fetch(API_URL);
  return await res.json();
}

export async function addNote(note) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  return await res.json();
}

export async function updateNote(id, note) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT", // Veya PATCH kullanabilirsiniz, backend'inize bağlı
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  return await res.json(); // Güncellenmiş notu dönebilir veya sadece başarılı olduğunu belirten bir cevap
}

export async function deleteNote(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}