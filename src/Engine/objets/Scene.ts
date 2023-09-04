import Controll from './Controls';
import Entity from './Entity';
import GameObject from './GameObject';
import { default as GameMap } from './Map';

type SceneType = {
  mapSrc: string;
  name: string;
};

export default class Scene {
  loaded: boolean = false;
  name: string;
  gameObjects: Map<string, GameObject>;
  map: GameMap;
  //TODO interface UI
  constructor(args: SceneType) {
    this.name = args.name;
    this.map = new GameMap({
      mapSrc: args.mapSrc,
    });
    this.gameObjects = new Map<string, GameObject>();
  }

  async load() {
    try {
      await this.map.load();

      const gameObjectLoaders: Promise<void>[] = [];

      for (const [_, object] of this.gameObjects) {
        gameObjectLoaders.push(object.load());
      }

      await Promise.all(gameObjectLoaders);

      this.loaded = true;
    } catch (error) {
      console.error('Error loading scene ', this.name);
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
    this.gameObjects.forEach((object) => {
      if (object instanceof Entity) {
        const entity = object as Entity;
        entity.input(controll);
      }
    });
  }

  update() {
    this.gameObjects.forEach((object) => {
      object.update();
    });
  }

  render(ctx: CanvasRenderingContext2D) {
    if (!this.loaded) return;
    this.map?.render(ctx);
    this.gameObjects.forEach((object) => {
      object.render(ctx);
    });
    //TODO: render interface
  }
}
