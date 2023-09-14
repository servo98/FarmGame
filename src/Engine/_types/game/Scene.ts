import Camera from '../../game/Camera';
import Player from '../../game/Player';
import GameMap from '../../map/GameMap';

export type SceneArgsType = {
  map: GameMap;
  name: string;
  player?: Player;
  camera: Camera;
};
