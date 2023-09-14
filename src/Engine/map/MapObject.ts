import {
  DrawProperitesType,
  GameObjectArgs,
} from '../_types/object/GameObject';
import Camera from '../game/Camera';

import GameObject from '../objects/GameObject';

export default class MapObject extends GameObject {
  constructor(args: GameObjectArgs) {
    super(args);
  }
  getDrawProperties(camera: Camera): DrawProperitesType {
    return {
      sx: this.sx,
      sy: this.sy,
      swidth: this.width,
      sheight: this.height,
      dx: (this.x - camera.x) / camera.zoom,
      dy: (this.y - camera.y) / camera.zoom,
      dWidth: this.width / camera.zoom,
      dHeight: this.height / camera.zoom,
    };
  }
}
