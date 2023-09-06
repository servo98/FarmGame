import Controll from './Controls';
import GameObject from './GameObject';
import Player from './Player';
import { default as GameMap } from './Map';
import IRenderable from './IRenderable';

type SceneType = {
  map: GameMap;
  name: string;
  player?: Player;
};

export default class Scene implements IRenderable {
  loaded: boolean = false;
  name: string;
  gameObjects: Map<string, GameObject>;
  map: GameMap;
  player?: Player;
  //TODO interface UI
  constructor(args: SceneType) {
    this.name = args.name;
    this.map = args.map;
    this.gameObjects = new Map<string, GameObject>();
    this.player = args.player;
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
    } catch (error) {
      console.error('Error loading scene ', this.name);
      this.loaded = false;
    } finally {
      return this.loaded;
    }
  }

  addGameObject(object: GameObject) {
    this.gameObjects.set(object.uuid, object);
  }

  removeGameObject(object: GameObject | string) {
    this.gameObjects.delete(
      object instanceof GameObject ? object.uuid : (object as string)
    );
  }

  input(controll: Controll) {
    if (this.player) {
      this.player.input(controll);
    }
  }

  update() {
    if (this.player) {
      this.player.update();
    }
    this.gameObjects.forEach((object) => {
      object.update();
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
