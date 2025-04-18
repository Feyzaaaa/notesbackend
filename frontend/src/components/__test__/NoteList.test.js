import { render, screen } from "@testing-library/react";
import NoteList from "../NoteList";

test("notlar listeleniyor", () => {
  const notes = [
    { id: 1, title: "Test 1", content: "İçerik 1" },
    { id: 2, title: "Test 2", content: "İçerik 2" }
  ];

  render(<NoteList notes={notes} onDelete={() => {}} />);

  expect(screen.getByText("Test 1")).toBeInTheDocument();
  expect(screen.getByText("İçerik 2")).toBeInTheDocument();
});
