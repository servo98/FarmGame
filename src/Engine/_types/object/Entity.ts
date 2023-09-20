import { Vec2D } from '..';
import { AnimatedGameObjectArgs } from './AnimatedGameObject';

export enum ENTITY_DIRECTION {
  UP = 'UP',
  DOWN = 'DOWN',
  RIGHT = 'RIGHT',
  LEFT = 'LEFT',
}

export type Entity<STATES> = {
  maxSpeed: number;
  currentSpeed?: Vec2D;
  state: STATES;
  direction: ENTITY_DIRECTION;
};

export type EntityArgs<STATES> = AnimatedGameObjectArgs & Entity<STATES>;
