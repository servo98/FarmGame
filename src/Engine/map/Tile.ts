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
  update(): void {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render(ctx: CanvasRenderingContext2D): void {
    throw new Error('Method not implemented.');
  }
}
