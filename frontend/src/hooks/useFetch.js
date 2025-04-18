import { useEffect, useState } from "react";
import { getNotes } from "../services/api";

export function useFetch() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes().then(setNotes);
  }, []);

  return { notes, setNotes };
}
