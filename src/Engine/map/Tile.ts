import GameObject from '../objet/GameObject';
import { TileArgsType } from '../types/map/Tile';
import { GameObjectTypes } from '../types/object/GameObject';

export default class Tile extends GameObject {
  sx: number;
  sy: number;

  constructor(args: TileArgsType) {
    super({
      ...args.gameObject,
      src: 'NA',
      type: GameObjectTypes.TILE,
    });
    this.sx = args.sx;
    this.sy = args.sy;
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.drawImage(
      this.image as HTMLImageElement,
      this.sx,
      this.sy,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
}
