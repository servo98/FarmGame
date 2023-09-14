import { MOVEMENT } from '../_types/game/Control';
import { ENTITY_ACTION, ENTITY_DIRECTION } from '../_types/object/Entity';
import { PlayerArgs } from '../_types/game/Player';
import Entity from '../objects/Entity';
import Control from './Control';
import { GameObjectTypes } from '../_types/object/GameObject';
import IInteractive from '../_types/game/IInteractive';

export default class Player extends Entity implements IInteractive {
  name: string;
  constructor(args: PlayerArgs) {
    super({
      ...args,
      type: `${GameObjectTypes.PLAYER}`,
    });
    this.name = args.name;
  }

  input(control: Control) {
    if (control.keys.get(MOVEMENT.DOWN)?.isPressed) {
      this.currentSpeed.y = this.maxSpeed;
      this.action = ENTITY_ACTION.WALK;
      this.direction = ENTITY_DIRECTION.DOWN;
    } else if (control.keys.get(MOVEMENT.UP)?.isPressed) {
      this.currentSpeed.y = -this.maxSpeed;
      this.action = ENTITY_ACTION.WALK;
      this.direction = ENTITY_DIRECTION.UP;
    } else {
      this.currentSpeed.y = 0;
    }
    if (control.keys.get(MOVEMENT.RIGHT)?.isPressed) {
      this.currentSpeed.x = this.maxSpeed;
      this.action = ENTITY_ACTION.WALK;
      this.direction = ENTITY_DIRECTION.RIGHT;
    } else if (control.keys.get(MOVEMENT.LEFT)?.isPressed) {
      this.currentSpeed.x = -this.maxSpeed;
      this.action = ENTITY_ACTION.WALK;
      this.direction = ENTITY_DIRECTION.LEFT;
    } else {
      this.currentSpeed.x = 0;
    }

    if (this.currentSpeed.x == 0 && this.currentSpeed.y == 0) {
      this.action = ENTITY_ACTION.IDLE;
    }
  }
}
