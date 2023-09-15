// export default class Slider implements IRenderable, IInteractive {
//   emptyBar: GameObject;
//   fillBar: GameObject;
//   grabber: GameObject;
//   dWidth: number;
//   dHeight: number;
//   x: number;
//   y: number;
//   value: number;
//   src: string;

//   constructor(args: SliderArgs) {
//     this.value = args.initialValue || 0;
//     this.x = args.x;
//     this.y = args.y;
//     this.dWidth = args.dWidth || args.width;
//     this.dHeight = args.dHeight || args.height;
//     this.src = args.src;
//     this.emptyBar = new GameObject({
//       x: args.x,
//       y: args.y,
//       width: 16 * 10,
//       height: 16,
//       id: 'EmptyBar',
//     });
//     this.fillBar = new GameObject({
//       x: args.x,
//       y: args.y,
//       width: 16 * 10,
//       height: 16,
//       id: 'FillBar',
//     });
//     this.grabber = new GameObject({
//       x: args.x,
//       y: args.y,
//       width: 16,
//       height: 16,
//       id: 'Grabger',
//     });
//   }

//   async load(): Promise<void> {
//     const img = await file.loadImage(`resources/UI/${this.src}`);
//     this.emptyBar.image = img;
//     this.grabber.image = img;
//     this.fillBar.image = img;
//   }

//   input(_control: Control): void {}
//   render(ctx: CanvasRenderingContext2D): void {
//     this.emptyBar.render(ctx);
//     this.fillBar.render(ctx);
//     this.grabber.render(ctx);
//   }
// }
