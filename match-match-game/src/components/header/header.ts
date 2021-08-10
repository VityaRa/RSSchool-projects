import { BaseComponent } from '../base-component';
import { ActionButton } from './action-btn';
import { ButtonList } from './button-list';
import { Logo } from './logo';
import './header.scss';

export class Header extends BaseComponent {
  private readonly logo: Logo;

  private readonly buttonListContainer: BaseComponent;

  public readonly actionBtnContainer: BaseComponent;

  public readonly actionBtn: ActionButton = new ActionButton();

  constructor() {
    super('header', ['header']);
    this.logo = new Logo();

    this.actionBtnContainer = new BaseComponent('div', ['register-btn']);
    this.actionBtnContainer.element.appendChild(this.actionBtn.element);
    this.buttonListContainer = new BaseComponent('div', ['buttons-list']);
    this.buttonListContainer.element.appendChild(new ButtonList().element);
    this.element.appendChild(this.logo.element);
    this.element.appendChild(this.buttonListContainer.element);
    this.element.appendChild(this.actionBtnContainer.element);
  }
}
