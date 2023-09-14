import { SceneArgsType } from '../_types/game/Scene';
import GameMap from '../map/GameMap';
import Camera from './Camera';
import Control from './Control';
// import GameObject from '../objects/GameObject';
import Player from './Player';
import GameInterface from '../ui/GameInterface';

export default class Scene {
  loaded: boolean = false;
  name: string;
  // gameObjects: Map<string, GameObject>;
  map: GameMap;
  camera: Camera;
  player?: Player;
  gameInterface?: GameInterface;
  constructor(args: SceneArgsType) {
    this.name = args.name;
    // this.gameObjects = new Map<string, GameObject>();
    this.player = args.player ?? undefined;
    this.map = args.map;
    this.camera = args.camera;
    this.gameInterface = args.gameInterface;
  }

  async load(): Promise<void> {
    try {
      await this.map.load();

      if (this.player) {
        await this.player.load();
      }

      if (this.gameInterface) {
        await this.gameInterface.load();
      }

      // const gameObjectLoaders: Promise<void>[] = [];

      // for (const [_, object] of this.gameObjects) {
      //   gameObjectLoaders.push(object.load());
      // }

      // await Promise.all(gameObjectLoaders);

      this.loaded = true;
    } catch (error) {
      console.error('Error loading scene ', this.name);
      this.loaded = false;
    }
  }

  // addGameObject(object: GameObject) {
  //   this.gameObjects.set(object.uuid, object);
  // }

  // removeGameObject(object: GameObject | string) {
  //   this.gameObjects.delete(
  //     object instanceof GameObject ? object.uuid : (object as string),
  //   );
  // }

  input(control: Control) {
    this.camera.input(control);
    if (this.player) {
      this.player.input(control);
    }
    if (this.gameInterface) {
      this.gameInterface.input(control);
    }
  }

  update() {
    if (this.player) {
      this.player.update();
    }
    this.camera.update();
    // this.gameObjects.forEach((object) => {
    //   if ('update' in object) {
    //     const movableObject = object as IMovable;
    //     object.update();
    //   }
    // });
  }

  render(ctx: CanvasRenderingContext2D) {
    if (!this.loaded) return;

    this.map.render(ctx, this.camera);
    if (this.player) {
      this.player.render(ctx, this.camera);
    }
    if (this.gameInterface) {
      this.gameInterface.render(ctx);
    }
    // this.gameObjects.forEach((object) => {
    //   object.render(ctx, this.camera);
    // });
  }
}
