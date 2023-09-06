import { Vec2D } from '../types';
import { EntityArgsType } from '../types/object/Entity';
import AnimatedObject from './AnimatedObject';

export default class Entity extends AnimatedObject {
  currentSpeed: Vec2D;
  maxSpeed: number;
  constructor(args: EntityArgsType) {
    super({
      ...args.animatedObject,
    });
    this.currentSpeed = args.currentSpeed ?? {
      x: 0,
      y: 0,
    };
    this.maxSpeed = args.maxSpeed ?? 1;
  }

  update() {
    this.x += this.currentSpeed.x;
    this.y += this.currentSpeed.y;
  }
}
