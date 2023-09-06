import {
  AnimationType,
  AnimatedObjectArgs,
} from '../types/object/AnimatedObject';
import GameObject from './GameObject';

export default abstract class AnimatedObject extends GameObject {
  animations: Map<string, AnimationType>;
  currentAnimation: AnimationType;
  lastAnimationFrameStamp: number;
  currentAnimationFrame: number = 1;
  constructor(args: AnimatedObjectArgs) {
    if (!args.animations.has('idle_down')) {
      throw Error('AnimatedObject animations must have idle_down animation');
    }
    super(args.gameObject);

    this.animations = args.animations;
    this.currentAnimation = args.animations.get('idle_down') as AnimationType;
    this.lastAnimationFrameStamp = Date.now();
    this.currentAnimationFrame = 1;
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
