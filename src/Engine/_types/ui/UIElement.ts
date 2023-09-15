import { AnimatedGameObjectArgs } from '../object/AnimatedGameObject';
import { default as UIElementClass } from '../../ui/UIElement';
import { default as CursorClass } from '../../ui/Cursor';

export type UIElement = {
  dWidth?: number;
  dHeight?: number;
};
export type UIElementargs = AnimatedGameObjectArgs & UIElement;

type Cursor = {
  name: string;
};

export type CursorArgs = Cursor &
  Omit<UIElementargs, 'x' | 'y' | 'dWidth' | 'dHeight'>;

export type CursorType = {
  name: string;
  img: HTMLImageElement;
};

export type GameInterfaceArgs = {
  name: string;
  elements: Map<string, UIElementClass>;
  cursor: CursorClass;
};

export type Button = {
  onClick: () => void;
  text: string;
};

export type ButtonArgs = Button & UIElementargs;
