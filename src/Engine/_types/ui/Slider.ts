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
