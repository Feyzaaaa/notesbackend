import { addNote } from "../services/api";

// Global fetch nesnesini mock'luyoruz
global.fetch = jest.fn();

describe("api fonksiyonları", () => {
  beforeEach(() => {
    // Her testten önce fetch mock'ını temizliyoruz
    fetch.mockClear();
  });

  it("addNote fonksiyonu doğru URL'ye POST isteği göndermeli ve cevabı dönmeli", async () => {
    const mockNote = { id: 1, title: "Test Başlık", content: "Test İçerik" };
    const mockResponse = {
      ok: true,
      json: async () => mockNote,
    };

    // fetch'in başarılı bir şekilde çağrıldığını ve mock cevabı döndüreceğini ayarlıyoruz
    fetch.mockResolvedValue(mockResponse);

    const noteData = { title: "Yeni Not Başlık", content: "Yeni Not İçerik" };
    const result = await addNote(noteData);

    // fetch'in doğru URL ve metotla çağrıldığını kontrol ediyoruz
    expect(fetch).toHaveBeenCalledWith("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
    });

    // Fonksiyonun beklenen cevabı döndürdüğünü kontrol ediyoruz
    expect(result).toEqual(mockNote);
  });

  it("addNote fonksiyonu başarısız bir istek durumunda hata fırlatmalı", async () => {
    const mockResponse = {
      ok: false,
      status: 400,
      statusText: "Bad Request",
    };

    // fetch'in başarısız bir cevap döndüreceğini ayarlıyoruz
    fetch.mockResolvedValue(mockResponse);

    const noteData = { title: "Hatalı Başlık", content: "Hatalı İçerik" };

    // Fonksiyonun hata fırlattığını kontrol ediyoruz
    await expect(addNote(noteData)).rejects.toThrow("API isteği başarısız: 400 Bad Request");
  });
});