import { Vec2D } from '../types';
import IMovable from '../types/game/interfaces/IMovable';
import {
  ENTITY_ACTION,
  ENTITY_DIRECTION,
  EntityArgsType,
} from '../types/object/Entity';
import AnimatedObject from './AnimatedObject';

export default class Entity extends AnimatedObject implements IMovable {
  currentSpeed: Vec2D;
  action: ENTITY_ACTION;
  direction: ENTITY_DIRECTION;
  maxSpeed: number;
  constructor(args: EntityArgsType) {
    super({
      ...args.animatedObject,
    });
    this.direction = ENTITY_DIRECTION.DOWN;
    this.action = ENTITY_ACTION.IDLE;
    this.currentSpeed = args.currentSpeed ?? {
      x: 0,
      y: 0,
    };
    this.maxSpeed = args.maxSpeed ?? 1;
  }

  update() {
    const tempAnimation = this.animations.get(this.getCurrentAnimationName());
    if (tempAnimation) {
      this.currentAnimation = tempAnimation;
    }
    this.x += this.currentSpeed.x;
    this.y += this.currentSpeed.y;
  }

  private getCurrentAnimationName(): string {
    return `${this.action.toLowerCase()}_${this.direction.toLowerCase()}`;
  }
}
