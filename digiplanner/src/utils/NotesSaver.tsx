import React, { useEffect } from 'react';
import Note from '../utils/noteType';

type NotesSaverProps = {
  notes: any[];
};
const NotesSaver: React.FC<NotesSaverProps> = ({ notes }) => {
  useEffect(() => {
    const notesByColor: { [key: string]: Note[] } = {}; // Skapa ett objekt för att lagra anteckningarna efter färg

    // Gruppera anteckningarna efter färg
    notes.forEach(note => {
      if (!notesByColor[note.color]) {
        notesByColor[note.color] = [];
      }
      notesByColor[note.color].push(note);
    });

    // Spara anteckningarna efter färg i local storage
    Object.keys(notesByColor).forEach(color => {
      const notesWithLatestCoords = notesByColor[color].map(note => {
        // Hitta den senaste x- och y-koordinaterna för varje färggrupperad anteckning
        const latestCoords = notes
          .filter(n => n.color === color && n.id === note.id)
          .pop();
        // Returnera en kopia av anteckningen med de senaste koordinaterna
        console.log('latestCoords', latestCoords);
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
