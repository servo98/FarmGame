export default class Time {
  static lastFrameStamp: number = Date.now();
  static frameCount: number = 0;
  static sinceStart: number = 0;
  static readonly TARGET_FPS = 60;
  static readonly FRAME_DELAY = 1000 / Time.TARGET_FPS;
  static readonly START_TIME = Date.now();
  static FPS: number = 0;

  static shouldAnimate(): boolean {
    // return false;
    const now = Date.now();
    const elapsed = now - Time.lastFrameStamp;

    const shouldFrame = elapsed >= Time.FRAME_DELAY;
    if (shouldFrame) {
      Time.lastFrameStamp = now - (Time.lastFrameStamp % Time.FRAME_DELAY);
      Time.sinceStart = now - Time.START_TIME;
      Time.frameCount++;
      Time.FPS = Math.round(1000 / (Time.sinceStart / Time.frameCount));
      // console.log(Time.FPS);
    }
    return shouldFrame;
  }
}
