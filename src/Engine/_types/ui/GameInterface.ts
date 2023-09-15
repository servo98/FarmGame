import Cursor from '../../ui/Cursor';
import UIElement from '../../ui/UIElement';

export type GameInterfaceArgs = {
  name: string;
  elements: Map<string, UIElement>;
  cursor: Cursor;
};
