import Control from './Engine/game/Controls';
import Game from './Engine/game/Game';
import Player from './Engine/game/Player';
import Scene from './Engine/game/Scene';
import { AnimationType } from './Engine/types/object/AnimatedObject';
import { GameObjectTypes } from './Engine/types/object/GameObject';
import { default as GameMap } from './Engine/map/Map';

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
animations.set('walk_down', {
  frames: 8,
  index: 5,
  name: 'walk_down',
  time: 1000,
});
animations.set('walk_up', {
  frames: 8,
  index: 6,
  name: 'walk_up',
  time: 1000,
});
animations.set('walk_right', {
  frames: 8,
  index: 7,
  name: 'walk_right',
  time: 1000,
});
animations.set('walk_left', {
  frames: 8,
  index: 8,
  name: 'walk_left',
  time: 1000,
});
const lizzys = new Player({
  entity: {
    animatedObject: {
      animations,
      gameObject: {
        height: 48,
        width: 48,
        id: 'lizzys',
        src: 'lizzys.png',
        x: 50,
        y: 50,
        type: GameObjectTypes.PLAYER,
      },
    },
    maxSpeed: 2,
  },
  name: 'Lizzys',
});

const CANVAS_ID = 'game';

const map = new GameMap({
  src: 'mini_test_2.tmj',
  name: 'test con textura test',
});

const scene = new Scene({
  map,
  name: 'SCENE_TEST',
  player: lizzys,
});

const control = new Control();

const game = new Game({
  canvasId: CANVAS_ID,
  control,
  initialScene: scene,
});

await game.init();

console.log('Prrueba');
