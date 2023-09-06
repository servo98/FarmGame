const rgb = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  return `rgb(${r},${g},${b})`;
};

const vec2d = (maxX: number = 3, maxY: number = 3) => {
  return {
    x: Math.random() * maxX,
    y: Math.random() * maxY,
  };
};

const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Error loading image: ${src}`));
    img.src = src;
  });
};

const loadCSV = async (src: string): Promise<string[][]> => {
  try {
    const file = await (await fetch(src)).text();
    const rows = file.split('\n');
    const map = rows.map((row) => row.split(','));
    return map;
  } catch (error) {
    console.error('ERROR loading map from route', src);
    return [];
  }
};

type TileOptionsType = {
  offset: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
};

type JsonMapTypeResponse = {
  name: string;
  width: number;
  height: number;
  tileOptions: TileOptionsType;
  tiles: number[][];
};

type JsonMap = {
  name: string;
  tileOptions: TileOptionsType;
  tiles: number[][];
};

const loadJsonMap = async (src: string): Promise<JsonMapTypeResponse> => {
  const file = (await (await fetch(src)).json()) as JsonMap;
  const map: JsonMapTypeResponse = {
    height: file.tiles.length,
    width: file.tiles[0].length,
    name: file.name,
    tileOptions: file.tileOptions,
    tiles: file.tiles,
  };
  return map;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const loadJsonFile = async (src: string): Promise<any> => {
  const file = await (await fetch(src)).json();
  return file;
};

const timestampToTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
};

export const random = {
  vec2d,
  rgb,
};

export const file = {
  loadImage,
  loadJsonMap,
  loadCSV,
  loadJsonFile,
};

export const time = {
  timestampToTime,
};
