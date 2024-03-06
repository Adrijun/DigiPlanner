import React, { useState, useEffect } from 'react';
import NotesLoader from '../utils/NotesLoader';
import Note from '../utils/noteType';
import '../assets/styles/Priority.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, ProgressBar } from 'react-bootstrap';
import Lists from '../components/Lists';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import ClearLocalStorageButton from '../utils/ClearLocalStorageButton';
const Priority = () => {
  const { width, height } = useWindowSize();
  const [pinkNotes, setPinkNotes] = useState<Note[]>([]);
  const [greenNotes, setGreenNotes] = useState<Note[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [pinkButtonClickedList, setPinkButtonClickedList] = useState<boolean[]>(
    []
  );
  const [greenButtonClickedList, setGreenButtonClickedList] = useState<
    boolean[]
  >([]);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showClearLocalStorage, setShowClearLocalStorage] =
    useState<boolean>(false);
  useEffect(() => {
    if (
      pinkButtonClickedList.every(button => button) &&
      greenButtonClickedList.every(button => button)
    ) {
      setShowConfetti(true);
      setShowClearLocalStorage(true);
    } else {
      setShowConfetti(false);
      setShowClearLocalStorage(false);
    }
  }, [pinkButtonClickedList, greenButtonClickedList]);

  const handleLoadNotes = (notes: Note[]) => {
    if (!loaded) {
      const pinkNotes = notes.filter(note => note.color === '#ffd6de');
      const greenNotes = notes.filter(note => note.color === '#b0ffca');

      setPinkNotes(pinkNotes);
      setGreenNotes(greenNotes);
      setPinkButtonClickedList(Array(pinkNotes.length).fill(false));
      setGreenButtonClickedList(Array(greenNotes.length).fill(false));
      setLoaded(true);
    }
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
    const totalButtons =
      pinkButtonClickedList.length + greenButtonClickedList.length;
    const clickedButtons =
      pinkButtonClickedList.filter(button => button).length +
      greenButtonClickedList.filter(button => button).length;
    const progress = (clickedButtons / totalButtons) * 100;
    const labelText = getProgressText(progress);
    return { progress, labelText };
  };
  return (
    <main className="priority-main">
      <section className="priority-container p-4 ">
        <NotesLoader onLoad={handleLoadNotes} />
        {/* {pinkNotes.length > 0 ||
          (greenNotes.length > 0 && ( */}
        <Row>
          <Col sm={6} lg={4}>
            {pinkNotes.length > 0 && (
              <Lists
                notes={pinkNotes}
                color="pink"
                buttonClickedList={pinkButtonClickedList}
                setButtonClickedList={setPinkButtonClickedList}
              />
            )}
          </Col>
          <Col sm={6} lg={4}>
            {greenNotes.length > 0 && (
              <Lists
                notes={greenNotes}
                color="green"
                buttonClickedList={greenButtonClickedList}
                setButtonClickedList={setGreenButtonClickedList}
              />
            )}
          </Col>
        </Row>
      </section>
      <Col className=" w-100 mt-5">
        {(greenNotes.length > 0 || pinkNotes.length > 0) && (
          <section className="w-100 d-flex justify-content-center ">
            <ProgressBar
              // variant="custom"
              className="custom-progress-bar w-75 md-50 progress-bar-with-border "
              now={calculateProgress().progress}
              label={calculateProgress().labelText}
              style={{
                height: '2rem',
                fontSize: '1.2rem',
                borderRadius: '15px',
              }}
            />
          </section>
        )}
        {showClearLocalStorage &&
          (greenNotes.length > 0 || pinkNotes.length > 0) && (
            <ClearLocalStorageButton
              onClear={() => setShowClearLocalStorage(false)}
            />
          )}
        {showConfetti &&
          showClearLocalStorage &&
          (greenNotes.length > 0 || pinkNotes.length > 0) && (
            <Confetti width={width} height={height} />
          )}
      </Col>
    </main>
  );
};

export default Priority;
