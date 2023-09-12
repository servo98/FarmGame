import { AnimationType } from '../object/AnimatedObject';

export type AnimatedTileArgsType = {
  animatedObject: {
    animations: Map<string, AnimationType>;
    gameObject: {
      id: string;
      x: number;
      y: number;
      width: number;
      height: number;
      image: HTMLImageElement;
    };
  };
  sx: number;
  sy: number;
};
