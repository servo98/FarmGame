import Control from './Engine/objets/Controls';
import { AnimationType } from './Engine/objets/AnimatedObject';
import Game from './Engine/objets/Game';
import GameMap from './Engine/objets/Map';
import Player from './Engine/objets/Player';
import Scene from './Engine/objets/Scene';

const CANVAS_ID = 'game';

const animations = new Map<string, AnimationType>();
animations.set('idle_down', {
  frames: 8,
  index: 1,
  name: 'idle_down',
  time: 1000,
});

animations.set('idle_up', {
  frames: 8,
  index: 2,
  name: 'idle_up',
  time: 1000,
});

animations.set('idle_left', {
  frames: 8,
  index: 3,
  name: 'idle_left',
  time: 1000,
});

animations.set('idle_right', {
  frames: 8,
  index: 4,
  name: 'idle_right',
  time: 1000,
});

const lizzys = new Player({
  name: 'Lizzys player',
  object: {
    gameObject: {
      height: 48,
      width: 48,
      id: 'lizzys',
      src: 'lizzys.png',
      x: 50,
      y: 50,
    },
    animated: {
      maxSpeed: 1,
      animations,
    },
  },
});
const map = new GameMap({
  src: 'map1',
});

const testScene = new Scene({
  name: 'SCENE_1',
  map,
  player: lizzys,
});

testScene.addGameObject(lizzys);
const control = new Control();

const game = new Game({
  canvasId: CANVAS_ID,
  control,
  initialScene: testScene,
});

await game.init();
