export type MapArgsType = {
  src: string;
  name: string;
};

export type Layer = {
  data: number[][];
  name: string;
  visible: boolean;
};

export type RawLayer = {
  data: number[];
  name: string;
  visible: boolean;
};

export type TileOptions = {
  width: number;
  height: number;
};

export type TileSet = {
  firstgid: number;
  source: string;
  animation?: {
    frames: number;
    time: number;
  };
  img?: HTMLImageElement;
};

type RawTile = {
  id: number;
  probability: number;
};

type AnimationTile = {
  animation: [RawTile];
};

export type TileSetRaw = {
  image: string;
  tiles: [AnimationTile | RawTile];
  columns: number;
};
