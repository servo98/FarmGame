import AnimatedObject from '../objet/AnimatedObject';
import { AnimatedTileArgsType } from '../types/map/AnimatedTile';
import { GameObjectTypes } from '../types/object/GameObject';
export default class AnimatedTile extends AnimatedObject {
  sx: number;
  sy: number;

  constructor(args: AnimatedTileArgsType) {
    super({
      animations: args.animatedObject.animations,
      gameObject: {
        ...args.animatedObject.gameObject,
        src: 'NA',
        type: GameObjectTypes.ANIMATED_TILE,
      },
    });
    this.sx = args.sx;
    this.sy = args.sy;
  }
}
