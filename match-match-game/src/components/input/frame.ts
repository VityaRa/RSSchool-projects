import { BaseComponent } from '../base-component';
import './frame.scss';

export class Frame extends BaseComponent {
  public isCorrect: boolean;

  public id: number;

  private label: BaseComponent;

  public text: string;

  private setting = 'text';

  constructor(hint: string, setting: string, id: number) {
    super('div', ['frame-field']);
    this.isCorrect = false;
    this.id = id;
    this.text = '';
    this.setting = setting;
    this.label = new BaseComponent('label', [
      'mdc-text-field',
      'mdc-text-field--filled',
    ]);
    this.label.element.innerHTML = `
    <span class="mdc-text-field__ripple"></span>
    <span class="mdc-floating-label" id="my-label-id">${hint}</span>
    <input class="mdc-text-field__input" type="${setting}"
    data-id="${this.id.toString()}" aria-labelledby="my-label-id">
    <span class="mdc-line-ripple"></span>
    `;

    this.element.appendChild(this.label.element);

    this.element.onkeyup = () => {
      this.addWrongStyles();
    };
  }

  checkText(text: string): void {
    this.text = text;
    if (this.setting === 'text') {
      const reg = new RegExp('^[0-9]*$', 'g');
      const matched = text.match(reg);
      if (matched) {
        this.isCorrect = (matched[0] !== text);
        if (!this.isCorrect) return;
      }
      if (this.checkSpecialSymbols(text)) {
        this.isCorrect = true;
      } else {
        this.isCorrect = false;
        return;
      }
    } else if (this.checkEmail(text)) {
        this.isCorrect = true;
      } else {
        this.isCorrect = false;
        return;
      }

    this.isCorrect = this.checkSymbolCount(text);
  }

  // eslint-disable-next-line class-methods-use-this
  checkSymbolCount(text: string): boolean {
    return text.length > 0 && text.length <= 30;
  }

  // eslint-disable-next-line class-methods-use-this
  checkSpecialSymbols(text: string): boolean {
    return !/[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g.test(text);
  }

  // eslint-disable-next-line class-methods-use-this
  checkEmail(text: string): boolean {
    return /.+@.+\..+/i.test(text);
  }

  addWrongStyles() {
    const text = (<HTMLInputElement>(
      document.querySelector(`[data-id="${this.id}"]`)
    ))?.value;
    this.text = text;
    this.checkText(this.text);
    if (!this.isCorrect) {
      this.label.element.classList.add('wrong-frame');
    } else {
      this.label.element.classList.remove('wrong-frame');
    }
  }
}
