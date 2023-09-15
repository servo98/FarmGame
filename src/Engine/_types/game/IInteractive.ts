import Control from '../../game/Control';

export interface IInteractive {
  input(control: Control): void;
}
