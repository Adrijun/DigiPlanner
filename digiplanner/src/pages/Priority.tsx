import React, { useState } from 'react';
import NotesLoader from '../utils/NotesLoader';
import Note from '../utils/noteType';
import '../assets/styles/Priority.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, ProgressBar } from 'react-bootstrap';
import Lists from '../components/Lists';

const Priority = () => {
  const [pinkNotes, setPinkNotes] = useState<Note[]>([]);
  const [greenNotes, setGreenNotes] = useState<Note[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [pinkButtonClickedList, setPinkButtonClickedList] = useState<boolean[]>(
    []
  );
  const [greenButtonClickedList, setGreenButtonClickedList] = useState<
    boolean[]
  >([]);

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
        {greenNotes.length > 0 && pinkNotes.length > 0 && (
          <Row>
            <Col sm={6} lg={4}>
              <Lists
                notes={pinkNotes}
                color="pink"
                buttonClickedList={pinkButtonClickedList}
                setButtonClickedList={setPinkButtonClickedList}
              />
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
        )}
      </section>
      <Col className=" w-100 mt-5">
        {greenNotes.length > 0 && pinkNotes.length > 0 && (
          <section className="w-100 d-flex justify-content-center ">
            <ProgressBar
              // variant="custom"
              className="custom-progress-bar w-75 md-50 progress-bar-with-border "
              now={calculateProgress().progress}
              label={calculateProgress().labelText}
              style={{
                height: '30px',
                fontSize: '14px',
                borderRadius: '15px',
              }}
            />
          </section>
        )}
      </Col>
    </main>
  );
};

export default Priority;
