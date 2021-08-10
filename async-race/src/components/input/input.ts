import { BaseComponent } from '../base-component';
import './input.scss';

export class Input extends BaseComponent {
  constructor(type: string) {
    super('input', ['inp']);
    this.element.setAttribute('type', type);
    this.defValue(type);
  }

  defValue(type: string): void {
    if (type === 'text') {
      (<HTMLInputElement> this.element).value = '';
      return;
    }
    if (type === 'color') {
      (<HTMLInputElement> this.element).value = '#ffffff';
    }
  }
}
