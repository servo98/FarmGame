import { Vec2D } from '../_types';
import { CameraArgs } from '../_types/game/Camera';
import { MOVEMENT } from '../_types/game/Control';
import Control from './Control';

export default class Camera {
  x: number;
  y: number;
  width: number;
  height: number;
  currentSpeed: Vec2D;
  maxSpeed: number;
  zoom: number;

  constructor(args: CameraArgs) {
    this.zoom = 1 / args.zoom;
    this.x = args.x; //+ (args.width - args.width / args.zoom) / 2;
    this.y = args.y; // + (args.height - args.height / args.zoom) / 2;
    this.width = args.width;
    this.height = args.height;
    this.currentSpeed = {
      x: 0,
      y: 0,
    };
    this.maxSpeed = args.maxSpeed;
  }
  update(): void {
    this.x =
      /*this.x + this.currentSpeed.x <= 0 ? 0 :*/ this.x + this.currentSpeed.x;
    this.y =
      /*this.y + this.currentSpeed.y <= 0 ? 0 :*/ this.y + this.currentSpeed.y;
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
