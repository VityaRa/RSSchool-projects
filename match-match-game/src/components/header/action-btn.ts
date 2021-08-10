import { BaseComponent } from '../base-component';
import { RouteButton } from './route-btn';
import './header.scss';

type ActionState = 'Register User' | 'Start Game' | 'End Game';
interface IStage {
  isLogin: boolean;
  isGame: boolean;
}

export class ActionButton extends BaseComponent {
  public state: ActionState = 'Register User';

  constructor() {
    super('button');
    this.element.textContent = this.state;
  }

  makeAction(stage: IStage): void {
    if (!stage.isLogin) this.state = 'Register User';
    else if (!stage.isGame) this.state = 'Start Game';
    else this.state = 'End Game';

    this.element.textContent = this.state;
  }
}
