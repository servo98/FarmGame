import GameObject from '../objects/GameObject';
import Control from '../game/Control';
import Cursor from './Cursor';
import Camera from '../game/Camera';
import {
  DrawProperitesType,
  GameObjectTypes,
} from '../_types/object/GameObject';
import { BUTTON_SATES, ButtonArgs } from '../_types/ui/Button';
import UIElement from './UIElement';

export default class Button extends UIElement {
  gameObject: GameObject;
  text: string;
  state: BUTTON_SATES;
  constructor(args: ButtonArgs) {
    super({
      ...args,
    });
    this.text = args.text;
    this.gameObject = new GameObject({
      height: args.sHeight,
      id: args.id,
      width: args.sWidth,
      x: args.x,
      y: args.y,
      src: args.src,
      type: GameObjectTypes.UI,
    });
    this.gameObject.getDrawProperties =
      this.getButtonObjectDrawProperties.bind(this);
    this.state = args.state || BUTTON_SATES.NORMAL;
  }

  private getButtonObjectDrawProperties(_camera?: Camera): DrawProperitesType {
    return {
      dHeight: this.dHeight,
      dWidth: this.dWidth,
      dx: this.x,
      dy: this.y,
      sheight: this.sHeight,
      swidth: this.sWidth,
      sx: this.sWidth * this.state,
      sy: 0,
    };
  }

  async load(): Promise<void> {
    try {
      await this.gameObject.load();
    } catch (error) {
      console.error(`Error loading button id:${this.gameObject.id}`, error);
    }
  }
  handleInput(control: Control, _cursor: Cursor): void {
    if (this.isMouseOver) {
      if (control.mouse.isLeftButtonDown) {
        this.state = BUTTON_SATES.CLICKED;
      } else {
        this.state = BUTTON_SATES.HOVER;
      }
    } else {
      this.state = BUTTON_SATES.NORMAL;
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    this.gameObject.render(ctx);
    ctx.font = 'bold 32px rainyhearts';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#B68962';

    ctx.fillText(
      this.text,
      this.x + this.dWidth / 2,
      this.state == BUTTON_SATES.NORMAL
        ? this.y + this.dHeight / 2
        : this.y + this.dHeight / 2 + 3,
    );
  }
}
