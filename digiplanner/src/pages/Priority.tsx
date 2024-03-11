import React, { useState, useEffect } from 'react';
import NotesLoader from '../utils/NotesLoader';
import Note from '../utils/noteType';
import '../assets/styles/Priority.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, ProgressBar } from 'react-bootstrap';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import {
  DndContext,
  closestCorners,
  useSensors,
  useSensor,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
} from '@dnd-kit/core';
import PriorityColumn from '../components/PriorityColumn';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import ClearLocalStorageButton from '../utils/ClearLocalStorageButton';

const Priority = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showClearLocalStorage, setShowClearLocalStorage] =
    useState<boolean>(false);

  const handleLoadNotes = (loadedNotes: Note[]) => {
    if (!loaded) {
      setNotes(loadedNotes);
      setLoaded(true);
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setNotes(notes => {
      const originalIndex = notes.findIndex(note => note.id === active.id);
      const newIndex = notes.findIndex(note => note.id === over.id);
      const updatedNotes = arrayMove(notes, originalIndex, newIndex);

      return updatedNotes;
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleNoteButtonClick = (id: string, clicked: boolean) => {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, clicked } : note
    );
    setNotes(updatedNotes);
  };

  const getProgressText = (progress: number): string => {
    if (progress >= 100) {
      return 'Finished!';
    } else if (progress >= 80) {
      return 'Almost done!';
    } else if (progress >= 50) {
      return 'Halfway there!';
    } else {
      return 'Good start!';
    }
  };

  const calculateProgress = (): { progress: number; labelText: string } => {
    const totalButtons = notes.length;
    const clickedButtons = notes.filter(note => note.clicked).length;
    const progress = (clickedButtons / totalButtons) * 100;
    const labelText = getProgressText(progress);
    return { progress, labelText };
  };

  useEffect(() => {
    if (calculateProgress().progress === 100) {
      setShowConfetti(true);
      setShowClearLocalStorage(true);
    } else {
      setShowConfetti(false);
      setShowClearLocalStorage(false);
    }
  }, [notes]);

  return (
    <main className="priority-main ">
      <section className="priority-container p-4 ">
        <NotesLoader onLoad={handleLoadNotes} />
        {loaded && notes.length > 0 && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
          >
            <PriorityColumn
              notes={notes}
              onNoteButtonClick={(id, clicked) =>
                handleNoteButtonClick(id, clicked)
              }
            />
          </DndContext>
        )}
      </section>
      <Row>
        <Col className=" w-100 mt-5">
          <section className="w-100 d-flex justify-content-center ">
            {notes.length > 0 && (
              <ProgressBar
                className="custom-progress-bar w-75 md-50 progress-bar-with-border"
                now={calculateProgress().progress}
                label={calculateProgress().labelText}
                style={{
                  height: '2rem',
                  fontSize: '1.2rem',
                  borderRadius: '15px',
                }}
              />
            )}
          </section>
        </Col>
      </Row>
      {showConfetti && showClearLocalStorage && (
        <Confetti width={width} height={height} />
      )}
      {showConfetti && showClearLocalStorage && (
        <ClearLocalStorageButton
          onClear={() => setShowClearLocalStorage(false)}
        />
      )}
    </main>
  );
};

export default Priority;
