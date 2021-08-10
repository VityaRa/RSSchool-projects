import { BaseComponent } from '../base-component';
import { Input } from '../input/input';
import './popup.scss';

export class Popup extends BaseComponent {
  public innerPopup: BaseComponent;

  private btnConfirm: BaseComponent = new BaseComponent('button');

  public inputFields: Input = new Input();

  constructor(title: string, fields?: Input) {
    super('div', ['popup-container']);
    this.innerPopup = new BaseComponent('div', ['popup-inner']);

    const titleElem = new BaseComponent('h3', ['popup-title']);
    titleElem.element.innerHTML = title;

    this.innerPopup.element.appendChild(titleElem.element);

    if (fields) {
      this.inputFields = fields;
      this.innerPopup.element.appendChild(fields.element);
      this.element.appendChild(this.innerPopup.element);
      this.btnConfirm = new BaseComponent('button', [
        'popup-btn',
        'popup-btn-confirm',
      ]);

      this.btnConfirm.element.innerHTML = 'Add user';
      this.btnConfirm.element.setAttribute('data-register', 'done');
      this.btnConfirm.element.setAttribute('disabled', 'disabled');
      const btnDisline = new BaseComponent('button', [
        'popup-btn',
        'popup-btn-disline',
      ]);
      btnDisline.element.innerHTML = 'cancel';

      const btnContainer = new BaseComponent('div', ['popup-btns']);
      btnContainer.element.appendChild(this.btnConfirm.element);
      btnContainer.element.appendChild(btnDisline.element);
      this.innerPopup.element.appendChild(btnContainer.element);

      btnDisline.element.onclick = () => {
        this.removeBase();
      };

      document.addEventListener('InputRight', () => {
        this.btnConfirm.element.removeAttribute('disabled');
      });

      document.addEventListener('InputWrong', () => {
        this.btnConfirm.element.setAttribute('disabled', 'true');
      });

      this.btnConfirm.element.onclick = () => {
        const name = this.inputFields.frames[0].text;
        const lastname = this.inputFields.frames[1].text;
        const email = this.inputFields.frames[2].text;

        const event = new CustomEvent('RegistrationDone', {
          bubbles: true,
          detail: {
            fullname: name + lastname,
            email,
          },
        });
        this.btnConfirm.element.dispatchEvent(event);
        this.removeBase();
      };
    } else {
      const btn = new BaseComponent('button', ['popup-btn-confirm']);
      btn.element.innerHTML = 'OK';
      btn.element.onclick = () => this.removeBase();
      this.innerPopup.element.appendChild(btn.element);
      this.element.appendChild(this.innerPopup.element);
    }
  }
}
