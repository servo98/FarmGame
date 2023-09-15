import IRenderable from '../_types/game/IRenderable';
import { GameInterfaceArgs } from '../_types/ui/GameInterface';
import Control from '../game/Control';
import Cursor from './Cursor';
import UIElement from './UIElement';

export default class GameInterface implements IRenderable {
  elements: Map<string, UIElement>;
  cursor: Cursor;
  name: string;
  constructor(args: GameInterfaceArgs) {
    this.elements = args.elements;
    this.cursor = args.cursor;
    this.name = args.name;
  }

  async load() {
    try {
      await this.cursor.load();
      const promises: Promise<void>[] = [];
      this.elements.forEach((value) => {
        promises.push(value.load());
      });

      await Promise.all(promises);
    } catch (error) {
      console.error(`Error loading Interface ${this.name}`, error);
    }
  }

  input(control: Control) {
    this.cursor.input(control);
    for (const [_, element] of this.elements) {
      element.input(control, this.cursor);
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    for (const [_, element] of this.elements) {
      element.render(ctx);
    }
    this.cursor.render(ctx);
  }
}
