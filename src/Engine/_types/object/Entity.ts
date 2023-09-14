import { Vec2D } from '..';
import { AnimatedGameObjectArgs } from './AnimatedGameObject';

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

export type Entity = {
  maxSpeed: number;
  currentSpeed?: Vec2D;
  action?: ENTITY_ACTION;
  direction?: ENTITY_DIRECTION;
};

export type EntityArgs = AnimatedGameObjectArgs & Entity;
