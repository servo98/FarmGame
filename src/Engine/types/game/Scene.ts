import Player from '../../game/Player';
import { default as GameMap } from '../../map/Map';
export type SceneArgsType = {
  map: GameMap;
  name: string;
  player: Player;
};
