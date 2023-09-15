import { AnimationType } from '../_types/object/AnimatedGameObject';
import { GameObjectTypes } from '../_types/object/GameObject';
import { CURSOR_STATES } from '../_types/ui/Cursor';
import { CursorArgs } from '../_types/ui/Cursor';
import Control from '../game/Control';
import AnimatedGameObject from '../objects/AnimatedGameObject';
import UIElement from './UIElement';

export default class Cursor extends UIElement {
  overPointer: boolean;
  gameAnimatedObj: AnimatedGameObject;
  state: CURSOR_STATES;
  constructor(args: CursorArgs) {
    super({
      ...args,
      x: 0,
      y: 0,
    });
    this.overPointer = false;
    this.state = CURSOR_STATES.NORMAL;

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
      animations,
      height: args.sHeight,
      id: args.id,
      width: args.sWidth,
      dHeight: args.dHeight,
      dWidth: args.dWidth,
      x: 0,
      y: 0,
      type: GameObjectTypes.UI,
      src: args.src,
    });
  }

  input(control: Control): void {
    this.x = this.gameAnimatedObj.x = control.mouse.currentX;
    this.y = this.gameAnimatedObj.y = control.mouse.currentY;
    if (control.mouse.isLeftButtonDown) {
      this.gameAnimatedObj.currentAnimation = this.getAnimationfromState(
        CURSOR_STATES.CLICKED,
      );
    } else if (this.overPointer) {
      this.gameAnimatedObj.currentAnimation = this.getAnimationfromState(
        CURSOR_STATES.HOVER,
      );
    } else {
      this.gameAnimatedObj.currentAnimation = this.getAnimationfromState(
        CURSOR_STATES.NORMAL,
      );
    }
  }

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
}
