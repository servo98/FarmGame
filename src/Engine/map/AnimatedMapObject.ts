import { AnimatedGameObjectArgs } from '../_types/object/AnimatedGameObject';
import {
  DrawProperitesType,
  GameObjectTypes,
} from '../_types/object/GameObject';
import Camera from '../game/Camera';
import AnimatedGameObject from '../objects/AnimatedGameObject';

export default class AnimatedMapObject extends AnimatedGameObject {
  constructor(args: AnimatedGameObjectArgs) {
    super({
      ...args,
      type: `${GameObjectTypes.ANIMATED_MAP_OBJECT}.${args.type}`,
    });
  }

  getDrawProperties(camera: Camera): DrawProperitesType {
    return {
      sx:
        this.width * this.currentAnimation.calculateAnimationFrame() -
        this.width,
      sy: this.height * this.currentAnimation.index - this.height,
      swidth: this.width,
      sheight: this.height,
      dx: (this.x - camera.x) / camera.zoom,
      dy: (this.y - camera.y) / camera.zoom,
      dWidth: this.width / camera.zoom,
      dHeight: this.height / camera.zoom,
    };
  }
}
