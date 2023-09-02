import GameObject from './GameObject';
import { file } from '../utils/index';

export type TileType = {
  id: string;
  x: number;
  y: number;
  widht: number;
  height: number;
};

export default class Tile extends GameObject {
  constructor(args: TileType) {
    super({
      ...args,
      src: `resources/tiles/${file.getTileFileName(args.id)}`,
    });
  }
}
