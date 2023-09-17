import { AnimationType } from '../_types/object/AnimatedGameObject';
import { GameObjectTypes } from '../_types/object/GameObject';
import { CURSOR_STATES } from '../_types/ui/Cursor';
import { CursorArgs } from '../_types/ui/Cursor';
import Control from '../game/Control';
import AnimatedGameObject from '../objects/AnimatedGameObject';
import UIElement from './UIElement';

export default class Cursor extends UIElement {
  gameAnimatedObj: AnimatedGameObject;
  state: CURSOR_STATES = CURSOR_STATES.NORMAL;
  constructor(args: CursorArgs) {
    super({
      ...args,
      x: 0,
      y: 0,
    });

    const animations = new Map<string, AnimationType>();
    animations.set(CURSOR_STATES[CURSOR_STATES.NORMAL], {
      frames: 1,
      index: 1,
      name: CURSOR_STATES[CURSOR_STATES.NORMAL],
      time: 100,
    });
    animations.set(CURSOR_STATES[CURSOR_STATES.HOVER], {
      frames: 1,
      index: 2,
      name: CURSOR_STATES[CURSOR_STATES.HOVER],
      time: 100,
    });
    animations.set(CURSOR_STATES[CURSOR_STATES.CLICKED], {
      frames: 1,
      index: 3,
      name: CURSOR_STATES[CURSOR_STATES.CLICKED],
      time: 100,
    });

    this.gameAnimatedObj = new AnimatedGameObject({
      id: args.id,
      animations,
      width: args.sWidth,
      height: args.sHeight,
      dHeight: args.dHeight,
      dWidth: args.dWidth,
      x: 0,
      y: 0,
      type: GameObjectTypes.UI,
      src: args.src,
    });
  }
  input(control: Control) {
    this.handleInput(control);
  }

  handleInput(control: Control): void {
    this.x = this.gameAnimatedObj.x = control.mouse.currentX;
    this.y = this.gameAnimatedObj.y = control.mouse.currentY;

    this.gameAnimatedObj.currentAnimation = this.getAnimationfromState(
      this.state,
    );
  }

  // input(control: Control): void {

  // }

  async load(): Promise<void> {
    try {
      await this.gameAnimatedObj.load();
    } catch (error) {
      console.error(
        `Error loading Cursor AnimatedGameObject id:${this.gameAnimatedObj.id}`,
      );
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    this.gameAnimatedObj.render(ctx);
  }

  private getAnimationfromState(state: CURSOR_STATES): AnimationType {
    return this.gameAnimatedObj.animations.get(
      CURSOR_STATES[state],
    ) as AnimationType;
  }

  //TODO: universal state changer with booleans and ORs
}
