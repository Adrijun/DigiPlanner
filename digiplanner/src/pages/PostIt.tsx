import React from 'react';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';
import rectangles from '../utils/rectangles';
function PostIt() {
  const moveRect = () => {
    console.log('hej');
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {rectangles.map((rect, index) => (
          <Rect key={index} {...rect} onClick={moveRect}></Rect>
        ))}
      </Layer>
    </Stage>
  );
}

export default PostIt;
