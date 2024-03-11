import React, { useState } from 'react';
import Note from '../utils/noteType';
import { Row, Col } from 'react-bootstrap';
import '../assets/styles/PriorityColumn.scss';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import ListItem from './ListItem';

interface PriorityColumnProps {
  notes: Note[];
  onNoteButtonClick: (id: string, clicked: boolean) => void;
}

const PriorityColumn: React.FC<PriorityColumnProps> = ({
  notes,
  onNoteButtonClick,
}) => {
  const pinkNotes = notes.filter(note => note.color === '#ffd6de');
  const greenNotes = notes.filter(note => note.color === '#b0ffca');
  const pinkColor = '#ff78aa';
  const greenColor = '#b0ffca';

  return (
    <section className="column">
      <Row>
        <Col sm={6} md={4}>
          <article
            className="priority-column-article m-3 p-3 rounded"
            style={{
              backgroundColor: pinkColor,
            }}
          >
            <SortableContext
              items={pinkNotes}
              strategy={verticalListSortingStrategy}
            >
              {pinkNotes.map((note, index) => (
                <ul key={note.id} className="pink-ul m-2 p-1 rounded task-item">
                  <ListItem
                    id={note.id}
                    text={note.text}
                    key={note.id}
                    color="pink"
                    index={index}
                    onButtonClick={(id, clicked) =>
                      onNoteButtonClick(id, clicked)
                    }
                  />
                </ul>
              ))}
            </SortableContext>
          </article>
        </Col>
        <Col sm={6} md={4}>
          <article
            className="priority-column-article m-3 p-3 rounded "
            style={{
              backgroundColor: greenColor,
            }}
          >
            <SortableContext
              items={greenNotes}
              strategy={verticalListSortingStrategy}
            >
              {greenNotes.map((note, index) => (
                <ul
                  key={note.id}
                  className="green-ul m-2 p-1 rounded task-item"
                >
                  <ListItem
                    id={note.id}
                    text={note.text}
                    key={note.id}
                    color="green"
                    index={index}
                    onButtonClick={(id, clicked) =>
                      onNoteButtonClick(id, clicked)
                    }
                  />
                </ul>
              ))}
            </SortableContext>
          </article>
        </Col>
      </Row>
    </section>
  );
};

export default PriorityColumn;
