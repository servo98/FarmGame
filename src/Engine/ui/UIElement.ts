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
  src: string;

  constructor(args: UIElementArgs) {
    this.x = args.x;
    this.y = args.y;
    this.sHeight = args.sHeight;
    this.sWidth = args.sWidth;
    this.dHeight = args.dHeight || args.sHeight;
    this.dWidth = args.dWidth || args.sWidth;
    this.uuid = uuid();
    this.src = args.src;
  }

  abstract load(): Promise<void>;
  abstract input(control: Control, cursor: Cursor): void;
  abstract render(ctx: CanvasRenderingContext2D): void;
}
