import Control from '../../../game/Controls';

export default interface IPlayable {
  input(control: Control): void;
}
