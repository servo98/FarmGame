import Entity from './Entity';
const canvas = document.getElementById('game') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const screenWidth = window.innerWidth;
const screeenHeight = window.innerHeight;

const rects: Entity[] = [
  new Entity({
    height: 100,
    widht: 100,
    id: 'rect1',
    x: 0,
    y: 0,
  }),
  new Entity({
    height: 100,
    widht: 100,
    id: 'rect2',
    x: 0,
    y: 200,
  }),
  new Entity({
    height: 100,
    widht: 100,
    id: 'rect3',
    x: 0,
    y: 400,
  }),
  new Entity({
    height: 100,
    widht: 100,
    id: 'rect4',
    x: 0,
    y: 600,
  }),
];

const readInput = () => {};

const update = () => {
  rects.forEach((rect) => {
    rect.update();
  });
};

const render = () => {
  ctx.clearRect(0, 0, screenWidth, screeenHeight);
  rects.forEach((rect) => {
    rect.render(ctx);
  });
};

const gameLoop = () => {
  //leer input
  readInput();
  //update
  update();
  //render
  render();
};

const init = () => {
  console.log('INIT');

  const idInterval = setInterval(gameLoop, 60 / 1000);
};

const setupt = () => {
  console.log('SETUP');

  canvas.width = screenWidth;
  canvas.height = screeenHeight;
};

setupt();

init();
