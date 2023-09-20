import { MOVEMENT } from '../_types/game/Control';
import { ENTITY_DIRECTION } from '../_types/object/Entity';
import { PlayerArgs } from '../_types/game/Player';
import Entity from '../objects/Entity';
import Control from './Control';
import { GameObjectTypes } from '../_types/object/GameObject';
import { IInteractive } from '../_types/game/IInteractive';

export enum PLAYER_STATES {
  WALK = 'WALK',
  IDLE = 'IDLE',
}

export default class Player
  extends Entity<PLAYER_STATES>
  implements IInteractive
{
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
      this.changeStateOrDir(PLAYER_STATES.WALK, ENTITY_DIRECTION.DOWN, false);
    } else if (control.keys.get(MOVEMENT.UP)?.isPressed) {
      this.currentSpeed.y = -this.maxSpeed;
      this.changeStateOrDir(PLAYER_STATES.WALK, ENTITY_DIRECTION.UP, false);
    } else {
      this.currentSpeed.y = 0;
    }
    if (control.keys.get(MOVEMENT.RIGHT)?.isPressed) {
      this.currentSpeed.x = this.maxSpeed;
      this.changeStateOrDir(PLAYER_STATES.WALK, ENTITY_DIRECTION.RIGHT, false);
    } else if (control.keys.get(MOVEMENT.LEFT)?.isPressed) {
      this.currentSpeed.x = -this.maxSpeed;
      this.changeStateOrDir(PLAYER_STATES.WALK, ENTITY_DIRECTION.LEFT, false);
    } else {
      this.currentSpeed.x = 0;
    }

    if (this.currentSpeed.x == 0 && this.currentSpeed.y == 0) {
      this.changeStateOrDir(PLAYER_STATES.IDLE, this.getDirection(), false);
    }
  }

  update(): void {
    this.x += this.currentSpeed.x;
    this.y += this.currentSpeed.y;
  }
}
