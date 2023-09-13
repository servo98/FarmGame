import { Vec2D } from '../types';
import { CameraArgs } from '../types/game/Camera';
import { MOVEMENT } from '../types/game/Control';
import IMovable from '../types/game/interfaces/IMovable';
import IPlayable from '../types/game/interfaces/IPlayable';
import Control from './Controls';

export default class Camera implements IPlayable, IMovable {
  x: number;
  y: number;
  width: number;
  height: number;
  currentSpeed: Vec2D;
  maxSpeed: number;
  zoom: number;

  constructor(args: CameraArgs) {
    this.zoom = 1 / args.zoom;
    this.x = args.x;
    this.y = args.y;
    this.width = args.width;
    this.height = args.height;
    this.currentSpeed = {
      x: 0,
      y: 0,
    };
    this.maxSpeed = args.maxSpeed;
  }
  update(): void {
    this.x += this.currentSpeed.x;
    this.y += this.currentSpeed.y;
  }
  input(control: Control): void {
    if (control.keys.get(MOVEMENT.DOWN)?.isPressed) {
      this.currentSpeed.y = this.maxSpeed;
    } else if (control.keys.get(MOVEMENT.UP)?.isPressed) {
      this.currentSpeed.y = -this.maxSpeed;
    } else {
      this.currentSpeed.y = 0;
    }
    if (control.keys.get(MOVEMENT.RIGHT)?.isPressed) {
      this.currentSpeed.x = this.maxSpeed;
    } else if (control.keys.get(MOVEMENT.LEFT)?.isPressed) {
      this.currentSpeed.x = -this.maxSpeed;
    } else {
      this.currentSpeed.x = 0;
    }
  }
}
