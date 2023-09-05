import Control from './Controls';

export default interface IPlayable {
  input(control: Control): void;
}
