import {
  ControlType,
  IsPressedType,
  JsonControl,
  MouseType,
  MOVEMENT,
} from '../_types/game/Control';
import { file } from '../utils';

export default class Control {
  keys: Map<MOVEMENT, IsPressedType>;
  mouse: MouseType;
  gamePadConnected: boolean;
  currentControlType: ControlType;
  constructor() {
    this.keys = new Map<MOVEMENT, IsPressedType>();
    this.gamePadConnected = false;
    this.currentControlType = ControlType.KEYBOARD;
    this.mouse = {
      isLeftButtonDown: false,
      isCenterButtonDown: false,
      isRightButtonDown: false,
      currentX: 0,
      currentY: 0,
    };
  }

  async load() {
    await this.loadControlsFromConfig();
    this.loadEvents();
  }

  input() {
    this.gamePadInput();
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

  private loadEvents() {
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

      this.gamePadConnected = true;
    });

    window.addEventListener('gamepaddisconnected', (_) => {
      //TODO: pop up notice
      this.gamePadConnected = false;
    });

    window.addEventListener('mousedown', (event) => {
      switch (event.button) {
        case 0:
          this.mouse.isLeftButtonDown = true;
          break;
        case 1:
          this.mouse.isCenterButtonDown = true;
          break;
        case 2:
          this.mouse.isRightButtonDown = true;
          break;
        default:
          break;
      }
    });

    window.addEventListener('mouseup', (event) => {
      switch (event.button) {
        case 0:
          this.mouse.isLeftButtonDown = false;
          break;
        case 1:
          this.mouse.isCenterButtonDown = false;
          break;
        case 2:
          this.mouse.isRightButtonDown = false;
          break;
        default:
          break;
      }
    });

    window.addEventListener('mousemove', (event) => {
      this.mouse.currentX = event.clientX;
      this.mouse.currentY = event.clientY;
    });

    document.addEventListener('contextmenu', function (event) {
      event.preventDefault();
    });
  }

  private async loadControlsFromConfig() {
    try {
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
    } catch (error) {
      console.error('Error loading control config file', error);
    }
  }

  private gamePadInput() {
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

    if (!this.gamePadConnected) return;

    const gamepad = navigator.getGamepads()[0] as Gamepad;
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
  }
}
