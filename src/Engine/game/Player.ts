import Control from './Controls';
import IPlayable from '../types/game/interfaces/IPlayable';
import Entity from '../objet/Entity';
import { PlayerArgsType } from '../types/game/Player';
import { MOVEMENT } from '../types/game/Control';
import { ENTITY_ACTION, ENTITY_DIRECTION } from '../types/object/Entity';

export default class Player extends Entity implements IPlayable {
  name: string;
  constructor(args: PlayerArgsType) {
    super({
      ...args.entity,
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
