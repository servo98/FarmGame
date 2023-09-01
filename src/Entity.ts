import { randomRGB } from './utils/index';
type EntityType = {
  id: string;
  x: number;
  y: number;
  widht: number;
  height: number;
  color?: string;
};

export default class Entity {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;

  constructor(args: EntityType) {
    this.id = args.id;
    this.height = args.height;
    this.width = args.widht;
    this.x = args.x;
    this.y = args.y;
    this.color = args.color || randomRGB();
  }

  update() {
    this.x += 1;
  }

  render(ctx: CanvasRenderingContext2D) {
    console.log(`rendering ${this.id}`);

    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
