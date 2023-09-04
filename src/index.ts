import Control from './Engine/objets/Controls';
import Entity, { AnimationType } from './Engine/objets/Entity';
import Game from './Engine/objets/Game';
import Scene from './Engine/objets/Scene';

const CANVAS_ID = 'game';

const control = new Control();

const testScene = new Scene({
  name: 'SCENE_1',
  mapSrc: 'map1',
});

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

const lizzys = new Entity({
  gameObject: {
    height: 48,
    widht: 48,
    id: 'lizzys',
    src: 'lizzys.png',
    x: 50,
    y: 50,
  },
  maxSpeed: 2,
  animations,
});
testScene.addGameObject(lizzys);

const game = new Game(CANVAS_ID, control, testScene);

await game.init();
