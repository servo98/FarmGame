import { MouseType } from '../_types/game/Control';
import { IUIInteractive } from '../_types/game/IInteractive';
import { AnimationType } from '../_types/object/AnimatedGameObject';
import { GameObjectTypes } from '../_types/object/GameObject';
import { ButtonArgs } from '../_types/ui/UIElement';
import Control from '../game/Control';
import Cursor from './Cursor';
import UIElement from './UIElement';

export default class Button extends UIElement implements IUIInteractive {
  onClick: () => void;
  text: string;
  constructor(args: ButtonArgs) {
    if (
      !args.animations.get('button') ||
      !args.animations.get('click') ||
      !args.animations.get('clicked') ||
      !args.animations.get('unclick') ||
      !args.animations.get('disabled')
    ) {
      throw Error(
        `Button UIElement ${args.id} must have button, click, clicked & unclick animations`,
      );
    }
    super({
      ...args,
      type: GameObjectTypes.BUTTON,
    });
    this.onClick = args.onClick;
    this.text = args.text;
  }

  input(control: Control, cursor: Cursor): void {
    const mouseOver = this.isMouseOver(control.mouse);
    cursor.overPointer = mouseOver;
    if (mouseOver && control.mouse.isLeftButtonDown) {
      this.onClick();
      this.currentAnimation = this.animations.get('clicked') as AnimationType;
    } else {
      this.currentAnimation = this.animations.get('button') as AnimationType;
    }
  }
  private isMouseOver(mouse: MouseType) {
    return (
      mouse.currentX > this.x &&
      mouse.currentX < this.x + this.dWidth &&
      mouse.currentY > this.y &&
      mouse.currentY < this.y + this.dHeight
    );
  }

  render(ctx: CanvasRenderingContext2D): void {
    super.render(ctx);
    ctx.font = 'bold 32px rainyhearts';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#B68962';

    ctx.fillText(
      this.text,
      this.x + this.dWidth / 2,
      this.y + this.dHeight / 2,
    );
  }
}
