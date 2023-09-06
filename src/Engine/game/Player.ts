import Control from './Controls';
import IPlayable from '../types/game/interfaces/IPlayable';
import Entity from '../objet/Entity';
import { PlayerArgsType } from '../types/game/Player';
import { AnimationType } from '../types/object/AnimatedObject';

export default class Player extends Entity implements IPlayable {
  name: string;
  constructor(args: PlayerArgsType) {
    super({
      ...args.entity,
    });
    this.name = args.name;
  }

  input(controll: Control) {
    if (controll.keysDown.has('s')) {
      this.currentSpeed.y = this.maxSpeed;
      this.currentAnimation = this.animations.get('idle_down') as AnimationType;
    } else if (controll.keysDown.has('w')) {
      this.currentSpeed.y = -this.maxSpeed;
      this.currentAnimation = this.animations.get('idle_up') as AnimationType;
    } else {
      this.currentSpeed.y = 0;
    }

    if (controll.keysDown.has('d')) {
      this.currentSpeed.x = this.maxSpeed;
      this.currentAnimation = this.animations.get(
        'idle_right'
      ) as AnimationType;
    } else if (controll.keysDown.has('a')) {
      this.currentSpeed.x = -this.maxSpeed;
      this.currentAnimation = this.animations.get('idle_left') as AnimationType;
    } else {
      this.currentSpeed.x = 0;
    }
  }
}
