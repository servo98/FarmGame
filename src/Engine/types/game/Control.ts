export type IsPressedType = {
  key: string;
  padButton: number;
  isPressed: boolean;
};

export type JsonControl = {
  keyboard: {
    [key in MOVEMENT]: string;
  };
  gamepad: {
    [key in MOVEMENT]: number;
  };
};

export enum MOVEMENT {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}
