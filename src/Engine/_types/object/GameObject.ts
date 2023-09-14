export enum GameObjectTypes {
  GAME_OBJECT = 'GAME_OBJECT',
  PLAYER = 'PLAYER',
  TILE = 'TILE',
  ANIMATED_TILE = 'ANIMATED_TILE',
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
  sx: number;
  sy: number;
  src: string;
  type: GameObjectTypes;
  image?: HTMLImageElement;
};
