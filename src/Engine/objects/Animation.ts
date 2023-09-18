type AnimationArgs = {
  name: string;
  index: number;
  frames: number;
  duration: number;
  allowOverride: boolean;
};

export default class Animation {
  name: string;
  index: number;
  frames: number;
  duration: number;
  allowOverride: boolean;

  private lastAnimationFrameStamp: number;
  private currentAnimationFrame: number;

  constructor(args: AnimationArgs) {
    this.name = args.name;
    this.index = args.index;
    this.frames = args.frames;
    this.allowOverride = args.allowOverride;
    this.duration = args.duration;
    this.lastAnimationFrameStamp = Date.now();
    this.currentAnimationFrame = 1;
  }

  calculateAnimationFrame(): number {
    if (this.shouldChangeAnimationFrame()) {
      this.currentAnimationFrame =
        (++this.currentAnimationFrame % this.frames) + 1;
    }

    return this.currentAnimationFrame;
  }

  shouldChangeAnimationFrame(): boolean {
    const now = Date.now();
    const msPerAnimationFrame = this.duration / this.frames;

    const shouldChange =
      now - this.lastAnimationFrameStamp > msPerAnimationFrame;

    if (shouldChange) {
      this.lastAnimationFrameStamp = now;
    }
    return shouldChange;
  }
}
