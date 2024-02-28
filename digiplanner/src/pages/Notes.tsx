import React, { useState } from 'react';
import '../assets/styles/Notes.scss';
import StickyNotes from '../components/StickyNotes';
import NotesSaver from '../utils/NotesSaver';
import noteType from '../utils/noteType';
import NotesLoader from '../utils/NotesLoader';
import Note from '../utils/noteType';

interface NotesProps {
  notes: noteType[];
}
const Notes: React.FC<NotesProps> = () => {
  const [notes, setNotes] = useState<noteType[]>([]);
  const newNoteId = notes.length > 0 ? notes[notes.length - 1].id + 1 : 0;
  const addNote = (color: string, buttonX: number, buttonY: number) => {
    const newX = buttonX + 10; // Lägg till 10 pixlar till höger
    const newY = buttonY + 10; // Lägg till 10 pixlar nedåt
    setNotes([...notes, { id: newNoteId, text: '', color, x: newX, y: newY }]);
  };
  const handleNoteChange = (
    id: number,
    color: string,
    newText: string,
    currentX: number,
    currentY: number
  ) => {
    const updatedNotes = notes.map(note => {
      if (note.id === Number(id)) {
        return { ...note, text: newText, x: currentX, y: currentY }; // Uppdatera texten för den specifika anteckningen
      }

      return note;
    });
    setNotes(updatedNotes);
  };
  console.log(notes, 'notes');

  const removeNote = (id: number, color: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);

    // Uppdatera och spara gruppen i local storage
    const notesInStorage = localStorage.getItem(`notesGroup_${color}`);
    if (notesInStorage) {
      const parsedNotes: Note[] = JSON.parse(notesInStorage);
      const updatedNotesInStorage = parsedNotes.filter(note => note.id !== id);
      localStorage.setItem(
        `notesGroup_${color}`,
        JSON.stringify(updatedNotesInStorage)
      );
    }
    setNotes(updatedNotes);
  };
  return (
    <>
      <section className="notes-container" style={{ overflow: 'hidden' }}>
        <NotesSaver notes={notes} />
        <NotesLoader onLoad={setNotes} />
        <div
          onClick={e => addNote('#ffbeb0', e.clientX, e.clientY)}
          className="fixed-notes "
          style={{ backgroundColor: '#ffbeb0' }}
        ></div>
        <div
          onClick={e => addNote('#95fcd2', e.clientX, e.clientY)}
          className="fixed-notes "
          style={{ backgroundColor: '#95fcd2' }}
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
