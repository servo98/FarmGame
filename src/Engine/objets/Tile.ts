import GameObject, { GameObjectArgsType, GameObjectTypes } from './GameObject';
import { file } from '../utils/index';

type TileArgsType = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export default class Tile extends GameObject {
  constructor(args: TileArgsType) {
    super({
      ...args,
      type: GameObjectTypes.TILE,
      src: `isometric_pixel_flat_0000.png`,
    });
    this.src = `${this.getTileFileName(args.id)}`;
  }

  update(): void {}
  render(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      this.image as HTMLImageElement,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  private getTileFileName = (id: string): string => {
    return `isometric_pixel_flat_${'0'.repeat(4 - id.length) + id}.png`;
  };
}
