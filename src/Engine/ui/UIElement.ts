import { UIElementArgs } from '../_types/ui/UIElement';
import Control from '../game/Control';
import Cursor from './Cursor';
import { v4 as uuid } from 'uuid';

export default abstract class UIElement {
  x: number;
  y: number;
  dWidth: number;
  dHeight: number;
  sWidth: number;
  sHeight: number;
  uuid: string;

  constructor(args: UIElementArgs) {
    this.x = args.x;
    this.y = args.y;
    this.sHeight = args.sHeight;
    this.sWidth = args.sWidth;
    this.dHeight = args.dHeight || args.sHeight;
    this.dWidth = args.dWidth || args.sWidth;
    this.uuid = uuid();
  }
  // async load(): Promise<void> {
  //   if (this.image) return;
  //   try {
  //     const img = await file.loadImage(`resources/UI/${this.src}`);
  //     this.image = img;
  //   } catch (error) {
  //     console.error(
  //       `Error loading [${this.type}] ${this.id} image with src: ${this.src}`,
  //     );
  //   }
  // }

  // getDrawProperties(): DrawProperitesType {
  //   return {
  //     sx: this.width * this.calculateAnimationFrame() - this.width,
  //     sy: this.height * this.currentAnimation.index - this.height,
  //     swidth: this.width,
  //     sheight: this.height,
  //     dx: this.x,
  //     dy: this.y,
  //     dWidth: this.dWidth,
  //     dHeight: this.dHeight,
  //   };
  // }

  abstract load(): Promise<void>;
  abstract input(control: Control, cursor: Cursor): void;
  abstract render(ctx: CanvasRenderingContext2D): void;
}
