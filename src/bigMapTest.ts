import {
  ChangeSliderValueEvent,
  SLIDER_EVENTS,
} from './Engine/_types/ui/Slider';
import { UIEVENTS } from './Engine/_types/ui/UIElement';
import Camera from './Engine/game/Camera';
import Control from './Engine/game/Control';
import Game from './Engine/game/Game';
import Player from './Engine/game/Player';
import Scene from './Engine/game/Scene';
import GameMap from './Engine/map/GameMap';
import Button from './Engine/ui/Button';
import Cursor from './Engine/ui/Cursor';
import GameInterface from './Engine/ui/GameInterface';
import Slider from './Engine/ui/Slider';
import UIElement from './Engine/ui/UIElement';
import Animation from './Engine/objects/Animation';

let isAlreadyPLaying = false;
let firstPlay = true;

const audioElement = new Audio('resources/SOUNDS/music/music1.mp3');

const animations = new Map<string, Animation>();
animations.set(
  'idle_down',
  new Animation({
    frames: 8,
    index: 1,
    name: 'idle_down',
    duration: 1000,
    allowOverride: true,
  }),
);
animations.set(
  'idle_up',
  new Animation({
    frames: 8,
    index: 2,
    name: 'idle_up',
    duration: 1000,
    allowOverride: true,
  }),
);
animations.set(
  'idle_left',
  new Animation({
    frames: 8,
    index: 3,
    name: 'idle_left',
    duration: 1000,
    allowOverride: true,
  }),
);
animations.set(
  'idle_right',
  new Animation({
    frames: 8,
    index: 4,
    name: 'idle_right',
    duration: 1000,
    allowOverride: true,
  }),
);
animations.set(
  'walk_down',
  new Animation({
    frames: 8,
    index: 5,
    name: 'walk_down',
    duration: 1000,
    allowOverride: true,
  }),
);
animations.set(
  'walk_up',
  new Animation({
    frames: 8,
    index: 6,
    name: 'walk_up',
    duration: 1000,
    allowOverride: true,
  }),
);
animations.set(
  'walk_right',
  new Animation({
    frames: 8,
    index: 7,
    name: 'walk_right',
    duration: 800,
    allowOverride: true,
  }),
);
animations.set(
  'walk_left',
  new Animation({
    frames: 8,
    index: 8,
    name: 'walk_left',
    duration: 1000,
    allowOverride: true,
  }),
);
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

const elements = new Map<string, UIElement>();

const buttonTest = new Button({
  id: 'button1',
  sWidth: 7 * 16,
  sHeight: 48,
  src: 'button.png',
  text: 'PLAY',
  x: 100,
  y: 150,
  dHeight: 48 * 3,
  dWidth: 7 * 16 * 2,
});

buttonTest.addEventListener(UIEVENTS.MOUSE_UP, () => {
  if (isAlreadyPLaying) return;
  playMusic();
});

elements.set(buttonTest.uuid, buttonTest);

const buttonTest2 = new Button({
  id: 'button2',
  sWidth: 7 * 16,
  sHeight: 48,
  src: 'button.png',
  text: 'PAUSE',
  x: 100,
  y: 100 * 3,
  dHeight: 48 * 3,
  dWidth: 7 * 16 * 2,
});

buttonTest2.addEventListener(UIEVENTS.MOUSE_UP, () => {
  // audioElement.volume = 0;
  pauseMusic();
});

elements.set(buttonTest2.uuid, buttonTest2);

const slider1 = new Slider({
  grabberOptions: {
    height: 16,
    width: 16,
  },
  id: 'slider1',
  lenght: 10,
  sWidth: 176,
  sHeight: 16,
  src: 'slider.png',
  x: 100,
  y: 100,
  value: 30,
  dHeight: 16 * 3,
  dWidth: 176 * 3,
});

slider1.addEventListener<ChangeSliderValueEvent>(
  SLIDER_EVENTS.VALUE_CHANGE,
  (event) => {
    audioElement.volume = event.detail.newValue / 100;
    console.log(event.detail.newValue / 100);
  },
);

elements.set(slider1.uuid, slider1);

const cursor = new Cursor({
  id: 'cursor_paw',
  sHeight: 32,
  src: 'paw_cursor.png',
  sWidth: 32,
});

const gameInterface = new GameInterface({
  name: 'interface 1',
  cursor,
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

function playMusic() {
  try {
    isAlreadyPLaying = true;
    firstPlay = false;
    if (firstPlay) {
      const audioContext = new AudioContext();
      audioElement.loop = true;
      const source = audioContext.createMediaElementSource(audioElement);
      source.connect(audioContext.destination);
    }
    audioElement.play();
  } catch (error) {
    console.error('Error al cargar o reproducir la música:', error);
  }
}

function pauseMusic() {
  try {
    isAlreadyPLaying = false;
    audioElement.pause();
  } catch (error) {
    console.error('Error al cargar o reproducir la música:', error);
  }
}

export const start = async () => {
  // Crear un contexto de audio

  await game.init();
  console.log(game);
};
