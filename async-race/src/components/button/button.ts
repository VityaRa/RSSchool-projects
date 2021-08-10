import { BaseComponent } from '../base-component';
import './button.scss';

export class Button extends BaseComponent {
  constructor(
    extraStyles: string[] = [],
    content: string,
    dataTitle?: string,
    dataValue?: string,
  ) {
    super('button', ['btn', ...extraStyles]);
    this.element.innerHTML = content;
    if (dataTitle && dataValue) {
      this.element.setAttribute(`data-${dataTitle}`, dataValue);
    }
  }
}
