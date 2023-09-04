import Controll from './Controls';
import GameObject, { GameObjectType } from './GameObject';
import IRenderable from './IRenderable';
import Time from '../utils/Time';

type Vec2D = {
  x: number;
  y: number;
};

export type AnimationType = {
  name: string;
  index: number;
  frames: number;
  time: number;
};

type EntityArgs = {
  gameObject: GameObjectType;
  maxSpeed: number;
  animations: Map<string, AnimationType>;
};

export default class Entity extends GameObject implements IRenderable {
  animations: Map<string, AnimationType>;
  currentSpeed: Vec2D;
  maxSpeed: number;
  currentAnimation: AnimationType;
  lastAnimationFrameStamp: number;
  currentAnimationFrame: number = 1;
  constructor(args: EntityArgs) {
    super({
      ...args.gameObject,
      src: `resources/entities/${args.gameObject.src}`,
    });

    this.currentSpeed = {
      x: 0,
      y: 0,
    };
    this.maxSpeed = args.maxSpeed;
    this.animations = args.animations;
    this.currentAnimation = args.animations.get('idle_down') as AnimationType;
    this.lastAnimationFrameStamp = Date.now();
    this.currentAnimationFrame = 1;
  }

  input(controll: Controll) {
    //movement

    if (controll.keysDown.has('s')) {
      this.currentSpeed.y = this.maxSpeed;
      this.currentAnimation = this.animations.get('idle_down') as AnimationType;
    } else if (controll.keysDown.has('w')) {
      this.currentSpeed.y = -this.maxSpeed;
      this.currentAnimation = this.animations.get('idle_up') as AnimationType;
    } else {
      this.currentSpeed.y = 0;
    }

    if (controll.keysDown.has('d')) {
      this.currentSpeed.x = this.maxSpeed;
      this.currentAnimation = this.animations.get(
        'idle_right'
      ) as AnimationType;
    } else if (controll.keysDown.has('a')) {
      this.currentSpeed.x = -this.maxSpeed;
      this.currentAnimation = this.animations.get('idle_left') as AnimationType;
    } else {
      this.currentSpeed.x = 0;
    }

    //animation
  }

  update() {
    super.update(
      (this.x += this.currentSpeed.x),
      (this.y += this.currentSpeed.y)
    );
  }

  render(ctx: CanvasRenderingContext2D) {
    const currentAnimationIndex = this.currentAnimation?.index || 0;

    ctx.drawImage(
      this.image as HTMLImageElement,
      this.width * this.calculateAnimationFrame() - this.width, //depende de frame
      this.height * currentAnimationIndex - this.height, //depende de frame,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  calculateAnimationFrame(): number {
    if (this.shouldChangeAnimationFrame()) {
      this.currentAnimationFrame =
        (++this.currentAnimationFrame % this.currentAnimation.frames) + 1;
    }

    return this.currentAnimationFrame;
  }

  private shouldChangeAnimationFrame(): boolean {
    const now = Date.now();
    const msPerAnimationFrame =
      this.currentAnimation.time / this.currentAnimation.frames;

    const shouldChange =
      now - this.lastAnimationFrameStamp > msPerAnimationFrame;

    if (shouldChange) {
      this.lastAnimationFrameStamp = now;
    }
    return shouldChange;
  }
}
