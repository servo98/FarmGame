import { Vec2D } from '..';
import { AnimatedObjectArgs } from './AnimatedObject';

export type EntityArgsType = {
  currentSpeed?: Vec2D;
  maxSpeed?: number;
  animatedObject: AnimatedObjectArgs;
};
export enum ENTITY_DIRECTION {
  UP = 'UP',
  DOWN = 'DOWN',
  RIGHT = 'RIGHT',
  LEFT = 'LEFT',
}

export enum ENTITY_ACTION {
  WALK = 'WALK',
  RUN = 'RUN',
  IDLE = 'IDLE',
}
