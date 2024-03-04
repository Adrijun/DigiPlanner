import React, { useState } from 'react';
import NotesLoader from '../utils/NotesLoader';
import Note from '../utils/noteType';
import '../assets/styles/Priority.scss';
import AcceptIcon from '../assets/icons/accept.png';
import { Row, Col, ProgressBar } from 'react-bootstrap';
import Lists from '../components/Lists';

const Priority = () => {
  const [pinkNotes, setPinkNotes] = useState<Note[]>([]);
  const [greenNotes, setGreenNotes] = useState<Note[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [buttonClickedList, setButtonClickedList] = useState<boolean[]>([]);
  const handleLoadNotes = (notes: Note[]) => {
    if (!loaded) {
      const pinkNotes = notes.filter(note => note.color === '#ffd6de');
      const greenNotes = notes.filter(note => note.color === '#b0ffca');

      setPinkNotes(pinkNotes);
      setGreenNotes(greenNotes);
      setLoaded(true);
    }
  };

  const calculateProgress = () => {
    const totalButtons = buttonClickedList.length;
    const clickedButtons = buttonClickedList.filter(button => button).length;
    console.log(totalButtons, 'totalButtons');
    return (clickedButtons / totalButtons) * 100;
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
                buttonClickedList={buttonClickedList}
                setButtonClickedList={setButtonClickedList}
              />
            </Col>
            <Col sm={6} lg={4}>
              {greenNotes.length > 0 && (
                <Lists
                  notes={greenNotes}
                  color="green"
                  buttonClickedList={buttonClickedList}
                  setButtonClickedList={setButtonClickedList}
                />
              )}
            </Col>
          </Row>
        )}
      </section>
      <Col className=" w-100 mt-5">
        <section className="w-100 d-flex justify-content-center ">
          <ProgressBar
            className=" w-50"
            now={calculateProgress()}
            label={`${calculateProgress().toFixed(2)}%`}
          />
        </section>
      </Col>
    </main>
  );
};

export default Priority;
