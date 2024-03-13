import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import AcceptIcon from '../assets/icons/accept.png';
import NotDoneIcon from '../assets/icons/notdone.png';
import '../assets/styles/ListItem.scss';
interface ListItemProps {
  id: string;
  text: string;
  color: string;
  index: number;
  onButtonClick: (id: string, clicked: boolean) => void;
  buttonState: boolean;
}
const ListItem: React.FC<ListItemProps> = ({
  text,
  id,
  color,
  index,
  onButtonClick,
  buttonState,
}) => {
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const handleButtonClick = () => {
    setTimeout(() => {
      // Om användaren inte klickar igen inom tidsgränsen, räkna som enkelt klick
      setButtonClicked(!buttonClicked);
    }, 300); // Justera tidsgränsen efter behov
    const newButtonState = !buttonClicked;
    setButtonClicked(newButtonState);

    onButtonClick(id, newButtonState);
  };
  const style = { transform: CSS.Transform.toString(transform), transition };
  return (
    <>
      <li
        className=" p-1 rounded task-item"
        key={id}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
      >
        <div
          className="d-flex justify-content-between align-items-center"
          style={{ wordBreak: 'break-word' }}
        >
          <p>{text}</p>
          <button
            className={`accept-button ${buttonClicked ? 'pop-out' : ''}`}
            onClick={handleButtonClick}
          >
            <img
              src={buttonClicked ? AcceptIcon : NotDoneIcon}
              className="acceptIcon"
              alt=""
              width="20"
              height="20"
            />
          </button>
        </div>
      </li>
    </>
  );
};

export default ListItem;
