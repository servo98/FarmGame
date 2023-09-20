import {
  AnimatedGameObjectArgs,
  // AnimationType,
} from '../_types/object/AnimatedGameObject';
import {
  DrawProperitesType,
  GameObjectTypes,
} from '../_types/object/GameObject';
import Camera from '../game/Camera';
import GameObject from './GameObject';
import Animation from './Animation';

export default class AnimatedGameObject extends GameObject {
  animations: Map<string, Animation>;
  currentAnimation: Animation;

  constructor(args: AnimatedGameObjectArgs) {
    let firstAnimation;

    for (const [_, animation] of args.animations) {
      firstAnimation = animation;
      break;
    }

    if (!firstAnimation) {
      throw new Error('AnimatedGameObject must have at least 1 animation');
    }

    super({
      ...args,
      type: `${GameObjectTypes.ANIMATED_GAME_OBJECT}.${args.type}`,
    });
    this.animations = args.animations;
    this.currentAnimation = firstAnimation;
  }

  getDrawProperties(_camera: Camera): DrawProperitesType {
    return {
      sx: this.width * this.currentAnimation.calculateAnimationFrame(),
      sy: this.height * this.currentAnimation.index - this.height,
      swidth: this.width,
      sheight: this.height,
      dx: this.x,
      dy: this.y,
      dWidth: this.dWidth,
      dHeight: this.dHeight,
    };
  }
}
