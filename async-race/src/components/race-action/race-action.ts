import { generateCar } from '../../utils/generateCar';
import { throwEvent } from '../../utils/throwEventData';
import { BaseComponent } from '../base-component';
import { Button } from '../button/button';
import { API } from '../requests-api/requests-api';
import './race-action.scss';

export class RaceAction extends BaseComponent {
  constructor() {
    super('div', ['race__action']);
    this.element.appendChild(
      new Button(['btn-action'], 'race', 'race__action', 'race').element,
    );
    this.element.appendChild(
      new Button(['btn-action'], 'reset', 'race__action', 'reset').element,
    );
    this.element.appendChild(
      new Button(['btn'], 'generate cars', 'race__action', 'generate').element,
    );

    this.initListeners();
  }

  initListeners(): void {
    this.element.addEventListener('click', (e) => {
      const actionType = (<HTMLElement>e.target).getAttribute(
        'data-race__action',
      );
      if (actionType === 'generate') {
        (async () => {
          for (let i = 0; i < 100; i++) API.createCar(generateCar());
          throwEvent('Generate');
        })();
      } else if (actionType === 'race') {
        throwEvent('Race_Start');
      } else if (actionType === 'reset') {
        throwEvent('Race_Reset');
      }
    });
  }
}
