import Scene from './Scene';
import Time from '../utils/Time';

enum GAME_STATES {
  'LOADING',
  'MAIN_MANU',
  'PAUSE',
  'INGAME',
}
export default class Game {
  state: GAME_STATES;
  scene?: Screen;
  canvas: HTMLCanvasElement;
  requestAnimationFrameId?: number;
  ctx: CanvasRenderingContext2D;

  constructor(canvasId: string) {
    this.state = GAME_STATES.LOADING;
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  async init() {
    new Scene();
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.requestAnimationFrameId = requestAnimationFrame(this.loop.bind(this));
  }

  private input() {}
  private update() {}
  private render() {}

  loop() {
    if (Time.shouldAnimate()) {
      this.input();
      this.update();
      this.render();
    }
    this.requestAnimationFrameId = requestAnimationFrame(this.loop.bind(this));
  }
}
