import React, { useEffect } from 'react';
import Note from './noteType';

type NotesLoaderProps = {
  onLoad: (notes: Note[]) => void;
};

const NotesLoader: React.FC<NotesLoaderProps> = ({ onLoad }) => {
  useEffect(() => {
    const fetchDataFromLocalStorage = async () => {
      try {
        const keys = Object.keys(localStorage);
        const notes: Note[] = [];

        keys.forEach(key => {
          if (key.startsWith('notesGroup_')) {
            const dataFromLocalStorage = localStorage.getItem(key);
            if (dataFromLocalStorage !== null) {
              const notesForColor = JSON.parse(dataFromLocalStorage) as Note[];
              notes.push(...notesForColor);
            }
          }
        });

        onLoad(notes);
      } catch (error) {
        console.error('Error fetching data from local storage:', error);
      }
    };

    fetchDataFromLocalStorage();
  }, [onLoad]);
  return null;
};

export default NotesLoader;
