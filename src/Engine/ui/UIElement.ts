import { MouseType } from '../_types/game/Control';
import { CURSOR_STATES } from '../_types/ui/Cursor';
import { UIEVENTS, UIElementArgs } from '../_types/ui/UIElement';
import Control from '../game/Control';
import Cursor from './Cursor';
import { v4 as uuid } from 'uuid';

export default abstract class UIElement {
  x: number;
  y: number;
  dWidth: number;
  dHeight: number;
  sWidth: number;
  sHeight: number;
  uuid: string;
  src: string;
  private eventListeners: { [type: string]: EventListener[] } = {};
  private mouseEnterDispapched = false;
  private mouseExitDispached = false;
  private mouseClickDownDispached = false;
  private mouseClickUpDispached = false;
  protected isMouseOver = false;
  private isPushed = false;

  constructor(args: UIElementArgs) {
    this.x = args.x;
    this.y = args.y;
    this.sHeight = args.sHeight;
    this.sWidth = args.sWidth;
    this.dHeight = args.dHeight || args.sHeight;
    this.dWidth = args.dWidth || args.sWidth;
    this.uuid = uuid();
    this.src = args.src;
  }

  input(control: Control, cursor: Cursor): void {
    /**
     * //TODO: mouse over
     * //TODO: mouse enter
     * //TODO: mouse exit
     * //TODO: mouse down
     * //TODO: mouse up
     */

    if (this.isMouseOverFromCoords(control.mouse)) {
      this.isMouseOver = true;
      this.mouseExitDispached = false;
      if (!this.mouseEnterDispapched) {
        // Cursor.state = CURSOR_STATES.HOVER;
        cursor.state = CURSOR_STATES.HOVER;
        this.dispatchEvent(new Event(UIEVENTS.MOUSE_ENTER));
        this.mouseEnterDispapched = true;
      }
      if (control.mouse.isLeftButtonDown) {
        this.isPushed = true;
        if (!this.mouseClickDownDispached) {
          cursor.state = CURSOR_STATES.CLICKED;
          this.dispatchEvent(new Event(UIEVENTS.MOUSE_DOWN));
          this.mouseClickDownDispached = true;
          this.mouseClickUpDispached = false;
        }
      } else {
        if (this.isPushed && !this.mouseClickUpDispached) {
          cursor.state = CURSOR_STATES.HOVER;
          this.dispatchEvent(new Event(UIEVENTS.MOUSE_UP));
          this.mouseClickUpDispached = true;
          this.mouseClickDownDispached = false;
        }
        this.isPushed = false;
      }
    } else {
      this.isMouseOver = false;

      if (this.mouseEnterDispapched && !this.mouseExitDispached) {
        cursor.state = CURSOR_STATES.NORMAL;
        this.dispatchEvent(new Event(UIEVENTS.MOUSE_EXIT));
        this.mouseExitDispached = true;
        this.mouseEnterDispapched = false;
        this.mouseClickUpDispached = false;
      }
    }
    this.handleInput(control, cursor);
  }

  abstract handleInput(control: Control, cursor?: Cursor): void;

  abstract load(): Promise<void>;
  abstract render(ctx: CanvasRenderingContext2D): void;

  private isMouseOverFromCoords(mouse: MouseType) {
    return (
      mouse.currentX > this.x &&
      mouse.currentX < this.x + this.dWidth &&
      mouse.currentY > this.y &&
      mouse.currentY < this.y + this.dHeight
    );
  }

  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
  ): void {
    if (!(type in this.eventListeners)) {
      this.eventListeners[type] = [];
    }
    this.eventListeners[type].push(listener as EventListener);
  }

  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
  ): void {
    if (type in this.eventListeners) {
      const index = this.eventListeners[type].indexOf(
        listener as EventListener,
      );
      if (index !== -1) {
        this.eventListeners[type].splice(index, 1);
      }
    }
  }

  dispatchEvent(event: Event): boolean {
    if (event.type in this.eventListeners) {
      for (const listener of this.eventListeners[event.type]) {
        if (typeof listener === 'function') {
          listener.call(this, event);
        }
      }
    }
    return !event.defaultPrevented;
  }
}
