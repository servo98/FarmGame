export type IsPressedType = {
  key: string;
  isPressed: boolean;
};

export type JsonControl = {
  [key in KEYS]: string;
};

export enum KEYS {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}
