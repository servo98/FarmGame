export default class Control {
  keysDown: Set<string>;
  constructor() {
    this.keysDown = new Set<string>();
  }

  load() {
    //load controlls
    document.addEventListener('keydown', (event) => {
      //   console.log(`tecla ${event.key} abajo`);
      this.keysDown.add(event.key);
    });

    document.addEventListener('keyup', (event) => {
      //   console.log(`tecla ${event.key} arriba`);
      this.keysDown.delete(event.key);
    });
  }
}
