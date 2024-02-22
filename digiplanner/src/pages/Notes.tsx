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
    setNotes([
      ...notes,
      { id: notes.length, text: '', color, x: newX, y: newY },
    ]);
  };
  const handleNoteChange = (
    id: number,
    color: string,
    newText: string,
    currentX: number,
    currentY: number
  ) => {
    const updatedNotes = notes.map(note => {
      if (note.id === id) {
        console.log(note.id, ' ett id');
        return { ...note, text: newText, x: currentX, y: currentY }; // Uppdatera texten för den specifika anteckningen
      }

      return note;
    });
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
