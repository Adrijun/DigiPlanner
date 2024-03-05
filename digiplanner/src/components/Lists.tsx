import React from 'react';
import AcceptIcon from '../assets/icons/accept.png';
import NotDoneIcon from '../assets/icons/notdone.png';
import '../assets/styles/Lists.scss';

interface ListsProps {
  notes: {
    id: string;
    text: string;
  }[];
  color: string;
  buttonClickedList: boolean[];
  setButtonClickedList: (updatedList: boolean[]) => void;
}

const Lists: React.FC<ListsProps> = ({
  notes,
  color,
  buttonClickedList,
  setButtonClickedList,
}) => {
  const handleClick = (index: number) => {
    const updatedButtonClickedList = [...buttonClickedList];
    updatedButtonClickedList[index] = !updatedButtonClickedList[index];
    setButtonClickedList(updatedButtonClickedList);
  };

  return (
    <article className={`${color}-priority-article m-3 p-3 rounded `}>
      <ul className="color-ul">
        {notes.map((note, i) => (
          <li className={`${color}-li m-2 p-1 rounded`} key={note.id}>
            <div className="align-self-center">
              <button
                className={'accept-button'}
                onClick={() => handleClick(i)}
              >
                <img
                  src={buttonClickedList[i] ? AcceptIcon : NotDoneIcon}
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
    </article>
  );
};

export default Lists;
