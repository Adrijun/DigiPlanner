import React from 'react';
import AcceptIcon from '../assets/icons/accept.png';
import '../assets/styles/Lists.scss';
interface NoteProps {
  notes: {
    id: number;
    text: string;
  }[];
  color: string;
}

const Lists: React.FC<NoteProps> = ({ notes, color }) => {
  return (
    <article className={`${color}-priority-article m-3 p-3 rounded `}>
      {notes.length > 0 && (
        <ul className={`${color}-ul`}>
          {notes.map(note => (
            <li className={`${color}-li m-2 p-1 rounded`} key={note.id}>
              <div className="align-self-center">
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
  );
};

export default Lists;
