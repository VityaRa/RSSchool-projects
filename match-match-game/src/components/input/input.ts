import { BaseComponent } from '../base-component';
import { Button } from '../button/button';
import { Frame } from './frame';

export const frameTitles = [
  {
    title: 'First Name',
    settings: 'text',
    id: 1,
  },
  {
    title: 'Last Name',
    settings: 'text',
    id: 2,
  },
  {
    title: 'E-mail',
    settings: 'email',
    id: 3,
  },
];

export class Input extends BaseComponent {
  public frames: Frame[];

  constructor() {
    super('div', ['user-input']);

    this.frames = [];

    frameTitles.forEach((elem) => {
      this.frames.push(new Frame(elem.title, elem.settings, elem.id));
    });
    this.frames.forEach((elem) => {
      this.element.appendChild(elem.element);
    });
    this.element.addEventListener('keyup', () => {
      if (this.frames.every((elem) => elem.isCorrect)) {
        const event = new KeyboardEvent('InputRight', { bubbles: true });
        this.element.dispatchEvent(event);
      } else {
        const event = new KeyboardEvent('InputWrong', { bubbles: true });
        this.element.dispatchEvent(event);
      }
    });
  }
}
