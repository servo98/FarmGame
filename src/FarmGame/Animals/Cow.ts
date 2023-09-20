import { ENTITY_DIRECTION } from '../../Engine/_types/object/Entity';
import Animal, { ANIMAL_STATES, ANIMAL_TYPES } from './Animal';
import Animation from '../../Engine/objects/Animation';

const cowAnimations = new Map<string, Animation>();

cowAnimations.set(
  'idle_right',
  new Animation({
    allowOverride: false,
    duration: 2000,
    frames: 3,
    index: 1,
    name: 'idle_right',
  }),
);
cowAnimations.set(
  'walk_right',
  new Animation({
    allowOverride: false,
    duration: 2000,
    frames: 8,
    index: 2,
    name: 'walk_right',
  }),
);

cowAnimations.set(
  'sit_right',
  new Animation({
    allowOverride: false,
    duration: 2000,
    frames: 3,
    index: 3,
    name: 'sit_right',
    loopeable: false,
  }),
);

cowAnimations.set(
  'sit_idle_right',
  new Animation({
    allowOverride: false,
    duration: 2000,
    frames: 3,
    index: 4,
    name: 'sit_idle_right',
  }),
);

cowAnimations.set(
  'sit_up_right',
  new Animation({
    allowOverride: false,
    duration: 2000,
    frames: 4,
    index: 5,
    name: 'sit_up_right',
    loopeable: false,
  }),
);

cowAnimations.set(
  'sit_sleep_right',
  new Animation({
    allowOverride: false,
    duration: 3000,
    frames: 4,
    index: 6,
    name: 'sit_sleep_right',
  }),
);

cowAnimations.set(
  'eat_right',
  new Animation({
    allowOverride: false,
    duration: 2000,
    frames: 7,
    index: 7,
    name: 'eat_right',
  }),
);

cowAnimations.set(
  'chew_right',
  new Animation({
    allowOverride: false,
    duration: 1000,
    frames: 4,
    index: 8,
    name: 'chew_right',
  }),
);

cowAnimations.set(
  'love_right',
  new Animation({
    allowOverride: false,
    duration: 3000,
    frames: 6,
    index: 9,
    name: 'love_right',
    loopeable: false,
  }),
);

cowAnimations.set(
  'idle_left',
  new Animation({
    allowOverride: false,
    duration: 2000,
    frames: 3,
    index: 10,
    name: 'idle_left',
  }),
);
cowAnimations.set(
  'walk_left',
  new Animation({
    allowOverride: false,
    duration: 2000,
    frames: 8,
    index: 11,
    name: 'walk_left',
  }),
);

cowAnimations.set(
  'sit_left',
  new Animation({
    allowOverride: false,
    duration: 2000,
    frames: 3,
    index: 12,
    name: 'sit_left',
    loopeable: false,
  }),
);

cowAnimations.set(
  'sit_idle_left',
  new Animation({
    allowOverride: false,
    duration: 2000,
    frames: 3,
    index: 13,
    name: 'sit_idle_left',
  }),
);

cowAnimations.set(
  'sit_up_left',
  new Animation({
    allowOverride: false,
    duration: 2000,
    frames: 4,
    index: 14,
    name: 'sit_up_left',
    loopeable: false,
  }),
);

cowAnimations.set(
  'sit_sleep_left',
  new Animation({
    allowOverride: false,
    duration: 3000,
    frames: 4,
    index: 15,
    name: 'sit_sleep_left',
  }),
);

cowAnimations.set(
  'eat_left',
  new Animation({
    allowOverride: false,
    duration: 2000,
    frames: 7,
    index: 16,
    name: 'eat_left',
  }),
);

cowAnimations.set(
  'chew_left',
  new Animation({
    allowOverride: false,
    duration: 1000,
    frames: 4,
    index: 17,
    name: 'chew_left',
  }),
);

cowAnimations.set(
  'love_left',
  new Animation({
    allowOverride: false,
    duration: 3000,
    frames: 6,
    index: 18,
    name: 'love_left',
    loopeable: false,
  }),
);
const cowAnimationStates = new Map<ANIMAL_STATES, ANIMAL_STATES[]>();

// SIT = 'SIT',
// WALK = 'WALK',
// IDLE = 'IDLE',
// SIT_IDLE = 'SIT_IDLE',
// SIT_UP = 'SIT_UP',
// SIT_SLEEP = 'SIT_SLEEP',
// EAT = 'EAT',
// CHEW = 'CHEW',
// LOVE = 'LOVE',

cowAnimationStates.set(ANIMAL_STATES.IDLE, [
  ANIMAL_STATES.WALK,
  ANIMAL_STATES.EAT,
  ANIMAL_STATES.LOVE,
  ANIMAL_STATES.SIT,
]);

cowAnimationStates.set(ANIMAL_STATES.WALK, [
  ANIMAL_STATES.IDLE,
  ANIMAL_STATES.EAT,
  ANIMAL_STATES.LOVE,
  ANIMAL_STATES.SIT,
]);

cowAnimationStates.set(ANIMAL_STATES.EAT, [ANIMAL_STATES.CHEW]);

cowAnimationStates.set(ANIMAL_STATES.CHEW, [
  ANIMAL_STATES.WALK,
  ANIMAL_STATES.IDLE,
  ANIMAL_STATES.EAT,
  ANIMAL_STATES.LOVE,
  ANIMAL_STATES.SIT,
]);

cowAnimationStates.set(ANIMAL_STATES.LOVE, [
  ANIMAL_STATES.WALK,
  ANIMAL_STATES.IDLE,
  ANIMAL_STATES.EAT,
  ANIMAL_STATES.SIT,
]);

cowAnimationStates.set(ANIMAL_STATES.SIT, [
  ANIMAL_STATES.SIT_IDLE,
  ANIMAL_STATES.SIT_SLEEP,
  ANIMAL_STATES.SIT_UP,
]);

cowAnimationStates.set(ANIMAL_STATES.SIT_SLEEP, [
  ANIMAL_STATES.SIT_IDLE,
  ANIMAL_STATES.SIT_UP,
]);

cowAnimationStates.set(ANIMAL_STATES.SIT_IDLE, [
  ANIMAL_STATES.SIT_SLEEP,
  ANIMAL_STATES.SIT_UP,
]);

cowAnimationStates.set(ANIMAL_STATES.SIT_UP, [ANIMAL_STATES.IDLE]);

type CowArgs = {
  x: number;
  y: number;
};

export default class Cow extends Animal {
  constructor(args: CowArgs) {
    super({
      animalType: ANIMAL_TYPES.COW,
      animations: cowAnimations,
      animationStates: cowAnimationStates,
      height: 32,
      width: 32,
      id: 'cow',
      maxSpeed: 1,
      x: args.x,
      y: args.y,
      direction: ENTITY_DIRECTION.RIGHT,
      src: 'cow.png',
      state: ANIMAL_STATES.IDLE,
    });
  }
}
