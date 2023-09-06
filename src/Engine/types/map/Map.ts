export type MapArgsType = {
  src: string;
  name: string;
};

export type Layer = {
  data: number[][];
  name: string;
};

export type RawLayer = {
  data: number[];
  name: string;
};

export type TileOptions = {
  width: number;
  height: number;
};

export type TileSet = {
  firstgid: number;
  source: string;
  img?: HTMLImageElement;
};
