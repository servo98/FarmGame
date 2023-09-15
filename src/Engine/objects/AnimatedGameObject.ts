import {
  AnimatedGameObjectArgs,
  AnimationType,
} from '../_types/object/AnimatedGameObject';
import {
  DrawProperitesType,
  GameObjectTypes,
} from '../_types/object/GameObject';
import Camera from '../game/Camera';
import GameObject from './GameObject';

export default class AnimatedGameObject extends GameObject {
  animations: Map<string, AnimationType>;
  currentAnimation: AnimationType;
  private lastAnimationFrameStamp: number;
  private currentAnimationFrame: number;
  constructor(args: AnimatedGameObjectArgs) {
    let firstAnimation;

    for (const [_, animation] of args.animations) {
      firstAnimation = animation;
      break;
    }

    if (!firstAnimation) {
      throw new Error('AnimatedGameObject must have at least 1 animation');
    }

    super({
      ...args,
      type: `${GameObjectTypes.ANIMATED_GAME_OBJECT}.${args.type}`,
    });
    this.animations = args.animations;
    this.currentAnimation = firstAnimation;
    this.lastAnimationFrameStamp = Date.now();
    this.currentAnimationFrame = 1;
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

  getDrawProperties(_camera: Camera): DrawProperitesType {
    return {
      sx: this.width * this.calculateAnimationFrame() - this.width,
      sy: this.height * this.currentAnimation.index - this.height,
      swidth: this.width,
      sheight: this.height,
      dx: this.x,
      dy: this.y,
      dWidth: this.dWidth,
      dHeight: this.dHeight,
    };
  }
}
