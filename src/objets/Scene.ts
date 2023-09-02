import GameObject from './GameObject';
import { default as GameMap } from './Map';
import IRenderable from './IRenderable';

type SceneType = {
  mapSrc: string;
  name: string;
};

export default class Scene {
  loaded: boolean = false;
  name: string;
  gameObjects: Map<string, IRenderable>;
  map: GameMap;
  //TODO interface UI
  constructor(args: SceneType) {
    this.name = args.name;
    this.map = new GameMap({
      mapSrc: args.mapSrc,
    });
    this.gameObjects = new Map<string, IRenderable>();
  }

  async load() {
    try {
      await this.map.load();
      this.loaded = true;
    } catch (error) {
      console.error('Error loading scene ', this.name);
    }
  }

  addGameObject(object: GameObject) {
    this.gameObjects.set(object.uuid, object);
    this.gameObjects.forEach;
  }

  removeGameObject(object: GameObject | string) {
    this.gameObjects.delete(
      object instanceof GameObject ? object.uuid : (object as string)
    );
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
