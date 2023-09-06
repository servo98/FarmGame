import { v4 as uuid } from 'uuid';
import { file } from '../utils/index';
import IRenderable from './IRenderable';

export enum GameObjectTypes {
  GAME_OBJECT = 'GAME_OBJECT',
  PLAYER = 'PLAYER',
  TILE = 'TILE',
}

export type GameObjectArgsType = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  src: string;
  type: GameObjectTypes;
  image?: HTMLImageElement;
};

export default abstract class GameObject implements IRenderable {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  src: string;
  uuid: string;
  type: GameObjectTypes = GameObjectTypes.GAME_OBJECT;
  image?: HTMLImageElement;

  constructor(args: GameObjectArgsType) {
    this.id = args.id;
    this.height = args.height;
    this.width = args.width;
    this.x = args.x;
    this.y = args.y;
    this.src = args.src;
    this.type = args.type;
    this.uuid = uuid();
    this.image = args.image;
  }

  async load(): Promise<boolean> {
    try {
      const img = await file.loadImage(`resources/${this.type}/${this.src}`);
      this.image = img;
      return true;
    } catch (error) {
      console.error(
        `Error loading GameObject ${this.id} image with src: ${this.src}`
      );
      return false;
    }
  }

  abstract update(): void;
  abstract render(ctx: CanvasRenderingContext2D): void;
}
