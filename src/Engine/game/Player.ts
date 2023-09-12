import Control from './Controls';
import IPlayable from '../types/game/interfaces/IPlayable';
import Entity from '../objet/Entity';
import { PlayerArgsType } from '../types/game/Player';
import { AnimationType } from '../types/object/AnimatedObject';
import { KEYS } from '../types/game/Control';

export default class Player extends Entity implements IPlayable {
  name: string;
  constructor(args: PlayerArgsType) {
    super({
      ...args.entity,
    });
    this.name = args.name;
  }

  input(control: Control) {
    if (control.keys.get(KEYS.DOWN)?.isPressed) {
      this.currentSpeed.y = this.maxSpeed;
      this.currentAnimation = this.animations.get('walk_down') as AnimationType;
    } else if (control.keys.get(KEYS.UP)?.isPressed) {
      this.currentSpeed.y = -this.maxSpeed;
      this.currentAnimation = this.animations.get('walk_up') as AnimationType;
    } else {
      this.currentSpeed.y = 0;
    }
    if (control.keys.get(KEYS.RIGHT)?.isPressed) {
      this.currentSpeed.x = this.maxSpeed;
      this.currentAnimation = this.animations.get(
        'walk_right',
      ) as AnimationType;
    } else if (control.keys.get(KEYS.LEFT)?.isPressed) {
      this.currentSpeed.x = -this.maxSpeed;
      this.currentAnimation = this.animations.get('walk_left') as AnimationType;
    } else {
      this.currentSpeed.x = 0;
    }
  }
}
