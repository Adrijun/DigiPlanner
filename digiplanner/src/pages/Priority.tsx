import React, { useEffect, useState } from 'react';
import NotesLoader from '../utils/NotesLoader';
import Note from '../utils/noteType';
import '../assets/styles/Priority.scss';
import AcceptIcon from '../assets/icons/accept.png';
import { Row, Col } from 'react-bootstrap';
import Lists from '../components/Lists';

const Priority = () => {
  const [pinkNotes, setPinkNotes] = useState<Note[]>([]);
  const [greenNotes, setGreenNotes] = useState<Note[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false); // Lägg till en state för att hålla reda på om anteckningarna har laddats

  const handleLoadNotes = (notes: Note[]) => {
    if (!loaded) {
      // Kolla om anteckningarna redan har laddats
      const pinkNotes = notes.filter(note => note.color === '#ffd6de');
      const greenNotes = notes.filter(note => note.color === '#95fcd2');

      setPinkNotes(pinkNotes);
      setGreenNotes(greenNotes);
      setLoaded(true); // Sätt loaded till true för att undvika ytterligare anrop av handleLoadNotes
    }
  };

  return (
    <main className="priority-main">
      <section className="priority-container p-4 ">
        <NotesLoader onLoad={handleLoadNotes} />

        <Row>
          <Col Col sm={6} lg={4}>
            <article className="color-priority-article m-3 p-3 rounded  ">
              {pinkNotes.length > 0 && (
                <ul className="pink-ul">
                  {pinkNotes.map(note => (
                    <li className="pink-li m-2 p-1 rounded " key={note.id}>
                      <div className=" align-self-center">
                        <button className="accept-button">
                          <img
                            src={AcceptIcon}
                            className="acceptIcon"
                            alt=""
                            width="20"
                            height="20"
                          />
                        </button>
                        {note.text}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </Col>

          <Col Col sm={6} lg={4}>
            <Lists notes={pinkNotes} color="pink" />
          </Col>
          <Col Col sm={6} lg={4}>
            <Lists notes={greenNotes} color="green" />
          </Col>
        </Row>
      </section>
    </main>
  );
};

export default Priority;
