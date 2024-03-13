import React, { useEffect } from 'react';
import Note from '../utils/noteType';

type NotesSaverProps = {
  notes: any[];
};
const NotesSaver: React.FC<NotesSaverProps> = ({ notes }) => {
  useEffect(() => {
    const notesByColor: { [key: string]: Note[] } = {};

    notes.forEach(note => {
      if (!notesByColor[note.color]) {
        notesByColor[note.color] = [];
      }
      notesByColor[note.color].push(note);
    });

    Object.keys(notesByColor).forEach(color => {
      const notesWithLatestCoords = notesByColor[color].map(note => {
        const latestCoords = notes
          .filter(n => n.color === color && n.id === note.id)
          .pop();

        return {
          ...note,
          x: latestCoords.x,
          y: latestCoords.y,
        };
      });
      localStorage.setItem(
        `notesGroup_${color}`,
        JSON.stringify(notesWithLatestCoords)
      );
    });
  }, [notes]);

  return null;
};

export default NotesSaver;
