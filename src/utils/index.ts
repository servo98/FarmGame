// import * as fs from 'fs';

const rgb = () => {
  const r = Math.floor(Math.random() * 256); // Valor entre 0 y 255
  const g = Math.floor(Math.random() * 256); // Valor entre 0 y 255
  const b = Math.floor(Math.random() * 256); // Valor entre 0 y 255

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

const getTileFileName = (id: string): string => {
  return `isometric_pixel_flat_${'0'.repeat(4 - id.length) + id}.png`;
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
  loadCSV,
  getTileFileName,
};

export const time = {
  timestampToTime,
};
