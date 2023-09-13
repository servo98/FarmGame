import Control from '../../game/Controls';
import Scene from '../../game/Scene';

export enum GAME_STATES {
  'LOADING',
  'MAIN_MANU',
  'PAUSE',
  'INGAME',
}

export type GameArgsType = {
  canvasId: string;
  control: Control;
  initialScene: Scene;
};
