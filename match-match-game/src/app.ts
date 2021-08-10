import { AboutPage } from './components/about/about';
import { Game } from './components/game/game';
import { Header } from './components/header/header';
import { Content } from './components/content/content';
import { ImageCategory } from './models/image-category';
import { ScorePage } from './components/score/score-page';
import { SettingsPage } from './components/setting/setting';
import { Popup } from './components/popup/popup';
import { Input } from './components/input/input';
import { IState, IGame, IUser } from './models/Interfaces';
import { storeName, baseName } from './components/shared/constants';

let db: IDBDatabase;

const activeRouteBtnClass = 'active-btn';

const playersList = [
  {
    fullname: 'Nicci Troiani',
    email: 'nicci@gmail.com',
    score: 456,
  },
  {
    fullname: 'George Fields',
    email: 'jack@gmail.com',
    score: 358,
  },
  {
    fullname: 'Jones Dermot',
    email: 'dermot@gamil.com',
    score: 211,
  },
  {
    fullname: 'Jane Doe',
    email: 'jane.doe@gmail.com',
    score: 169,
  },
  {
    fullname: 'Zachary Gonzalez',
    email: 'zacharygon@gmail.com',
    score: 586,
  },
  {
    fullname: 'Steve May',
    email: 'stevmay@gmail.com',
    score: 124,
  },
  {
    fullname: 'Elizabeth Smith',
    email: 'elizsmith@gamil.com',
    score: 241,
  },
  {
    fullname: 'Doris Farmer',
    email: 'dorfarm@gmail.com',
    score: 192,
  },
  {
    fullname: 'Helen Craig',
    email: 'helenCraig@gmail.com',
    score: 295,
  },
  {
    fullname: 'Ruth Butler',
    email: 'ruthbutler@gmail.com',
    score: 132,
  },
];

export class App {
  public appState: IState = {
    currentPath: 'about',
    stage: {
      isLogin: false,
      isGame: false,
    },
    gameSettings: {
      cardsCount: '4',
      category: 'animal',
    },
  };

  private user: IUser = {
    fullname: '',
    email: '',
    score: 0,
  };

  private readonly header: Header;

  private readonly pageContent: Content;

  private readonly pageAbout: AboutPage;

  private readonly pageScore: ScorePage;

  private readonly pageSettings: SettingsPage;

  private pageGame: Game;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header();
    this.pageContent = new Content();
    this.pageAbout = new AboutPage();
    this.pageScore = new ScorePage();
    this.pageSettings = new SettingsPage();
    this.pageGame = new Game();

    this.initApp();
  }

  initApp(): void {
    this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(this.pageContent.element);

    this.render(this.appState.currentPath);
    this.addRouteListeners();
    this.highlightActiveRoute();
    this.getSettingsFromSelect();
    this.addWindowListener();
    this.addActionHandler();
    this.openDB();

    document.addEventListener('GameFinished', () => {
      this.appState.currentPath = 'best';
      this.appState.stage.isGame = false;
      this.header.actionBtn.makeAction(this.appState.stage);
      this.addPlayer();
      this.render(this.appState.currentPath);
      this.highlightActiveRoute();
    });

    document.addEventListener('RegistrationDone', ((e: CustomEvent) => {
      this.fillUserData(e.detail);
      alert('Success!');
    }) as EventListener);
  }

  // eslint-disable-next-line class-methods-use-this
  openDB(): void {
    const openRequest = indexedDB.open(baseName, 1);

    openRequest.onupgradeneeded = () => {
      db = openRequest.result;

      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'fullname' });
      }
    };

    openRequest.onsuccess = () => {
      db = openRequest.result;
      const transaction = db.transaction(storeName, 'readwrite');

      const players = transaction.objectStore(storeName);

      playersList.forEach((player) => {
        const request = players.add(player);
      });
    };
  }

  addPlayer(): void {
    const transaction = db.transaction(storeName, 'readwrite');

    const players = transaction.objectStore(storeName);

    const player = this.getUserData();

    const request = players.add(player);

    request.onsuccess = function () {
      console.log('Книга добавлена в хранилище', request.result);
    };

    request.onerror = function () {
      console.log('Ошибка', request.error);
    };
  }

  // getPlayers() {
  //   let transaction = db.transaction(storeName);

  //   let players = transaction.objectStore(storeName);

  //   let request = players.getAll()

  //   request.onsuccess = function() { // (4)
  //     console.log("Игроки:", request.result);
  //   };

  //   request.onerror = function() {
  //     console.log("Ошибка", request.error);
  //   };
  // }

  fillUserData(user: IUser) {
    this.user.fullname = user.fullname;
    this.user.email = user.email;
  }

  getUserData(): IUser {
    const { fullname } = this.user;
    const { email } = this.user;
    const { score } = this.pageGame;
    return { fullname, email, score };
  }

  getSettingsFromSelect() {
    this.appState.gameSettings.cardsCount = this.pageSettings.settings[1].currentSetting;
    this.appState.gameSettings.category = this.pageSettings.settings[0].currentSetting;
  }

  addWindowListener() {
    window.addEventListener('change', (e) => {
      this.getSettingsFromSelect();
    });

    window.addEventListener('click', (e) => {
      const elem = <HTMLElement>e.target;
      if (elem.getAttribute('data-register') === 'done') {
        this.appState.stage.isLogin = true;

        this.header.actionBtnContainer.element.children[0].innerHTML = 'Start Game';
      }
    });
  }

  addRouteListeners() {
    const btns = document.querySelectorAll('.buttons-list li');

    btns.forEach((btn) => btn.addEventListener('click', () => {
      if (this.appState.stage.isGame) {
        alert('End the game!');
      } else {
        if (!btn.classList.contains(activeRouteBtnClass)) {
          this.removePrevHighlighted();
          btn.classList.add(activeRouteBtnClass);
        }
        let value = btn.getAttribute('data-ref');
        if (!value) value = '';

        if (this.appState.currentPath !== value) this.render(value);
      }
    }));
  }

  highlightActiveRoute() {
    document
      .querySelector(`[data-ref=${this.appState.currentPath}]`)
      ?.classList.add(activeRouteBtnClass);
  }

  // eslint-disable-next-line class-methods-use-this
  getCategory(category: string): number {
    if (category === 'animals') return 0;
    return 1;
  }

  // eslint-disable-next-line class-methods-use-this
  getCountNumber(stringCount: string): number {
    switch (stringCount) {
      case '4x4':
        return 4;
      case '6x6':
        return 6;
      case '8x8':
        return 8;
      default:
        return 0;
    }
  }

  async start(settings: IGame): Promise<void> {
    const res = await fetch('./images.json');
    const data: ImageCategory[] = await res.json();

    const categories = data[this.getCategory(settings.category)];
    const cardCount = this.getCountNumber(settings.cardsCount) ** 2 / 2;

    const images: string[] = [];

    categories.images
      .filter((elem, index) => index < cardCount)
      .forEach((name, index) => {
        if (index === cardCount) return;
        images.push(`${categories.category}/${name}`);
      });

    this.pageGame.startGame(images, cardCount);
  }

  // eslint-disable-next-line class-methods-use-this
  removePrevHighlighted(): void {
    document
      .querySelectorAll('.active-btn')
      .forEach((btn) => btn.classList.remove(activeRouteBtnClass));
  }

  render(path: string): void {
    const nodeToDelete = this.pageContent.contentField.element.lastChild;
    if (nodeToDelete) {
      this.pageContent.contentField.element.removeChild(nodeToDelete);
    }
    this.changeBackForSettingsPage(path === 'settings');
    this.pageContent.contentField.element.appendChild(
      this.getPage(path)?.element,
    );
    this.appState.currentPath = path;
  }

  // eslint-disable-next-line class-methods-use-this
  changeBackForSettingsPage(isSettings: boolean): void {
    if (isSettings) document.querySelector('.inner')?.classList.add('remove-back');
    else document.querySelector('.inner')?.classList.remove('remove-back');
  }

  getPage(path: string): AboutPage | ScorePage | SettingsPage | Game {
    if (path === 'about') return this.pageAbout;
    if (path === 'best') {
      this.pageScore.getStoreInfo();
      return this.pageScore;
    }
    if (path === 'game') return this.pageGame;
    return this.pageSettings;
  }

  addActionHandler() {
    document
      .querySelector('.register-btn button')
      ?.addEventListener('click', () => {
        this.actionButtonEvent();
      });
  }

  actionButtonEvent() {
    if (this.appState.stage.isLogin) this.removePrevHighlighted();
    if (!this.appState.stage.isLogin) {
      const pop = new Popup('Register', new Input());
      this.rootElement.appendChild(pop.element);
    } else if (!this.appState.stage.isGame) {
      this.pageGame = new Game();
      this.start(this.appState.gameSettings);
      this.render('game');
      this.appState.stage.isGame = true;
      this.header.actionBtn.makeAction(this.appState.stage);
    } else {
      const result = window.confirm('Are u sure?');
      if (result) {
        this.appState.currentPath = 'best';
        this.appState.stage.isGame = false;
        this.header.actionBtn.makeAction(this.appState.stage);
        this.render(this.appState.currentPath);
        this.highlightActiveRoute();
      }
    }
  }
}
