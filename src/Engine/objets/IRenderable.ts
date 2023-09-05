export default interface IRenderable {
  render(ctx: CanvasRenderingContext2D): void;
  load(): Promise<boolean>;
}
