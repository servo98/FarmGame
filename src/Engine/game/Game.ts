import { GAME_STATES, GameArgsType } from '../_types/game/Game';
import { file } from '../utils';
import Time from '../utils/Time';
import Control from './Control';
import Scene from './Scene';

export default class Game {
  state: GAME_STATES;
  scene: Scene;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  requestAnimationFrameId: number = NaN;
  control: Control;

  constructor(args: GameArgsType) {
    this.state = GAME_STATES.LOADING;
    this.canvas = document.getElementById(args.canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.control = args.control;
    this.scene = args.initialScene;
  }

  async init() {
    const graphicJsonConfig = await file.loadJsonFile(
      'resources/CONFIG/graphics.json',
    );
    await this.control.load();
    console.log(graphicJsonConfig.window.fullScreen);

    if (graphicJsonConfig.window.fullScreen) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    } else {
      this.canvas.width = graphicJsonConfig.window.width;
      this.canvas.height = graphicJsonConfig.window.height;
    }
    this.ctx.imageSmoothingEnabled = false;
    await this.scene.load();
    this.requestAnimationFrameId = requestAnimationFrame(this.loop.bind(this));
  }

  private input() {
    this.control.input();
    this.scene.input(this.control);
  }
  private update() {
    this.scene.update();
  }
  private render(ctx: CanvasRenderingContext2D) {
    ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = 'black';
    ctx.fill();

    // ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.scene.render(ctx);
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
