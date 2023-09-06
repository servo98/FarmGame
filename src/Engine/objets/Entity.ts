import AnimatedObject, { AnimatedObjectType } from './AnimatedObject';
import { GameObjectArgsType } from './GameObject';

type EntityArgsType = {
  animated: AnimatedObjectType;
  gameObject: GameObjectArgsType;
};

export default class Entity extends AnimatedObject {
  constructor(args: EntityArgsType) {
    super({
      animated: args.animated,
      gameObject: args.gameObject,
    });
  }
}
