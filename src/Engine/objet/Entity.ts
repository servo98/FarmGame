import { Vec2D } from '../types';
import IMovable from '../types/game/interfaces/IMovable';
import { EntityArgsType } from '../types/object/Entity';
import AnimatedObject from './AnimatedObject';

export default class Entity extends AnimatedObject implements IMovable {
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
