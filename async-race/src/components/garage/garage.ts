import { BaseComponent } from '../base-component';
import { CarAction } from '../car-action/car-action';
import { CarList } from '../car-list/car-list';
import { RaceAction } from '../race-action/race-action';

export class Garage extends BaseComponent {
  private readonly carActionCreate: CarAction = new CarAction('create');

  private readonly carActionUpdate: CarAction = new CarAction('update');

  private readonly raceAction: RaceAction = new RaceAction();

  private readonly carList: CarList = new CarList();

  constructor() {
    super('div', ['garage-content']);
    this.initGarage();
  }

  initGarage() {
    this.element.appendChild(this.carActionCreate.element);
    this.element.appendChild(this.carActionUpdate.element);
    this.carActionUpdate.disableInputs();
    this.element.appendChild(this.raceAction.element);
    this.element.appendChild(this.carList.element);

    this.initListeners();
  }

  initListeners() {
    document.addEventListener('Update_Car', ((e: CustomEvent) => {
      this.carActionUpdate.toggleState();
      const { data } = e.detail.data;
      this.carActionUpdate.fillWithData(data);
    }) as EventListener);
  }
}
