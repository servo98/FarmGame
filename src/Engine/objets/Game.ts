import Scene from './Scene';
import Time from '../utils/Time';
import Entity, { AnimationType } from './Entity';
import Control from './Controls';

enum GAME_STATES {
  'LOADING',
  'MAIN_MANU',
  'PAUSE',
  'INGAME',
}
export default class Game {
  state: GAME_STATES;
  scene: Scene;
  canvas: HTMLCanvasElement;
  requestAnimationFrameId?: number;
  ctx: CanvasRenderingContext2D;
  control: Control;

  constructor(canvasId: string, control: Control, initialScene: Scene) {
    this.state = GAME_STATES.LOADING;
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.control = control;
    this.scene = initialScene;
  }

  async init() {
    this.control.load();
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx.imageSmoothingEnabled = false;
    await this.scene?.load();
    this.requestAnimationFrameId = requestAnimationFrame(this.loop.bind(this));
  }

  private input() {
    this.scene?.input(this.control);
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
