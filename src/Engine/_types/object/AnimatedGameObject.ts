import { GameObjectArgs } from './GameObject';
import Animation from '../../objects/Animation';

// export type AnimationType = {
//   name: string;
//   index: number;
//   frames: number;
//   duration: number;
//   allowOverride: boolean;
// };

type AnimatedGameObject = {
  animations: Map<string, Animation>;
};

export type AnimatedGameObjectArgs = GameObjectArgs & AnimatedGameObject;
