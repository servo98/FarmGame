import { GameObjectArgs } from './GameObject';

export type AnimationType = {
  name: string;
  index: number;
  frames: number;
  time: number;
};

type AnimatedGameObject = {
  animations: Map<string, AnimationType>;
};

export type AnimatedGameObjectArgs = GameObjectArgs & AnimatedGameObject;
