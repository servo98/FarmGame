import { KEYS, IsPressedType, JsonControl } from '../types/game/Control';
import { file } from '../utils';

export default class Control {
  keys: Map<KEYS, IsPressedType>;
  constructor() {
    this.keys = new Map<KEYS, IsPressedType>();
  }

  async load() {
    const jsonControls = (await file.loadJsonFile(
      'resources/CONFIG/controls.json',
    )) as JsonControl;

    for (const [key, value] of Object.entries(jsonControls)) {
      this.keys.set(KEYS[key as keyof typeof KEYS], {
        isPressed: false,
        key: value,
      });
    }

    //load controlls
    document.addEventListener('keydown', (event) => {
      const temporalKey = this.keyToKEY(event.key);
      if (!temporalKey) return;
      const temp = this.keys.get(temporalKey) as IsPressedType;
      temp.isPressed = true;
      this.keys.set(temporalKey, temp);
    });

    document.addEventListener('keyup', (event) => {
      const temporalKey = this.keyToKEY(event.key);
      if (!temporalKey) return;
      const temp = this.keys.get(temporalKey) as IsPressedType;
      temp.isPressed = false;
      this.keys.set(temporalKey, temp);
    });
  }

  private keyToKEY(searchKey: string): KEYS | null {
    // console.log(searchKey);

    for (const [key, isPressedObj] of this.keys) {
      if (isPressedObj.key.toUpperCase() === searchKey.toUpperCase()) {
        return key;
      }
    }
    return null;
  }
}
