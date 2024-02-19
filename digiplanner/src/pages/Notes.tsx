import React, { useState } from 'react';
import '../assets/styles/Notes.scss';
import StickyNotes from '../components/StickyNotes';

const Notes = () => {
  const [notes, setNotes] = useState<
    { id: number; text: string; color: string; x: number; y: number }[]
  >([]);

  const addNote = (color: string, buttonX: number, buttonY: number) => {
    const newX = buttonX + 10; // Lägg till 10 pixlar till höger
    const newY = buttonY + 10; // Lägg till 10 pixlar nedåt
    setNotes([
      ...notes,
      { id: notes.length, text: '', color, x: newX, y: newY },
    ]);
  };
  return (
    <>
      <section className="notes-container" style={{ overflow: 'hidden' }}>
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

        {notes.map(item => (
          <StickyNotes key={item.id} color={item.color} x={item.x} y={item.y} />
        ))}
      </section>
    </>
  );
};

export default Notes;
