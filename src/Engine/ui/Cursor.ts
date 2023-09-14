import { AnimationType } from '../_types/object/AnimatedGameObject';
import { GameObjectTypes } from '../_types/object/GameObject';
import { CursorArgs } from '../_types/ui/UIElement';
import Control from '../game/Control';
import UIElement from './UIElement';

export default class Cursor extends UIElement {
  name: string;
  constructor(args: CursorArgs) {
    if (
      !args.animations.get('cursor') ||
      !args.animations.get('pointer') ||
      !args.animations.get('click')
    ) {
      throw new Error(
        'Cursor must have: cursor, pointer  and click animations',
      );
    }
    super({
      ...args,
      x: 0,
      y: 0,
      type: GameObjectTypes.CURSOR,
    });
    this.name = args.name;
  }

  input(control: Control): void {
    this.x = control.mouse.currentX;
    this.y = control.mouse.currentY;
    if (control.mouse.isLeftButtonDown) {
      this.currentAnimation = this.animations.get('click') as AnimationType;
    } else {
      this.currentAnimation = this.animations.get('cursor') as AnimationType;
    }
  }
}
