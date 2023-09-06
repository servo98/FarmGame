import { file } from '../utils/index';
import Tile from './Tile';
import { Vec2D } from '../types';
import {
  Layer,
  TileOptions,
  TileSet,
  MapArgsType,
  RawLayer,
} from '../types/map/Map';
import IRenderable from '../types/game/interfaces/IRenderable';

export default class Map implements IRenderable {
  loaded: boolean = false;
  name: string;
  src: string;
  width: number = 0;
  height: number = 0;
  layers: Layer[] = [];
  tiles: (Tile | null)[][][] = [];
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

      this.changeTileSetsFileNames(mapFile.tilesets);

      //leer tilesets images
      const imagePromises = this.tileSets?.map((tileSet) => {
        return file.loadImage(`resources/TILE/${tileSet.source}`);
      });

      const imagesArray = await Promise.all(
        imagePromises as Promise<HTMLImageElement>[],
      );

      this.tileSets = this.tileSets?.map((tileSet, index) => {
        return {
          ...tileSet,
          img: imagesArray[index],
        };
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
          ctx.drawImage(
            tile.image as HTMLImageElement,
            tile.sx,
            tile.sy,
            tile.width,
            tile.height,
            tile.x,
            tile.y,
            tile.width,
            tile.height,
          );
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

  private changeTileSetsFileNames(tilesets: TileSet[]) {
    //TODO case when file anem doesn't have / or \
    this.tileSets = tilesets.map((tileset: TileSet) => {
      const sourceSplitted = tileset.source.split('/');
      return {
        firstgid: tileset.firstgid,
        source: sourceSplitted[sourceSplitted.length - 1].replace(
          new RegExp('tsj', 'g'),
          'png',
        ),
      };
    });
    // .sort((a: TileSet, b: TileSet) => b.firstgid - a.firstgid);
  }

  private loadTilesFromLayers() {
    this.tiles = this.layers.map((layer) => {
      return layer.data.map((row, y) => {
        return row.map((tileNumber, x) => {
          const tempTileSet =
            this.tileSets[this.getTileSetIndexFromData(tileNumber)];

          const sourceCoords = this.dataToCoords(tileNumber, tempTileSet);

          return tileNumber != 0
            ? new Tile({
                gameObject: {
                  height: this.tileOptions.height,
                  width: this.tileOptions.width,
                  id: layer.name + ': ' + x + ', ' + y,
                  image: tempTileSet.img as HTMLImageElement,
                  x: x * this.tileOptions.width,
                  y: y * this.tileOptions.height,
                },
                sx: sourceCoords.x,
                sy: sourceCoords.y,
              })
            : null;
        });
      });
    });

    // this.layers.forEach((layer) => {
    //   let tempLayer: Tile[][] = [];
    //   for (let y = 0; y < this.height; y++) {
    //     let tempRow: Tile[] = [];
    //     for (let x = 0; x < this.width; x++) {
    //       let tempData = layer.data[this.matrixToArrayIndex(x, y)];
    //       let tempTileSet =
    //         this.tileSets[this.getTileSetIndexFromData(layer.data[y][x])];
    //       let sourceCoords = this.dataToCoords(tempData, tempTileSet.firstgid);

    //       tempRow.push();
    //     }
    //     tempLayer.push(tempRow);
    //   }
    //   this.tiles.push(tempLayer);
    // });
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
