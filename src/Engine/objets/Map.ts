import Tile from './Tile';
import { file } from '../utils/index';
import IRenderable from './IRenderable';

type TileOptions = {
  offset: {
    x: number;
    y: number;
  };
  width: number;
  height: number;
};

type MapArgsType = {
  src: string;
};

export default class Map implements IRenderable {
  src: string;
  name?: string;
  width?: number;
  height?: number;
  tileOptions: TileOptions = {
    height: 0,
    width: 0,
    offset: {
      x: 0,
      y: 0,
    },
  };
  tiles?: Tile[][];
  tileImages?: HTMLImageElement[];

  constructor(args: MapArgsType) {
    this.src = args.src;
  }

  async load(): Promise<boolean> {
    try {
      //cargar csv
      const mapRaw = await file.loadJsonMap(`resources/MAP/${this.src}.json`);
      this.height = mapRaw.height;
      this.width = mapRaw.width;
      this.name = mapRaw.name;
      this.width = mapRaw.width;
      this.height = mapRaw.height;
      this.tileOptions = mapRaw.tileOptions;

      //convertir csv a arreglo de arreglo de tiles
      this.tiles = mapRaw.tiles.map((row, y) => {
        return row.map((col, x) => {
          return new Tile({
            width: this.tileOptions?.width || 0,
            height: this.tileOptions?.height || 0,
            id: `${col}`,
            x: x * (this.tileOptions.width + this.tileOptions.offset.x),
            y: y * (this.tileOptions.height + this.tileOptions.offset.y),
          });
        });
      });

      //cargar todas las images de tiles
      const tileImagePromises: Promise<boolean>[] = this.tiles
        .map((tileRow) => {
          return tileRow.map((t) => {
            return t.load();
          });
        })
        .flat();

      await Promise.all(tileImagePromises);
      return true;
    } catch (error) {
      console.error('ERROR Loadinng map', this.src);
      return false;
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
