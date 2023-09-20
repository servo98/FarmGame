import { Vec2D } from '../_types';
import { ENTITY_DIRECTION, EntityArgs } from '../_types/object/Entity';
import { GameObjectTypes } from '../_types/object/GameObject';
import AnimatedMapObject from '../map/AnimatedMapObject';
import Animation from './Animation';

export default abstract class Entity<
  STATES extends string,
> extends AnimatedMapObject {
  maxSpeed: number;
  currentSpeed: Vec2D;
  private state: STATES;
  private direction: ENTITY_DIRECTION;
  constructor(args: EntityArgs<STATES>) {
    super({
      ...args,
      type: `${GameObjectTypes.ENTITY}.${args.type}`,
    });
    this.direction = args.direction;
    this.state = args.state;
    this.currentSpeed = args.currentSpeed || {
      x: 0,
      y: 0,
    };
    this.maxSpeed = args.maxSpeed;
  }

  abstract update(): void;

  changeStateOrDir(
    state: STATES,
    direction: ENTITY_DIRECTION,
    justChanged: boolean = true,
  ) {
    this.state = state;
    this.direction = direction;
    this.currentAnimation = this.getAnimationFromState();
    this.currentAnimation.justChanged = justChanged;
  }

  private getAnimationFromState(): Animation {
    const tempAnimation = this.animations.get(
      `${this.state.toLowerCase()}_${this.direction.toLowerCase()}`,
    ) as Animation;

    if (!tempAnimation) {
      console.error(
        `${this.state.toLowerCase()}_${this.direction.toLowerCase()} animation not found on ID:${
          this.id
        } type:${this.type}`,
      );
    }
    return tempAnimation;
  }

  getDirection(): ENTITY_DIRECTION {
    return this.direction;
  }

  getState(): STATES {
    return this.state;
  }
}
