export type UIElementArgs = {
  x: number;
  y: number;
  dWidth?: number;
  dHeight?: number;
  sWidth: number;
  sHeight: number;
  id: string;
  src: string;
};

export enum UIEVENTS {
  MOUSE_ENTER = 'MOUSE_ENTER',
  MOUSE_EXIT = 'MOUSE_EXIT',
  MOUSE_DOWN = 'MOUSE_DOWN',
  MOUSE_UP = 'MOUSE_UP',
}
