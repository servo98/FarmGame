import { file } from '../utils/index';
import Tile from './Tile';
import { Vec2D } from '../types';
import {
  Layer,
  TileOptions,
  TileSet,
  MapArgsType,
  RawLayer,
  TileSetRaw,
} from '../types/map/GameMap';
import IRenderable from '../types/game/interfaces/IRenderable';
import AnimatedTile from './AnimatedTile';
import { AnimationType } from '../types/object/AnimatedObject';

export default class GameMap implements IRenderable {
  loaded: boolean = false;
  name: string;
  src: string;
  width: number = 0;
  height: number = 0;
  layers: Layer[] = [];
  tiles: (Tile | AnimatedTile | null)[][][] = [];
  tileOptions: TileOptions = {
    height: 0,
    width: 0,
  };
  tileSets: TileSet[] = [];

  constructor(args: MapArgsType) {
    this.name = args.name;
    this.src = args.src;
  }

  async load(): Promise<boolean> {
    try {
      //leer tmj file
      const mapFile = await file.loadJsonFile(`resources/MAP/${this.src}`);

      this.width = mapFile.width;
      this.height = mapFile.height;

      this.layers = mapFile.layers.map((layer: RawLayer) => {
        return {
          data: this.arrayToMatrix(layer.data),
          name: layer.name,
        };
      });
      this.tileOptions = {
        width: mapFile.tilewidth,
        height: mapFile.tileheight,
      };

      this.tileSets = await this.changeTileSetsFileNames(mapFile.tilesets);

      const rawTileSetsArrayFromFile = this.tileSets.map((tileSet: TileSet) => {
        return this.getTsjFile(tileSet.source);
      }) as [Promise<TileSetRaw>];

      const tileSetArrayFromFile: [TileSetRaw] = await Promise.all(
        rawTileSetsArrayFromFile,
      );

      //leer tilesets images
      const imagePromises = tileSetArrayFromFile.map((tileSet) => {
        return file.loadImage(
          `resources/TILE/${tileSet.image.replace('../', '')}`,
        );
      });

      const imagesArray = await Promise.all(
        imagePromises as Promise<HTMLImageElement>[],
      );

      this.tileSets = this.tileSets?.map((tileSet, index) => {
        const preTileSet = {
          ...tileSet,
          img: imagesArray[index],
        };

        if ('animation' in tileSetArrayFromFile[index].tiles[0]) {
          return {
            ...preTileSet,
            animation: {
              frames: tileSetArrayFromFile[index].columns,
              time: 200,
            },
          };
        } else {
          return preTileSet;
        }
      });

      this.loadTilesFromLayers();

      this.loaded = true;
      return this.loaded;
    } catch (error) {
      console.error('Error loading map', this.name, error);
      return this.loaded;
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    if (!this.loaded) return;
    this.tiles.forEach((layer) => {
      layer.forEach((row) => {
        row.forEach((tile) => {
          if (!tile) return;
          tile.render(ctx);
        });
      });
    });
  }

  private getTileSetIndexFromData(id: number): number {
    for (let i = this.tileSets.length - 1; i >= 0; i--) {
      if (this.tileSets[i].firstgid <= id) {
        return i;
      }
    }
    return 0;
  }

  private matrixToArrayIndex(x: number, y: number) {
    const result = y * (this.width as number) + x - 1 + 1;
    return result;
  }

  private dataToCoords(data: number, tileSet: TileSet): Vec2D {
    const index = data - tileSet.firstgid;
    const imageWidth = tileSet.img?.width as number;
    const coords = {
      x:
        (index % (imageWidth / this.tileOptions.width)) *
        this.tileOptions.width,
      y:
        Math.floor(index / (imageWidth / this.tileOptions.height)) *
        this.tileOptions.height,
    };

    return coords;
  }

  private getTsjFile(src: string) {
    return file.loadJsonFile(`resources/${src.replace('../', '')}`);
  }

  private async changeTileSetsFileNames(tilesets: TileSet[]) {
    //TODO case when file anem doesn't have / or \
    return tilesets.map((tileset: TileSet) => {
      return {
        firstgid: tileset.firstgid,
        source: tileset.source,
      };
    });
  }

  private loadTilesFromLayers() {
    this.tiles = this.layers.map((layer) => {
      return layer.data.map((row, y) => {
        return row.map((tileNumber, x) => {
          const tempTileSet =
            this.tileSets[this.getTileSetIndexFromData(tileNumber)];

          const sourceCoords = this.dataToCoords(tileNumber, tempTileSet);

          if (tileNumber == 0) {
            return null;
          }

          const gameObject = {
            height: this.tileOptions.height,
            id: layer.name + ': ' + x + ', ' + y,
            width: this.tileOptions.width,
            image: tempTileSet.img as HTMLImageElement,
            x: x * this.tileOptions.width,
            y: y * this.tileOptions.height,
          };

          if (tempTileSet.animation) {
            const animations = new Map<string, AnimationType>();
            animations.set('animated_block', {
              frames: tempTileSet.animation.frames,
              index: 1,
              name: 'animated_block',
              time: 1000,
            });
            return new AnimatedTile({
              animatedObject: {
                animations: animations,
                gameObject,
              },
              sx: sourceCoords.x,
              sy: sourceCoords.y,
            });
          } else {
            return new Tile({
              gameObject,
              sx: sourceCoords.x,
              sy: sourceCoords.y,
            });
          }
        });
      });
    });
  }

  private arrayToMatrix(arr: number[]): number[][] {
    const matrix: number[][] = [];

    for (let i = 0; i < this.height; i++) {
      const row: number[] = [];
      for (let j = 0; j < this.width; j++) {
        row.push(arr[i * this.width + j]);
      }
      matrix.push(row);
    }

    return matrix;
  }
}
