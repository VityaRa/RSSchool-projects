import { PageMaxCount } from '../../constants';
import { BaseComponent } from '../base-component';
import { Button } from '../button/button';
import { CarItem } from '../car-item/car-item';
import { Car, Winner } from '../models';
import { API } from '../requests-api/requests-api';
import { state } from '../state';
import { WinnerItem } from '../winner-item/winner-item';
import './list.scss';

export class List extends BaseComponent {
  protected title = new BaseComponent('h2', ['list__title']);

  protected page = new BaseComponent('p', ['list__page']);

  protected list = new BaseComponent('ul', ['list__inner']);

  protected listOfItems: CarItem[];

  protected backPageBtn = new Button(
    ['btn-pagination'],
    'prev',
    'pagination',
    'prev',
  );

  protected nextPageBtn = new Button(
    ['btn-pagination'],
    'next',
    'pagination',
    'next',
  );

  constructor() {
    super('div', ['list']);
    this.initPaginationBtns();
    this.listOfItems = [];
    [
      'Car_Removed',
      'Car_Created',
      'Car_Updated_Success',
      'Generate',
      'Change_Garage',
      'Change_Winner',
    ].forEach((event) => {
      document.addEventListener(event, () => {
        this.render();
      });
    });
  }

  initPaginationBtns(): void {
    this.backPageBtn.element.addEventListener('click', () => {
      this.backHandler();
    });

    this.nextPageBtn.element.addEventListener('click', () => {
      this.nextHandler();
    });

    document.addEventListener('Race_Start', () => {
      this.listOfItems.forEach((item) => {
        state.winnerCount = 0;
        item.runCar(item.id, true);
      });
    });

    document.addEventListener('Race_Reset', () => {
      this.listOfItems.forEach((item) => {
        (async () => {
          await item.stopCar(item.id);
          item.backCar();
        })();
      });
    });
  }

  backHandler = (): void => {
    if (state.currentPage === 'garage') {
      if (state.garagePage <= 1) {
        return;
      }
      state.garagePage--;
    } else {
      if (state.winnersPage <= 1) {
        return;
      }
      state.winnersPage--;
    }
    this.render();
  };

  nextHandler = async (): Promise<void> => {
    if (state.currentPage === 'garage') {
      const carsCount = await API.getCarsCount();
      if (carsCount) {
        const pageCount = Math.floor(+carsCount / PageMaxCount.cars);

        if (state.garagePage > pageCount) {
          return;
        }
        state.garagePage++;
      }
    } else {
      const winnersCount = await API.getWinnersCount();
      if (winnersCount) {
        const pageCount = Math.floor(+winnersCount / PageMaxCount.winners);
        if (state.winnersPage > pageCount) {
          return;
        }
        state.winnersPage++;
      }
    }
    this.render();
  };

  clearList(): void {
    this.list.element.innerHTML = '';
    this.listOfItems = [];
  }

  async updateTitle(): Promise<void> {
    if (state.currentPage === 'garage') {
      const count = await API.getCarsCount();
      this.title.element.innerHTML = `GARAGE (${count})`;
    } else {
      const count = await API.getWinnersCount();
      this.title.element.innerHTML = `WINNERS (${count})`;
    }
  }

  updatePage(): void {
    this.page.element.innerHTML = state.currentPage === 'garage'
      ? `Page #${state.garagePage}`
      : `Page #${state.winnersPage}`;
  }

  async fillList(): Promise<void> {
    this.clearList();
    if (state.currentPage === 'garage') {
      const cars: Car[] = await API.getCars(state.garagePage, 7);
      cars.forEach((car: Car) => {
        this.listOfItems.push(new CarItem(car));
      });
      this.listOfItems.forEach((carItem: CarItem) => {
        this.list.element.appendChild(carItem.element);
      });
    } else {
      const winners = await API.getWinners(state.winnersPage, 7);
      winners.forEach((winner: Winner) => {
        if (winner.id) {
          this.list.element.appendChild(new WinnerItem(winner).element);
        }
      });
    }
  }

  async render(): Promise<void> {
    this.updatePage();
    await this.updateTitle();
    await this.fillList();
  }
}
