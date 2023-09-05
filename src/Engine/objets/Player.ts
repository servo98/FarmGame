import Control from './Controls';
import AnimatedObject, {
  AnimationType,
  AnimatedObjectArgsNoType,
} from './AnimatedObject';
import { GameObjectTypes } from './GameObject';
import IPlayable from './IPlayable';

type PlayerArgsType = {
  name: string;
  object: AnimatedObjectArgsNoType;
};

export default class Player extends AnimatedObject implements IPlayable {
  name: string;
  constructor(args: PlayerArgsType) {
    super({
      animated: args.object.animated,
      gameObject: {
        ...args.object.gameObject,
        type: GameObjectTypes.PLAYER,
      },
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
