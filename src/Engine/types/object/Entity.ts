import { Vec2D } from '..';
import { AnimatedObjectArgs } from './AnimatedObject';

export type EntityArgsType = {
  currentSpeed?: Vec2D;
  maxSpeed?: number;
  animatedObject: AnimatedObjectArgs;
};
