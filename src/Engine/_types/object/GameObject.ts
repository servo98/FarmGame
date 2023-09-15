export enum GameObjectTypes {
  GAME_OBJECT = 'GAME_OBJECT',
  PLAYER = 'PLAYER',
  TILE = 'TILE',
  ANIMATED_TILE = 'ANIMATED_TILE',
  ANIMATED_GAME_OBJECT = 'ANIMATED_GAME_OBJECT',
  MAP_OBJECT = 'MAP_OBJECT',
  ANIMATED_MAP_OBJECT = 'ANIMATED_MAP_OBJECT',
  ENTITY = 'ENTITY',
  CURSOR = 'CURSOR',
  BUTTON = 'BUTTON',
  UI = 'UI',
}
export type DrawProperitesType = {
  sx: number;
  sy: number;
  swidth: number;
  sheight: number;
  dx: number;
  dy: number;
  dWidth: number;
  dHeight: number;
};

export type GameObjectArgs = {
  id: string;
  height: number;
  width: number;
  x: number;
  y: number;
  sx?: number;
  sy?: number;
  src?: string;
  type?: string;
  image?: HTMLImageElement;
  dWidth?: number;
  dHeight?: number;
};
