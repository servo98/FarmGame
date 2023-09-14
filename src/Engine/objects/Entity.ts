import { Vec2D } from '../_types';
import {
  ENTITY_ACTION,
  ENTITY_DIRECTION,
  EntityArgs,
} from '../_types/object/Entity';
import AnimatedGameObject from './AnimatedGameObject';

export default class Entity extends AnimatedGameObject {
  maxSpeed: number;
  currentSpeed: Vec2D;
  action: ENTITY_ACTION;
  direction: ENTITY_DIRECTION;
  constructor(args: EntityArgs) {
    super(args);
    this.direction = args.direction || ENTITY_DIRECTION.DOWN;
    this.action = args.action || ENTITY_ACTION.IDLE;
    this.currentSpeed = args.currentSpeed || {
      x: 0,
      y: 0,
    };
    this.maxSpeed = args.maxSpeed;
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
