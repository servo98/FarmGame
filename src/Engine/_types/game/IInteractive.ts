import Control from '../../game/Control';

export default interface IInteractive {
  input(control: Control): void;
}
