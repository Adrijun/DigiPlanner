import React, { useState, useRef } from 'react';
import '../assets/styles/StickyNotes.scss';

type StickyNoteProps = {
  color: string;
  x: number;
  y: number;
};

const StickyNotes: React.FC<StickyNoteProps> = ({ color, x, y }) => {
  const [isMoveAllowed, setIsMoveAllowed] = useState<boolean>(false);
  const stickyNoteRef = useRef<HTMLDivElement>(null);

  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);

  const handleMouseDown: React.MouseEventHandler<HTMLTextAreaElement> = e => {
    setIsMoveAllowed(true);
    const dimensions = stickyNoteRef.current?.getBoundingClientRect();

    if (dimensions) {
      setDx(e.clientX - dimensions.x);
      setDy(e.clientY - dimensions.y);
    }
  };

  const handleMouseMove: React.MouseEventHandler<HTMLTextAreaElement> = e => {
    if (isMoveAllowed && stickyNoteRef.current) {
      const x = e.clientX - dx;
      const y = e.clientY - dy;
      stickyNoteRef.current.style.left = x + 'px';
      stickyNoteRef.current.style.top = y + 'px';
    }
  };
  const handleMouseUp = () => {
    setIsMoveAllowed(false);
  };

  // For touch events

  const handleTouchStart: React.TouchEventHandler<HTMLTextAreaElement> = e => {
    setIsMoveAllowed(true);
    const dimensions = stickyNoteRef.current?.getBoundingClientRect();

    if (dimensions) {
      setIsMoveAllowed(true);
      const dimensions = stickyNoteRef.current?.getBoundingClientRect();

      if (dimensions) {
        setDx(e.touches[0].clientX - dimensions.x);
        setDy(e.touches[0].clientY - dimensions.y);
      }
    }
  };

  const handleTouchMove: React.TouchEventHandler<HTMLTextAreaElement> = e => {
    if (isMoveAllowed && stickyNoteRef.current) {
      const x = e.touches[0].clientX - dx;
      const y = e.touches[0].clientY - dy;
      stickyNoteRef.current.style.left = x + 'px';
      stickyNoteRef.current.style.top = y + 'px';
    }
  };

  const handleTouchEnd = () => {
    setIsMoveAllowed(false);
  };

  return (
    <div
      className="sticky-note"
      style={{ backgroundColor: color, left: x + 'px', top: y + 'px' }}
      ref={stickyNoteRef}
    >
      <textarea
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      ></textarea>
    </div>
  );
};

export default StickyNotes;
