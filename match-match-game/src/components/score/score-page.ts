import { IUser } from '../../models/Interfaces';
import { BaseComponent } from '../base-component';
import { ScoreItem } from './score';
import { ScoreList } from './score-list';
import './score-page.scss';
import { storeName, baseName } from '../shared/constants';

export class ScorePage extends BaseComponent {
  private readonly title: BaseComponent;

  private readonly containerList: BaseComponent;

  constructor() {
    super('div', ['best-score']);
    this.title = new BaseComponent('h3');
    this.containerList = new BaseComponent('ul', ['best-score-list']);

    this.title.element.innerHTML = 'Best players';
    this.element.appendChild(this.title.element);

    this.element.appendChild(this.containerList.element);
  }

  // async fill() {
  //   this.clearList();
  //   const res = await fetch('./test-score.json');
  //   const data: ScoreModel[] = await res.json();
  //   data.forEach((info) => {
  //     this.containerList.element.appendChild(new ScoreItem(info).element);
  //   });
  // }

  getStoreInfo() {
    this.clearList();
    const openRequest = indexedDB.open(baseName, 1);

    openRequest.onerror = function () {
      console.error('Error', openRequest.error);
    };

    openRequest.onsuccess = () => {
      const db = openRequest.result;
      const transaction = db.transaction(storeName);

      const store = transaction.objectStore(storeName);

      const request = store.getAll();

      request.onsuccess = () => {
        request.result.sort((a: IUser, b: IUser) => b.score - a.score);
        request.result.forEach((info) => {
          this.containerList.element.appendChild(new ScoreItem(info).element);
        });
      };

      request.onerror = () => {
        console.log('Player adding error', request.error);
      };
    };
  }

  clearList() {
    this.containerList.element.innerHTML = '';
  }
}
