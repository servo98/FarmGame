import { file } from '../utils/index';
import IRenderable from './IRenderable';
import { v4 as uuidv4 } from 'uuid';

export type GameObjectType = {
  id: string;
  x: number;
  y: number;
  widht: number;
  height: number;
  src: string;
};

export default class GameObject implements IRenderable {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  image?: HTMLImageElement;
  src: string;
  uuid: string;

  constructor(args: GameObjectType) {
    this.id = args.id;
    this.height = args.height;
    this.width = args.widht;
    this.x = args.x;
    this.y = args.y;
    this.src = args.src;
    this.uuid = uuidv4();
  }

  async load() {
    const img = await file.loadImage(this.src);
    this.image = img;
  }

  update(time: number) {
    this.x;
    this.y;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image as HTMLImageElement,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
