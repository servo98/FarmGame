import { GameObjectArgsType } from './GameObject';

export type AnimationType = {
  name: string;
  index: number;
  frames: number;
  time: number;
};

export type AnimatedObjectArgs = {
  animations: Map<string, AnimationType>;
  gameObject: GameObjectArgsType;
};

export type AnimatedObjectArgsNoType = {
  animations: Map<string, AnimationType>;
  gameObject: Omit<GameObjectArgsType, 'type'>;
};
