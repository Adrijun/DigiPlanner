type Rectangle = {
  [x: string]: any;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
  draggable: boolean;
  original: boolean;
};

type RectangleGroup = {
  color: string;
  rectangles: Rectangle[];
};

const rectangles: RectangleGroup[] = [
  {
    color: 'rgb(255,120,170)',
    rectangles: [
      {
        x: 10,
        y: 10,
        width: 50,
        height: 50,
        fill: 'rgb(255,120,170)',
        shadowBlur: 5,
        shadowOffsetX: 2,
        shadowOffsetY: 2,
        draggable: true,
        original: true,
      },
    ],
  },
  {
    color: 'rgb(149,252,210)',
    rectangles: [
      {
        x: 70,
        y: 10,
        width: 50,
        height: 50,
        fill: 'rgb(149,252,210)',
        shadowBlur: 5,
        shadowOffsetX: 2,
        shadowOffsetY: 2,
        draggable: true,
        original: true,
      },
    ],
  },
  {
    color: 'rgb(255,194,109)',
    rectangles: [
      {
        x: 130,
        y: 10,
        width: 50,
        height: 50,
        fill: 'rgb(255,194,109)',
        shadowBlur: 5,
        shadowOffsetX: 2,
        shadowOffsetY: 2,
        draggable: true,
        original: true,
      },
    ],
  },
  {
    color: 'rgb(71,201,227)',
    rectangles: [
      {
        x: 190,
        y: 10,
        width: 50,
        height: 50,
        fill: 'rgb(71,201,227)',
        shadowBlur: 5,
        shadowOffsetX: 2,
        shadowOffsetY: 2,
        draggable: true,
        original: true,
      },
    ],
  },

  // ... andra färggrupper
];

export default rectangles;
