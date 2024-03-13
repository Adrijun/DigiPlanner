import React from 'react';
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
  // Dela upp anteckningarna efter färg
  const notesByColor: { [key: string]: Note[] } = {};
  notes.forEach(note => {
    if (!notesByColor[note.color]) {
      notesByColor[note.color] = [];
    }
    notesByColor[note.color].push(note);
  });

  return (
    <section className="column">
      <Row>
        {Object.entries(notesByColor).map(([color, colorNotes]) => (
          <Col sm={6} md={4} key={color}>
            <article
              className="priority-column-article m-3 p-3 rounded"
              style={{
                backgroundColor: color,
              }}
            >
              <SortableContext
                items={colorNotes}
                strategy={verticalListSortingStrategy}
              >
                {colorNotes.map((note, index) => (
                  <ul
                    key={note.id}
                    className={`${color}-ul m-2 p-1 rounded task-item`}
                  >
                    <ListItem
                      id={note.id}
                      text={note.text}
                      key={note.id}
                      color={color}
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
        ))}
      </Row>
    </section>
  );
};

export default PriorityColumn;
