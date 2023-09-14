import { EntityArgs } from '../object/Entity';

type Player = {
  name: string;
};

export type PlayerArgs = EntityArgs & Player;
