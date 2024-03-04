import React, { useState, useRef, useEffect } from 'react';
import '../assets/styles/StickyNotes.scss';
import Note from '../utils/noteType';
import removeIcon from '../assets/icons/remove.png';

type StickyNoteProps = {
  note: Note;
  onClose: () => void;
  onNoteChange: (
    id: string,
    color: string,
    text: string,
    currentY: number,
    currentX: number
  ) => void;
};

const StickyNotes: React.FC<StickyNoteProps> = ({
  note,
  onNoteChange,
  onClose,
}) => {
  const { color, x, y, id, text } = note;
  const [isMoveAllowed, setIsMoveAllowed] = useState<boolean>(false);
  const stickyNoteRef = useRef<HTMLDivElement>(null);

  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);
  const [currentX, setCurrentX] = useState(x);
  const [currentY, setCurrentY] = useState(y);
  useEffect(() => {
    setCurrentX(x);
    setCurrentY(y);
  }, [x, y]);

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
  const handleMouseUp: React.MouseEventHandler<HTMLTextAreaElement> = e => {
    setIsMoveAllowed(false);

    const updatedX = e.clientX - dx;
    const updatedY = e.clientY - dy;
    setCurrentX(updatedX);
    setCurrentY(updatedY);

    onNoteChange(id, color, text, updatedX, updatedY);
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

  const handleTouchEnd: React.TouchEventHandler<HTMLTextAreaElement> = e => {
    setIsMoveAllowed(false);
    const clientX = e.changedTouches[0].clientX - dx;
    const clientY = e.changedTouches[0].clientY - dy;
    setCurrentX(clientX);
    setCurrentY(clientY);
    onNoteChange(id, color, text, clientX, clientY);
  };

  return (
    <div
      className="sticky-note"
      style={{ backgroundColor: color, left: x + 'px', top: y + 'px' }}
      ref={stickyNoteRef}
    >
      <header className="sticky-note-header">
        <button
          onClick={onClose}
          className="sticky-note-closebutton"
          style={{
            border: 'none',
            background: 'none',
            padding: '0',
            cursor: 'pointer',
          }}
        >
          <img
            className="sticky-note-closebutton-icon"
            src={removeIcon}
            alt=""
            width="20"
            height="20"
          />
        </button>
      </header>
      <textarea
        value={text}
        onChange={e =>
          onNoteChange(id, color, e.target.value, currentX, currentY)
        }
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
