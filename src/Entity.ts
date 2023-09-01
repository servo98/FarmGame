import { random } from './utils/index';

type Vec2D = {
  x: number;
  y: number;
};

type EntityType = {
  id: string;
  x: number;
  y: number;
  widht: number;
  height: number;
  color?: string;
  speed?: Vec2D;
};

export default class Entity {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  speed: Vec2D;

  constructor(args: EntityType) {
    this.id = args.id;
    this.height = args.height;
    this.width = args.widht;
    this.x = args.x;
    this.y = args.y;
    this.color = args.color || random.rgb();
    this.speed = args.speed || random.vec2d();
  }

  update(deltaTime: number = 1) {
    this.x += this.speed.x * deltaTime;
    this.y += this.speed.y * deltaTime;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = 'black';
    ctx.font = '48px serif';
    ctx.fillText(
      `${this.id}, ${this.speed.x.toFixed(2)}, ${this.speed.y.toFixed(2)}`,
      this.x,
      this.y + this.height / 2
    );
  }
}
