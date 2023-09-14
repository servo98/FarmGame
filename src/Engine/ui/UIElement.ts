import { GameObjectTypes } from '../_types/object/GameObject';
import { UIElementargs } from '../_types/ui/UIElement';
import Control from '../game/Control';
import IInteractive from '../_types/game/IInteractive';
import AnimatedGameObject from '../objects/AnimatedGameObject';
import { file } from '../utils';

export default abstract class UIElement
  extends AnimatedGameObject
  implements IInteractive
{
  constructor(args: UIElementargs) {
    super({
      ...args,
      type: `${GameObjectTypes.UIELEMENT}.${args.type}`,
    });
  }

  async load(): Promise<void> {
    try {
      const img = await file.loadImage(`resources/UI/${this.src}`);
      this.image = img;
    } catch (error) {
      console.error(
        `Error loading [${this.type}] ${this.id} image with src: ${this.src}`,
      );
    }
  }

  abstract input(control: Control): void;
}
