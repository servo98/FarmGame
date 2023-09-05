import Controll from './Controls';
import GameObject, { GameObjectArgsType } from './GameObject';
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

type AnimatedObjectType = {
  initialSpeed?: Vec2D;
  maxSpeed: number;
  animations: Map<string, AnimationType>;
};

export type AnimatedObjectArgs = {
  animated: AnimatedObjectType;
  gameObject: GameObjectArgsType;
};

export type AnimatedObjectArgsNoType = {
  animated: AnimatedObjectType;
  gameObject: Omit<GameObjectArgsType, 'type'>;
};

export default class AnimatedObject extends GameObject {
  currentSpeed: Vec2D = {
    x: 0,
    y: 0,
  };
  maxSpeed: number;
  animations: Map<string, AnimationType>;
  currentAnimation: AnimationType;
  lastAnimationFrameStamp: number;
  currentAnimationFrame: number = 1;
  constructor(args: AnimatedObjectArgs) {
    if (!args.animated.animations.has('idle_down')) {
      throw Error('AnimatedObject animations must have idle_down animation');
    }
    super(args.gameObject);
    // super({
    //   ...args.gameObject,
    //   src: `resources/entities/${args.gameObject.src}`,
    // });

    this.currentSpeed = args.animated.initialSpeed ?? this.currentSpeed;
    this.maxSpeed = args.animated.maxSpeed;
    this.animations = args.animated.animations;
    this.currentAnimation = args.animated.animations.get(
      'idle_down'
    ) as AnimationType;
    this.lastAnimationFrameStamp = Date.now();
    this.currentAnimationFrame = 1;
  }

  update() {
    this.x += this.currentSpeed.x;
    this.y += this.currentSpeed.y;
  }

  render(ctx: CanvasRenderingContext2D) {
    const currentAnimationIndex = this.currentAnimation.index;

    ctx.drawImage(
      this.image as HTMLImageElement,
      this.width * this.calculateAnimationFrame() - this.width,
      this.height * currentAnimationIndex - this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  private calculateAnimationFrame(): number {
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
