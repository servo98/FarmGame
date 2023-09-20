import {
  ENTITY_DIRECTION,
  EntityArgs,
} from '../../Engine/_types/object/Entity';
import { AnimiationStates } from '../../Engine/_types/object/StateMachine';
import Entity from '../../Engine/objects/Entity';

export enum ANIMAL_STATES {
  SIT = 'SIT',
  WALK = 'WALK',
  IDLE = 'IDLE',
  SIT_IDLE = 'SIT_IDLE',
  SIT_UP = 'SIT_UP',
  SIT_SLEEP = 'SIT_SLEEP',
  EAT = 'EAT',
  CHEW = 'CHEW',
  LOVE = 'LOVE',
}

export type AnimalArgs = {
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
      type: 'ANIMAL',
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
      let direction = this.getRandomDirection();
      direction =
        direction == ENTITY_DIRECTION.DOWN
          ? ENTITY_DIRECTION.LEFT
          : direction == ENTITY_DIRECTION.UP
          ? ENTITY_DIRECTION.RIGHT
          : direction;
      console.log('NEW DIRECTION:', direction);

      console.log(
        `From: ${this.getState()}_${this.getDirection()} -> To: ${state}_${this.getDirection()}`,
      );
      this.changeStateOrDir(state, direction);
      if (this.getState() == ANIMAL_STATES.WALK) {
        this.currentSpeed = {
          x:
            this.getDirection() == ENTITY_DIRECTION.RIGHT
              ? this.maxSpeed
              : -this.maxSpeed,
          y: 0,
        };
      } else {
        this.currentSpeed = {
          x: 0,
          y: 0,
        };
      }

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

  private getRandomDirection(): ENTITY_DIRECTION {
    const directionsArray = Object.values(ENTITY_DIRECTION);
    const random = Math.floor(Math.random() * directionsArray.length);
    return ENTITY_DIRECTION[directionsArray[random]];
  }
}
