import {
  DrawProperitesType,
  GameObjectTypes,
} from '../_types/object/GameObject';
import {
  GrabberOptions,
  SLIDER_EVENTS,
  SLIDER_PARTS,
  SliderArgs,
} from '../_types/ui/Slider';
import Camera from '../game/Camera';
import Control from '../game/Control';
import GameObject from '../objects/GameObject';
import { file } from '../utils';
import UIElement from './UIElement';

export default class Slider extends UIElement {
  emptyBar: GameObject;
  fillBar: GameObject;
  grabber: GameObject;
  value: number;
  lenght: number;
  grabberOptions: GrabberOptions;

  constructor(args: SliderArgs) {
    super({
      ...args,
    });
    this.value = args.value || 0;
    this.lenght = args.lenght;
    this.grabberOptions = args.grabberOptions;
    this.emptyBar = new GameObject({
      x: args.x,
      y: args.y,
      width: args.grabberOptions.width * args.lenght,
      height: this.grabberOptions.height,
      id: 'EmptyBar',
      type: GameObjectTypes.UI,
    });
    this.fillBar = new GameObject({
      x: args.x,
      y: args.y,
      width: args.grabberOptions.width * args.lenght,
      height: args.grabberOptions.height,
      id: 'FillBar',
      type: GameObjectTypes.UI,
    });
    this.grabber = new GameObject({
      x: args.x,
      y: args.y,
      width: args.grabberOptions.width,
      height: args.grabberOptions.height,
      id: 'Grabger',
      type: GameObjectTypes.UI,
    });
    this.changeRenderPropertiesFunctions();
  }
  private changeRenderPropertiesFunctions() {
    this.emptyBar.getDrawProperties = this.emptyBarProperties.bind(this);
    this.fillBar.getDrawProperties = this.fillBarProperties.bind(this);
    this.grabber.getDrawProperties = this.grabberProperties.bind(this);
  }

  private emptyBarProperties(_camera?: Camera): DrawProperitesType {
    return {
      dHeight: this.dHeight,
      dWidth: this.dWidth,
      dx: this.x,
      dy: this.y,
      sheight: this.sHeight,
      swidth: this.sWidth,
      sx: 0,
      sy: this.grabber.height * SLIDER_PARTS.EMPTY,
    };
  }

  private fillBarProperties(_camera?: Camera): DrawProperitesType {
    return {
      sx: 0,
      sy: this.grabber.height * SLIDER_PARTS.FILL,
      swidth: (this.value * this.sWidth) / 100,
      sheight: this.sHeight,
      dx: this.x,
      dy: this.y,
      dWidth: (this.value * this.dWidth) / 100,
      dHeight: this.dHeight,
    };
  }

  private grabberProperties(_camera?: Camera): DrawProperitesType {
    const aux = this.sWidth / this.grabberOptions.width - 1;
    return {
      dHeight: this.dHeight,
      dWidth: this.dWidth / aux,
      dx: this.x + (this.value * this.dWidth) / (100 + aux),
      dy: this.y,
      sheight: this.grabberOptions.height,
      swidth: this.grabberOptions.width,
      sx: 0,
      sy: this.grabber.height * SLIDER_PARTS.GRABBER,
    };
  }

  async load(): Promise<void> {
    try {
      const img = await file.loadImage(`resources/UI/${this.src}`);
      this.emptyBar.image = img;
      this.grabber.image = img;
      this.fillBar.image = img;
    } catch (error) {
      console.error(`Error loading slider image src:${this.src}`);
    }
  }

  handleInput(control: Control): void {
    if (this.isMouseOver && control.mouse.isLeftButtonDown) {
      const newValue = Math.floor(
        ((control.mouse.currentX - this.x) / this.dWidth) * 100,
      );
      this.value = newValue;
      const event = new CustomEvent(SLIDER_EVENTS.VALUE_CHANGE, {
        detail: {
          newValue,
        },
      });
      this.dispatchEvent(event);
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    this.emptyBar.render(ctx);
    this.fillBar.render(ctx);
    this.grabber.render(ctx);
  }
}
