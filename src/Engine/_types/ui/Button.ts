import { UIElementArgs } from './UIElement';

export enum BUTTON_SATES {
  NORMAL,
  HOVER,
  CLICKED,
  DISABLED,
}

export type ButtonArgs = {
  text: string;
  state?: BUTTON_SATES;
} & UIElementArgs;
