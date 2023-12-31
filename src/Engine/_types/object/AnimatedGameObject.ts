import { GameObjectArgs } from './GameObject';
import Animation from '../../objects/Animation';

export type AnimationArgs = {
  name: string;
  index: number;
  frames: number;
  duration: number;
  allowOverride: boolean;
  loopeable?: boolean;
};

type AnimatedGameObject = {
  animations: Map<string, Animation>;
};

export type AnimatedGameObjectArgs = GameObjectArgs & AnimatedGameObject;
