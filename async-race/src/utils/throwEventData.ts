import { Car, Winner } from '../components/models';

export const throwEventData = (eventName: string, data: Car | Winner): void => {
  const event = new CustomEvent(eventName, { bubbles: true, detail: { data } });
  document.dispatchEvent(event);
};

export const throwEvent = (eventName: string): void => {
  const event = new CustomEvent(eventName, { bubbles: true });
  document.dispatchEvent(event);
};
