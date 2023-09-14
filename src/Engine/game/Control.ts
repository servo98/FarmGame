import {
  ControlType,
  IsPressedType,
  JsonControl,
  MOVEMENT,
} from '../_types/game/Control';
import { file } from '../utils';

export default class Control {
  keys: Map<MOVEMENT, IsPressedType>;
  gamePadConnected: boolean;
  currentControlType: ControlType;
  constructor() {
    this.keys = new Map<MOVEMENT, IsPressedType>();
    this.gamePadConnected = false;
    this.currentControlType = ControlType.KEYBOARD;
  }

  async load() {
    const jsonControls = (await file.loadJsonFile(
      'resources/CONFIG/controls.json',
    )) as JsonControl;
    this.keys = new Map<MOVEMENT, IsPressedType>();

    const keyboardControls = jsonControls.keyboard;

    for (const [key, value] of Object.entries(keyboardControls)) {
      const tempKey = this.keys.get(
        MOVEMENT[key as keyof typeof MOVEMENT],
      ) as IsPressedType;

      this.keys.set(MOVEMENT[key as keyof typeof MOVEMENT], {
        ...tempKey,
        isPressed: false,
        key: value,
      });
    }

    const gamepadControls = jsonControls.gamepad;

    for (const [key, value] of Object.entries(gamepadControls)) {
      const tempKey = this.keys.get(
        MOVEMENT[key as keyof typeof MOVEMENT],
      ) as IsPressedType;
      this.keys.set(MOVEMENT[key as keyof typeof MOVEMENT], {
        ...tempKey,
        isPressed: false,
        padButton: value,
      });
    }

    //load controlls
    window.addEventListener('keydown', (event) => {
      this.currentControlType = ControlType.KEYBOARD;

      const temporalKey = this.keyToMOVEMENT(event.key);
      if (!temporalKey) return;
      const temp = this.keys.get(temporalKey) as IsPressedType;
      temp.isPressed = true;
      this.keys.set(temporalKey, temp);
    });

    window.addEventListener('keyup', (event) => {
      const temporalKey = this.keyToMOVEMENT(event.key);
      if (!temporalKey) return;
      const temp = this.keys.get(temporalKey) as IsPressedType;
      temp.isPressed = false;
      this.keys.set(temporalKey, temp);
    });

    window.addEventListener('gamepadconnected', (_) => {
      //TODO: pop up notice
      // console.log(`Gamepad connected: ${event.gamepad.id}`);
      // console.log(event.gamepad);

      this.gamePadConnected = true;
    });

    window.addEventListener('gamepaddisconnected', (_) => {
      // console.log(`Gamepad disconected: ${event.gamepad.id}`);
      this.gamePadConnected = false;
    });
  }

  input() {
    if (!this.gamePadConnected) return;

    const gamepad = navigator.getGamepads()[0] as Gamepad;

    /**
       *  0 => A
          1 => B
          2 => X
          3 => Y
          4 => LB
          5 => RB
          6 => LT
          7 => RT
          8 => SELECT
          9 => START
          10 => LS
          11 => RS
          12 => Pad up
          13 => Pad down
          14 => Pad left
          15 => Pad right
          16 => XBOX button
  
  
          const leftStickX = gamepad.axes[0];
        const leftStickY = gamepad.axes[1];
        const rightStickX = gamepad.axes[2];
        const rightStickY = gamepad.axes[3];
  
       */

    let wasPadTouched = false;
    gamepad.buttons.forEach((button, index) => {
      const temporalKey = this.buttonToMovement(index);
      if (!temporalKey) return;
      wasPadTouched = wasPadTouched || button.touched;
      if (this.currentControlType === ControlType.GAMEPAD) {
        const temp = this.keys.get(temporalKey) as IsPressedType;
        temp.isPressed = button.pressed;
        this.keys.set(temporalKey, temp);
      }
    });
    if (wasPadTouched) {
      this.currentControlType = ControlType.GAMEPAD;
    }

    // if (gamepad.axes[0] < -0.8) {
    //   console.log('LEFT');
    // } else if (gamepad.axes[0] > 0.8) {
    //   console.log('RIGHT');
    // } else {
    //   console.log('x centered');
    // }

    // if (gamepad.axes[1] < -0.8) {
    //   console.log('UP');
    // } else if (gamepad.axes[1] > 0.8) {
    //   console.log('DOWN');
    // } else {
    //   console.log('y centered');
    // }
  }

  private keyToMOVEMENT(searchKey: string): MOVEMENT | null {
    for (const [key, isPressedObj] of this.keys) {
      if (isPressedObj.key.toUpperCase() === searchKey.toUpperCase()) {
        return key;
      }
    }
    return null;
  }

  private buttonToMovement(button: number): MOVEMENT | null {
    for (const [key, isPressedObj] of this.keys) {
      if (isPressedObj.padButton === button) {
        return key;
      }
    }
    return null;
  }
}
