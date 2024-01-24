import React, { useState } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import rectangles from '../utils/rectangles';

function PostIt() {
  // State to manage the rectangles data
  const [rectanglesState, setRectanglesState] = useState(rectangles);

  // Function to create a new draggable rectangle
  const createNewRectangle = (groupIndex: number, rectIndex: number) => {
    // Copy the current state to avoid mutations
    const updatedGroups = [...rectanglesState];

    // Get the original rectangle that was clicked
    const originalRectangle = updatedGroups[groupIndex].rectangles[rectIndex];

    // Check if the clicked rectangle is the original one
    if (!originalRectangle.original) {
      return;
    }

    // Create a new rectangle based on the original one with an offset
    const newRectangle = {
      ...originalRectangle,
      x: originalRectangle.x + 10,
      y: originalRectangle.y + 10,
      draggable: true,
      original: false,
    };

    // Update the existing rectangle to be undraggable
    updatedGroups[groupIndex].rectangles[rectIndex].draggable = false;

    // Push the new rectangle to the array
    updatedGroups[groupIndex].rectangles.push(newRectangle);

    // Update the state with the modified rectangles array
    setRectanglesState(updatedGroups);
  };

  // Helper function to create a new rectangle when clicked
  const newRect = (groupIndex: number, rectIndex: number) => {
    createNewRectangle(groupIndex, rectIndex);
  };

  // Handle drag move event for a rectangle
  const handleDragMove = (groupIndex: number, rectIndex: number) => {
    // Get the dragged rectangle from the state
    const draggedRectangle = rectanglesState[groupIndex].rectangles[rectIndex];

    // Custom logic to change style dynamically during drag move
    setRectanglesState(prevRectangles => {
      // Copy the current state to avoid mutations
      const updatedRectangles = [...prevRectangles];

      updatedRectangles[groupIndex].rectangles[rectIndex] = {
        ...draggedRectangle,
        width: 100,
        height: 100,
      };

      return updatedRectangles;
    });
  };

  // Handle drag end event for a group of rectangles
  const handleDragEnd = (groupIndex: number) => {
    console.log(`DragEnd: Group ${groupIndex}`);
  };

  // Render the React Konva stage and rectangles
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {/* Map through the rectangles state and render each group */}
        {rectanglesState.map((group, groupIndex) => (
          <React.Fragment key={groupIndex}>
            {/* Map through rectangles in each group and render them */}
            {group.rectangles.map((rect, rectIndex) => (
              <Rect
                key={rectIndex}
                {...rect}
                onClick={() => newRect(groupIndex, rectIndex)} // Pass both indices to newRect
                draggable={!rect.original}
                onDragMove={() => handleDragMove(groupIndex, rectIndex)}
                onDragEnd={() => handleDragEnd(groupIndex)}
              />
            ))}
          </React.Fragment>
        ))}
      </Layer>
    </Stage>
  );
}

export default PostIt;
