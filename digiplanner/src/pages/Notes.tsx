import React, { useState } from 'react';
import '../assets/styles/Notes.scss';
import StickyNotes from '../components/StickyNotes';
import NotesSaver from '../utils/NotesSaver';
import noteType from '../utils/noteType';
import NotesLoader from '../utils/NotesLoader';

interface NotesProps {
  notes: noteType[];
}

const Notes: React.FC<NotesProps> = () => {
  const [notes, setNotes] = useState<noteType[]>([]);
  const addNote = (color: string, buttonX: number, buttonY: number) => {
    const newX = buttonX + 10; // Lägg till 10 pixlar till höger
    const newY = buttonY + 10; // Lägg till 10 pixlar nedåt
    const currentDate = new Date().toISOString();
    setNotes([
      ...notes,
      { id: currentDate, text: '', color, x: newX, y: newY },
    ]);
  };
  const handleNoteChange = (
    id: string,
    color: string,
    newText: string,
    currentX: number,
    currentY: number
  ) => {
    const updatedNotes = notes.map(note => {
      if (note.id === id) {
        return { ...note, text: newText, x: currentX, y: currentY }; // Uppdatera texten för den specifika anteckningen
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  const removeNote = (id: string, color: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);

    const notesInStorage = localStorage.getItem(`notesGroup_${color}`);
    if (notesInStorage) {
      const parsedNotes: noteType[] = JSON.parse(notesInStorage);
      const updatedNotesInStorage = parsedNotes.filter(note => note.id !== id);
      if (updatedNotesInStorage.length === 0) {
        localStorage.removeItem(`notesGroup_${color}`);
      } else {
        localStorage.setItem(
          `notesGroup_${color}`,
          JSON.stringify(updatedNotesInStorage)
        );
      }
    }
  };

  return (
    <>
      <section className="notes-container" style={{ overflow: 'hidden' }}>
        <NotesSaver notes={notes} />
        <NotesLoader onLoad={setNotes} />

        <div
          onClick={e => addNote('#ffd6de', e.clientX, e.clientY)}
          className="fixed-notes "
          style={{ backgroundColor: '#ffd6de' }}
        ></div>
        <div
          onClick={e => addNote('#b0ffca', e.clientX, e.clientY)}
          className="fixed-notes "
          style={{ backgroundColor: '#b0ffca' }}
        ></div>

        {notes.map(note => (
          <StickyNotes
            key={note.id}
            note={note}
            onClose={() => removeNote(note.id, note.color)}
            onNoteChange={(id, color, newText, currentX, currentY) =>
              handleNoteChange(id, color, newText, currentX, currentY)
            }
          />
        ))}
      </section>
    </>
  );
};

export default Notes;
