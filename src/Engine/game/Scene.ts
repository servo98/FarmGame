import { SceneArgsType } from '../_types/game/Scene';
import GameMap from '../map/GameMap';
import Camera from './Camera';
import Control from './Control';
import Player from './Player';
import GameInterface from '../ui/GameInterface';
import IRenderable from '../_types/game/IRenderable';
import GameObject from '../objects/GameObject';

export default class Scene implements IRenderable {
  name: string;
  map: GameMap;
  camera: Camera;
  player?: Player;
  gameInterface?: GameInterface;
  gameObjects: Map<string, GameObject>;
  constructor(args: SceneArgsType) {
    this.name = args.name;
    this.gameObjects = new Map<string, GameObject>();
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

      const gameObjectLoaders: Promise<void>[] = [];

      for (const [_, object] of this.gameObjects) {
        gameObjectLoaders.push(object.load());
      }

      await Promise.all(gameObjectLoaders);
    } catch (error) {
      console.error('Error loading scene ', this.name);
    }
  }

  addGameObject(object: GameObject) {
    this.gameObjects.set(object.uuid, object);
  }

  removeGameObject(object: GameObject | string) {
    this.gameObjects.delete(
      object instanceof GameObject ? object.uuid : (object as string),
    );
  }

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
    this.gameObjects.forEach((object) => {
      if ('update' in object && typeof object.update == 'function') {
        object.update();
      }
    });
  }

  render(ctx: CanvasRenderingContext2D) {
    this.map.render(ctx, this.camera);
    if (this.player) {
      this.player.render(ctx, this.camera);
    }
    // Change render orden dependning on Y position
    this.gameObjects.forEach((object) => {
      object.render(ctx, this.camera);
    });
    if (this.gameInterface) {
      this.gameInterface.render(ctx);
    }
  }
}
