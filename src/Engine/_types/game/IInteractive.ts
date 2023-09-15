import Control from '../../game/Control';
import Cursor from '../../ui/Cursor';

export interface IInteractive {
  input(control: Control): void;
}

export interface IUIInteractive {
  input(control: Control, cursor: Cursor): void;
}
