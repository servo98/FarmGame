import GameObject, { GameObjectTypes } from './GameObject';

type TileType = {
  gameObject: {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    image: HTMLImageElement;
  };
  sx: number;
  sy: number;
};
export default class Tile extends GameObject {
  sx: number;
  sy: number;

  constructor(args: TileType) {
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
  render(ctx: CanvasRenderingContext2D): void {
    throw new Error('Method not implemented.');
  }
}
