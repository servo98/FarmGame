export enum GameObjectTypes {
  GAME_OBJECT = 'GAME_OBJECT',
  PLAYER = 'PLAYER',
  TILE = 'TILE',
}

export type GameObjectArgsType = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  src: string;
  type: GameObjectTypes;
  image?: HTMLImageElement;
};
