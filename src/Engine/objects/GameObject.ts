import { v4 as uuid } from 'uuid';
import Camera from '../game/Camera';
import {
  GameObjectTypes,
  GameObjectArgs,
  DrawProperitesType,
} from '../_types/object/GameObject';
import { file } from '../utils';
import IRenderable from '../_types/game/IRenderable';

export default class GameObject implements IRenderable {
  id: string;
  x: number;
  y: number;
  sx: number;
  sy: number;
  width: number;
  height: number;
  src?: string;
  uuid: string;
  type: string;
  image?: HTMLImageElement;
  dWidth: number;
  dHeight: number;

  constructor(args: GameObjectArgs) {
    this.id = args.id;
    this.height = args.height;
    this.width = args.width;
    this.x = args.x;
    this.y = args.y;
    this.sx = args.sx || 0;
    this.sy = args.sy || 0;
    this.src = args.src;
    this.type = `${GameObjectTypes.GAME_OBJECT}.${args.type}`;
    this.image = args.image;
    this.uuid = uuid();
    this.dHeight = args.dHeight || args.height;
    this.dWidth = args.dWidth || args.width;
  }

  async load(): Promise<void> {
    if (this.image) return;
    try {
      const img = await file.loadImage(
        `resources/${this.getFolderName()}/${this.src}`,
      );
      this.image = img;
    } catch (error) {
      console.error(
        `Error loading TYPE:[${this.type}] ID:[${this.id}] image with src: ${this.src}`,
      );
    }
  }

  getDrawProperties(_camera?: Camera): DrawProperitesType {
    return {
      dHeight: this.dHeight,
      dWidth: this.dWidth,
      dx: this.x,
      dy: this.y,
      sheight: this.height,
      swidth: this.width,
      sx: this.x,
      sy: this.y,
    };
  }

  render(ctx: CanvasRenderingContext2D, camera?: Camera) {
    if (!this.image) return;

    const drawProperties = this.getDrawProperties(camera);
    ctx.drawImage(
      this.image,
      drawProperties.sx,
      drawProperties.sy,
      drawProperties.swidth,
      drawProperties.sheight,
      drawProperties.dx,
      drawProperties.dy,
      drawProperties.dWidth,
      drawProperties.dHeight,
    );
  }

  private getFolderName() {
    const types = this.type.split('.');
    return types[types.length - 1];
  }
}
