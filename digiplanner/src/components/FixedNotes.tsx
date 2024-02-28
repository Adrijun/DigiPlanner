// FixedNotes.tsx
import React from 'react';

type FixedNotesProps = {
  color: string;
  onAddNote: (color: string, x: number, y: number) => void;
};

const FixedNotes: React.FC<FixedNotesProps> = ({ color, onAddNote }) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onAddNote(color, e.clientX, e.clientY);
  };

  return (
    <div
      onClick={handleClick}
      className="fixed-notes"
      style={{ backgroundColor: color }}
    ></div>
  );
};

export default FixedNotes;
