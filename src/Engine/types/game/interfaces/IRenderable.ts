import Camera from '../../../game/Camera';

export default interface IRenderable {
  render(ctx: CanvasRenderingContext2D, camera: Camera): void;
  load(): Promise<boolean>;
}
