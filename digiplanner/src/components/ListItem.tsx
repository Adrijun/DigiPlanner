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
}
const ListItem: React.FC<ListItemProps> = ({
  text,
  id,
  color,
  index,
  onButtonClick,
}) => {
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const handleButtonClick = () => {
    const newButtonClicked = !buttonClicked;
    setButtonClicked(newButtonClicked);
    onButtonClick(id, newButtonClicked);
  };

  const style = { transform: CSS.Transform.toString(transform), transition };
  console.log(index, 'index');
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
          <button className={'accept-button'} onDoubleClick={handleButtonClick}>
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
