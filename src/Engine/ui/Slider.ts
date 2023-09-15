import {
  DrawProperitesType,
  GameObjectTypes,
} from '../_types/object/GameObject';
import { GrabberOptions, SLIDER_PARTS, SliderArgs } from '../_types/ui/Slider';
import Camera from '../game/Camera';
import Control from '../game/Control';
import GameObject from '../objects/GameObject';
import { file } from '../utils';
import UIElementTarget from './UIElementTarget';

export default class Slider extends UIElementTarget {
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
      dHeight: this.dHeight,
      dWidth: (this.dWidth * this.value) / 100,
      dx: this.x,
      dy: this.y,
      sheight: this.sHeight,
      swidth: (this.sWidth * this.value) / 100,
      sx: 0,
      sy: this.grabberOptions.height * SLIDER_PARTS.FILL,
    };
  }

  private grabberProperties(_camera?: Camera): DrawProperitesType {
    console.log();

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
      console.log(`Error loading slider image src:${this.src}`);
    }
  }

  input(_control: Control): void {}
  render(ctx: CanvasRenderingContext2D): void {
    this.emptyBar.render(ctx);
    // this.fillBar.render(ctx);
    this.grabber.render(ctx);
  }
}
