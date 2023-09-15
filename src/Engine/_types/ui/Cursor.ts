import { UIElementArgs } from './UIElement';

export enum CURSOR_STATES {
  NORMAL,
  HOVER,
  CLICKED,
}

export type CursorArgs = Omit<UIElementArgs, 'x' | 'y'>;
