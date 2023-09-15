import Camera from '../../game/Camera';

export default interface IRenderable {
  load(): Promise<void>;
  render(ctx: CanvasRenderingContext2D, camera?: Camera): void;
}
