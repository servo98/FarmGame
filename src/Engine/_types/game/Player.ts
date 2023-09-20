import { PLAYER_STATES } from '../../game/Player';
import { EntityArgs } from '../object/Entity';

type Player = {
  name: string;
};

export type PlayerArgs = EntityArgs<PLAYER_STATES> & Player;
