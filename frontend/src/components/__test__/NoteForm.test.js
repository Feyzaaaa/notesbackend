import { render, screen, fireEvent } from "@testing-library/react";
import NoteForm from "../NoteForm";

test("formdan not eklenebiliyor", async () => {
  const onAddMock = jest.fn();

  render(<NoteForm onAdd={onAddMock} />);
  
  fireEvent.change(screen.getByPlaceholderText("Başlık"), { target: { value: "Test Başlık" } });
  fireEvent.change(screen.getByPlaceholderText("İçerik"), { target: { value: "Test İçerik" } });

  fireEvent.click(screen.getByText("Ekle"));

  // API çağrısı mock'lanmadıysa bu bekleme gerekebilir
  // await waitFor(() => expect(onAddMock).toHaveBeenCalled());

  // Alternatif:
  expect(onAddMock).toHaveBeenCalled();
});
