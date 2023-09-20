import { AnimationArgs } from '../_types/object/AnimatedGameObject';

export default class Animation {
  name: string;
  index: number;
  frames: number;
  duration: number;
  allowOverride: boolean;
  loopeable: boolean;

  currentAnimationFrame: number;
  lastAnimationFrameStamp: number;
  justChanged: boolean = true;

  constructor(args: AnimationArgs) {
    this.name = args.name;
    this.index = args.index;
    this.frames = args.frames;
    this.allowOverride = args.allowOverride;
    this.duration = args.duration;
    this.lastAnimationFrameStamp = Date.now();
    this.currentAnimationFrame = 0;
    this.loopeable = args.loopeable ?? true;
  }

  calculateAnimationFrame(): number {
    if (this.justChanged) {
      this.currentAnimationFrame = 0;
    }
    const result = this.currentAnimationFrame;

    if (this.shouldChangeAnimationFrame()) {
      this.currentAnimationFrame =
        (this.currentAnimationFrame + 1) % this.frames;
    }
    return result;
  }

  shouldChangeAnimationFrame(): boolean {
    const now = Date.now();
    const msPerAnimationFrame = this.duration / this.frames;
    if (this.justChanged) {
      this.lastAnimationFrameStamp = now;
      this.justChanged = false;
    }

    const shouldChange =
      now - this.lastAnimationFrameStamp >= msPerAnimationFrame;

    if (shouldChange) {
      this.lastAnimationFrameStamp = now;
    }
    return shouldChange;
  }
}
