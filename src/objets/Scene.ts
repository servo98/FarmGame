import GameObject from './GameObject';
import { v4 as uuidv4 } from 'uuid';
import { default as GameMap } from './Map';
import IRenderable from './IRenderable';

export default class Scene {
  gameObjects: Map<string, IRenderable>;
  map?: GameMap;
  constructor() {
    this.gameObjects = new Map();
    console.log(uuidv4());
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
    this.map?.render(ctx);
    this.gameObjects.forEach((object) => {
      object.render(ctx);
    });
    //TODO: render interface
  }
}
