type Rectangle = {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
};

const rectangles: Rectangle[] = [
  {
    x: 10,
    y: 10,
    width: 50,
    height: 50,
    fill: 'rgb(255,120,170',
    shadowBlur: 5,
    shadowOffsetX: 2,
    shadowOffsetY: 2,
  },
  {
    x: 70,
    y: 10,
    width: 50,
    height: 50,
    fill: 'rgb(149,252,210)',
    shadowBlur: 5,
    shadowOffsetX: 2,
    shadowOffsetY: 2,
  },
  {
    x: 130,
    y: 10,
    width: 50,
    height: 50,
    fill: 'rgb(255,194,109)',
    shadowBlur: 5,
    shadowOffsetX: 2,
    shadowOffsetY: 2,
  },
  {
    x: 10,
    y: 10,
    width: 50,
    height: 50,
    fill: 'rgb(71,201,227)',
    shadowBlur: 5,
    shadowOffsetX: 2,
    shadowOffsetY: 2,
  },
];

export default rectangles;
