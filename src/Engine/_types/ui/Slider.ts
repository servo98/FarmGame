import { UIElementArgs } from './UIElement';

export type GrabberOptions = {
  width: number;
  height: number;
};

export type SliderArgs = {
  value?: number;
  lenght: number;
  grabberOptions: GrabberOptions;
} & UIElementArgs;

export enum SLIDER_PARTS {
  EMPTY,
  FILL,
  GRABBER,
}

export enum SLIDER_EVENTS {
  VALUE_CHANGE = 'VALUE_CHANGE',
}

export interface ChangeSliderValueEvent extends Event {
  newValue: number;
}
