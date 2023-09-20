import { EntityArgs } from '../../Engine/_types/object/Entity';
import { AnimiationStates } from '../../Engine/_types/object/StateMachine';
import Entity from '../../Engine/objects/Entity';

export enum ANIMAL_STATES {
  SIT = 'SIT',
  WALK = 'WALK',
  IDLE = 'IDLE',
  SIT_IDLE = 'SIT_IDLE',
  SIT_UP = 'SIT_UP',
  SIT_SLEEP = 'SIT_SLEEP',
}

type AnimalArgs = {
  animalType: ANIMAL_TYPES;
  animationStates: AnimiationStates<ANIMAL_STATES>;
} & EntityArgs<ANIMAL_STATES>;

export enum ANIMAL_TYPES {
  COW = 'COW',
  CHICKEN = 'CHICKEN',
}

export default class Animal extends Entity<ANIMAL_STATES> {
  lastAnimationStamp: number;
  animalType: string;
  animationStates: AnimiationStates<ANIMAL_STATES>;
  private timeOut?: number;
  private until: number;

  constructor(args: AnimalArgs) {
    super({
      ...args,
      type: 'COW',
    });
    this.animalType = args.animalType;
    this.lastAnimationStamp = Date.now();
    this.animationStates = args.animationStates;
    this.until = Date.now();
  }

  update() {
    this.x += this.currentSpeed.x;
    this.y += this.currentSpeed.y;
    this.changeState();
  }

  private changeState() {
    const now = Date.now();

    if (this.until <= now) {
      const state = this.getRandomEnumValue();
      this.changeStateOrDir(state, this.getDirection());

      if (!this.currentAnimation.loopeable) {
        this.until = now + this.currentAnimation.duration;
      } else {
        const newTime = this.random(this.currentAnimation.duration, 5000);
        this.until = now + newTime;
      }
    }
  }

  private random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private getRandomEnumValue(): ANIMAL_STATES {
    const possibles = this.animationStates.get(
      this.getState(),
    ) as ANIMAL_STATES[];

    const random = possibles[Math.floor(Math.random() * possibles.length)];

    return random;
  }
}
