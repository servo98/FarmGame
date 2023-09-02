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
  scene?: Scene;
  canvas: HTMLCanvasElement;
  requestAnimationFrameId?: number;
  ctx: CanvasRenderingContext2D;

  constructor(canvasId: string) {
    this.state = GAME_STATES.LOADING;
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.scene = new Scene({
      name: 'SCENE_1',
      mapSrc: 'map1',
    });
  }

  async init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    await this.scene?.load();
    this.requestAnimationFrameId = requestAnimationFrame(this.loop.bind(this));
  }

  private input() {}
  private update() {}
  private render(ctx: CanvasRenderingContext2D) {
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
