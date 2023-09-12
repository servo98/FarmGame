import Control from './Controls';
import GameObject from '../objet/GameObject';
import Player from './Player';
import GameMap from '../map/GameMap';
import { SceneArgsType } from '../types/game/Scene';
import IRenderable from '../types/game/interfaces/IRenderable';
import IMovable from '../types/game/interfaces/IMovable';

export default class Scene implements IRenderable {
  loaded: boolean = false;
  name: string;
  gameObjects: Map<string, GameObject>;
  map: GameMap;
  player: Player;
  //TODO interface UI
  constructor(args: SceneArgsType) {
    this.name = args.name;
    this.gameObjects = new Map<string, GameObject>();
    this.player = args.player;
    this.map = args.map;
  }

  async load(): Promise<boolean> {
    try {
      await this.map.load();

      if (this.player) {
        await this.player.load();
      }

      const gameObjectLoaders: Promise<boolean>[] = [];

      for (const [_, object] of this.gameObjects) {
        gameObjectLoaders.push(object.load());
      }

      await Promise.all(gameObjectLoaders);

      this.loaded = true;
      return this.loaded;
    } catch (error) {
      console.error('Error loading scene ', this.name);
      this.loaded = false;
      return this.loaded;
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

  input(controll: Control) {
    if (this.player) {
      this.player.input(controll);
    }
  }

  update() {
    if (this.player) {
      this.player.update();
    }
    this.gameObjects.forEach((object) => {
      if ('update' in object) {
        const movableObject = object as IMovable;
        movableObject.update();
      }
    });
  }

  render(ctx: CanvasRenderingContext2D) {
    if (!this.loaded) return;

    this.map.render(ctx);
    this.gameObjects.forEach((object) => {
      object.render(ctx);
    });
    if (this.player) {
      this.player.render(ctx);
    }
    //TODO: render interface
  }
}
