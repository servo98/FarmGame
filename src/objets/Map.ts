import Tile from './Tile';
import { file } from '../utils/index';
import IRenderable from './IRenderable';

type MapType = {
  tileWidth: number;
  tileHeight: number;
  src: string;
};

export default class Map implements IRenderable {
  width: number = 0;
  height: number = 0;
  tileWidth: number;
  tileHeight: number;
  src: string;
  tiles?: Tile[][];
  tileImages?: HTMLImageElement[];

  constructor(args: MapType) {
    this.tileWidth = args.tileWidth;
    this.tileHeight = args.tileHeight;
    this.src = args.src;
  }

  async load() {
    try {
      //cargar csv
      const mapRaw = await file.loadCSV(this.src);
      let map: number[][];
      map = mapRaw.map((row) => {
        return row.map((col) => +col);
      });

      this.width = map[0].length;
      this.height = map.length;

      //convertir csv a arreglo de arreglo de tiles
      this.tiles = map.map((row, y) => {
        return row.map((col, x) => {
          return new Tile({
            height: this.tileHeight,
            widht: this.tileWidth,
            id: `${col}`,
            x: x * this.tileWidth,
            y: y * (this.tileHeight - 24),
          });
        });
      });

      //cargar todas las images de tiles
      const tileImagePromises: Promise<void>[] = this.tiles
        .map((tileRow) => {
          return tileRow.map((t) => {
            return t.load();
          });
        })
        .flat();

      await Promise.all(tileImagePromises);
    } catch (error) {
      console.error('ERROR loading map', error);
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    this.tiles?.forEach((tileRow) => {
      tileRow.forEach((tile) => {
        tile.render(ctx);
      });
    });
  }
}
