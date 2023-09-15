import UIElement from './UIElement';

export default abstract class UIElementTarget
  extends UIElement
  implements EventTarget
{
  private eventListeners: { [type: string]: EventListener[] } = {};

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
