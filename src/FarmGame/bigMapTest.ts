import { AnimationType } from '../Engine/_types/object/AnimatedGameObject';
import Camera from '../Engine/game/Camera';
import Control from '../Engine/game/Control';
import Game from '../Engine/game/Game';
import Player from '../Engine/game/Player';
import Scene from '../Engine/game/Scene';
import GameMap from '../Engine/map/GameMap';
import Button from '../Engine/ui/Button';
import Cursor from '../Engine/ui/Cursor';
import GameInterface from '../Engine/ui/GameInterface';
import UIElement from '../Engine/ui/UIElement';

let isAlreadyPLaying = false;
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
  time: 800,
});
animations.set('walk_left', {
  frames: 8,
  index: 8,
  name: 'walk_left',
  time: 1000,
});
const player = new Player({
  animations,
  height: 48,
  width: 48,
  id: 'lizzys',
  maxSpeed: 2,
  src: 'lizzys.png',
  sx: 0,
  sy: 0,
  x: window.innerWidth / 2 - 48,
  y: window.innerHeight / 2 - 48,
  name: 'Lizzys',
});

const CANVAS_ID = 'game';

const map = new GameMap({
  src: 'big_test.tmj',
  name: 'test con textura test',
});

const camera = new Camera({
  x: 0,
  y: 0,
  width: window.innerWidth,
  height: window.innerHeight,
  maxSpeed: 2,
  zoom: 3,
});

const cursorAnimationsMap = new Map<string, AnimationType>();

cursorAnimationsMap.set('cursor', {
  frames: 1,
  index: 3,
  name: 'cursor',
  time: 1,
});
cursorAnimationsMap.set('pointer', {
  frames: 1,
  index: 2,
  name: 'pointer',
  time: 1,
});

cursorAnimationsMap.set('click', {
  frames: 1,
  index: 1,
  name: 'click',
  time: 1,
});

const elements = new Map<string, UIElement>();

const button1Animations = new Map<string, AnimationType>();
button1Animations.set('button', {
  frames: 1,
  index: 1,
  name: 'button',
  time: 100,
});
button1Animations.set('click', {
  frames: 3,
  index: 2,
  name: 'click',
  time: 100,
});
button1Animations.set('clicked', {
  frames: 1,
  index: 3,
  name: 'clicked',
  time: 100,
});
button1Animations.set('unclick', {
  frames: 3,
  index: 4,
  name: 'unclick',
  time: 100,
});
button1Animations.set('disabled', {
  frames: 1,
  index: 15,
  name: 'disabled',
  time: 100,
});
const button1 = new Button({
  animations: button1Animations,
  height: 48,
  id: 'button1',
  width: 7 * 16,
  onClick: () => {
    if (isAlreadyPLaying) return;
    isAlreadyPLaying = true;

    playMusic();
  },
  text: 'PLAY',
  x: 100,
  y: 100,
  src: 'button.png',
  dHeight: 48 * 2,
  dWidth: 16 * 7 * 2,
});

elements.set(button1.uuid, button1);

const gameInterface = new GameInterface({
  name: 'interface 1',
  cursor: new Cursor({
    animations: cursorAnimationsMap,
    width: 32,
    height: 32,
    id: 'curosrTest',
    name: 'cursor',
    src: 'paw_cursor.png',
  }),
  elements,
});

const scene = new Scene({
  map,
  name: 'SCENE_TEST',
  player,
  camera,
  gameInterface,
});

const control = new Control();

const game = new Game({
  canvasId: CANVAS_ID,
  control,
  initialScene: scene,
});

async function playMusic() {
  try {
    const audioContext = new AudioContext();
    const audioElement = new Audio('resources/SOUNDS/music/music1.mp3');
    const gainNode = audioContext.createGain();
    gainNode.connect(audioContext.destination);
    const source = audioContext.createMediaElementSource(audioElement);
    source.connect(gainNode);
    gainNode.gain.value = 0.5;
    audioElement.play();
  } catch (error) {
    console.error('Error al cargar o reproducir la música:', error);
  }
}

export const start = async () => {
  // Crear un contexto de audio

  await game.init();
  console.log(game);
};
