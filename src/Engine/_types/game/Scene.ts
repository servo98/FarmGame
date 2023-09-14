import Camera from '../../game/Camera';
import Player from '../../game/Player';
import GameMap from '../../map/GameMap';
import GameInterface from '../../ui/GameInterface';

export type SceneArgsType = {
  map: GameMap;
  name: string;
  player?: Player;
  camera: Camera;
  gameInterface?: GameInterface;
};
