import GameObject from '../objects/GameObject';
import UIElementTarget from './UIElementTarget';
import Control from '../game/Control';
import Cursor from './Cursor';
import Camera from '../game/Camera';
import {
  DrawProperitesType,
  GameObjectTypes,
} from '../_types/object/GameObject';
import { MouseType } from '../_types/game/Control';
import { BUTTON_SATES, ButtonArgs } from '../_types/ui/Button';

export default class Button extends UIElementTarget {
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
  input(control: Control, cursor: Cursor): void {
    const mouseOver = this.isMouseOver(control.mouse);
    cursor.overPointer = mouseOver;
    if (mouseOver) {
      this.state = BUTTON_SATES.HOVER;
      cursor.overPointer = true;
      if (control.mouse.isLeftButtonDown) {
        //TODO: only dispatch when is mouse up
        this.dispatchEvent(new Event('click'));
        this.state = BUTTON_SATES.CLICKED;
      }
    } else {
      cursor.overPointer = false;
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
      this.y + this.dHeight / 2,
    );
  }

  private isMouseOver(mouse: MouseType) {
    return (
      mouse.currentX > this.x &&
      mouse.currentX < this.x + this.dWidth &&
      mouse.currentY > this.y &&
      mouse.currentY < this.y + this.dHeight
    );
  }
}
