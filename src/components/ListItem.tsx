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
  // const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  // const { attributes, listeners, setNodeRef, transform, transition } =
  //   useSortable({ id });

  const [lastClickTime, setLastClickTime] = useState<number>(0);
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  // Mobile devices
  const handleTouchStart = () => {
    const now = Date.now();
    const doubleClickDelay = 300; //Adjusting needs

    if (now - lastClickTime < doubleClickDelay) {
      // If the time between presses is short enough, interpret it as a double click.
      setButtonClicked(!buttonClicked);
      onButtonClick(id, !buttonClicked);
    }

    setLastClickTime(now);
  };
  // Desktop devices
  const handleButtonClick = () => {
    const newButtonState = !buttonClicked;
    setButtonClicked(newButtonState);

    onButtonClick(id, newButtonState);
  };
  // Keyboard support
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter') {
      handleButtonClick();
    }
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
            onDoubleClick={handleButtonClick}
            onKeyDown={handleKeyDown}
            onTouchStart={handleTouchStart}
            tabIndex={0}
          >
            <img
              src={buttonClicked ? AcceptIcon : NotDoneIcon}
              className="acceptIcon"
              alt=""
              width="25"
              height="25"
            />
          </button>
        </div>
      </li>
    </>
  );
};

export default ListItem;
