import {
  DrawProperitesType,
  GameObjectTypes,
} from '../_types/object/GameObject';
import { UIElementargs } from '../_types/ui/UIElement';
import Camera from '../game/Camera';
import Control from '../game/Control';
import AnimatedGameObject from '../objects/AnimatedGameObject';
import { file } from '../utils';
import Cursor from './Cursor';

export default abstract class UIElement extends AnimatedGameObject {
  dWidth: number;
  dHeight: number;
  constructor(args: UIElementargs) {
    super({
      ...args,
      type: `${GameObjectTypes.UIELEMENT}.${args.type}`,
    });
    this.dWidth = args.dWidth || args.width;
    this.dHeight = args.dHeight || args.height;
  }

  async load(): Promise<void> {
    if (this.image) return;
    try {
      const img = await file.loadImage(`resources/UI/${this.src}`);
      this.image = img;
    } catch (error) {
      console.error(
        `Error loading [${this.type}] ${this.id} image with src: ${this.src}`,
      );
    }
  }

  getDrawProperties(_camera: Camera): DrawProperitesType {
    return {
      sx: this.width * this.calculateAnimationFrame() - this.width,
      sy: this.height * this.currentAnimation.index - this.height,
      swidth: this.width,
      sheight: this.height,
      dx: this.x,
      dy: this.y,
      dWidth: this.dWidth,
      dHeight: this.dHeight,
    };
  }

  abstract input(control: Control, cursor: Cursor): void;
}
