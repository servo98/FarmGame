import Scene from './Scene';
import Time from '../utils/Time';
import Entity, { AnimationType } from './Entity';
import Controll from './Controlls';

enum GAME_STATES {
  'LOADING',
  'MAIN_MANU',
  'PAUSE',
  'INGAME',
}
export default class Game {
  state: GAME_STATES;
  scene?: Scene;
  canvas: HTMLCanvasElement;
  requestAnimationFrameId?: number;
  ctx: CanvasRenderingContext2D;
  controll: Controll;

  constructor(canvasId: string) {
    this.state = GAME_STATES.LOADING;
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.controll = new Controll();
    this.scene = new Scene({
      name: 'SCENE_1',
      mapSrc: 'map1',
    });
  }

  async init() {
    this.controll.load();

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
    this.scene?.addGameObject(lizzys);
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx.imageSmoothingEnabled = false;
    await this.scene?.load();
    this.requestAnimationFrameId = requestAnimationFrame(this.loop.bind(this));
  }

  private input() {
    this.scene?.input(this.controll);
  }
  private update() {
    this.scene?.update();
  }
  private render(ctx: CanvasRenderingContext2D) {
    //TODO: clear rect
    this.scene?.render(ctx);
  }

  loop() {
    if (Time.shouldAnimate()) {
      this.input();
      this.update();
      this.render(this.ctx);
    }
    this.requestAnimationFrameId = requestAnimationFrame(this.loop.bind(this));
  }
}
