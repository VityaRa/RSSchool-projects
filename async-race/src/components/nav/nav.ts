import { throwEvent } from '../../utils/throwEventData';
import { BaseComponent } from '../base-component';
import { Button } from '../button/button';
import { state } from '../state';
import './nav.scss';

export class Navigation extends BaseComponent {
  constructor() {
    super('nav');
    const btnGarage = new Button(
      ['btn-action'],
      'to garage',
      'route',
      'garage',
    );
    const btnWinners = new Button(
      ['btn-action'],
      'to winners',
      'route',
      'winners',
    );

    this.element.appendChild(btnGarage.element);
    this.element.appendChild(btnWinners.element);

    btnGarage.element.addEventListener('click', () => {
      if (state.currentPage !== 'garage') {
        state.currentPage = 'garage';
        throwEvent('Change_Garage');
      }
    });

    btnWinners.element.addEventListener('click', () => {
      if (state.currentPage !== 'winner') {
        state.currentPage = 'winner';
        throwEvent('Change_Winner');
      }
    });
  }
}
