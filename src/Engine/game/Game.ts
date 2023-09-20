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
  requestAnimationFrameId: number;
  control: Control;

  constructor(args: GameArgsType) {
    this.state = GAME_STATES.LOADING;
    this.canvas = document.getElementById(args.canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.control = args.control;
    this.scene = args.initialScene;
    this.requestAnimationFrameId = 0;
  }

  async init() {
    const graphicJsonConfig = await file.loadJsonFile(
      'resources/CONFIG/graphics.json',
    );
    await this.control.load();

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

  private input(scene: Scene) {
    this.control.input();
    scene.input(this.control);
  }
  private update(scene: Scene) {
    scene.update();
  }
  private render(scene: Scene) {
    //TODO: redo clear rect
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    scene.render(this.ctx);
  }

  loop() {
    if (Time.shouldAnimate()) {
      this.input(this.scene);
      this.update(this.scene);
      this.render(this.scene);
    }
    this.requestAnimationFrameId = requestAnimationFrame(this.loop.bind(this));
  }
}
