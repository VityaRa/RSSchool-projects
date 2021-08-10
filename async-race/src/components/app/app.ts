import { PageClass, Pages } from '../../types';
import { BaseComponent } from '../base-component';
import { Garage } from '../garage/garage';
import { Navigation } from '../nav/nav';
import { state } from '../state';
import { Top } from '../top/top';
import './app.scss';

export class App extends BaseComponent {
  private readonly activePageContainer: BaseComponent = new BaseComponent(
    'div',
    ['page-content'],
  );

  private readonly navigation: Navigation = new Navigation();

  private readonly garage: Garage = new Garage();

  private readonly top: Top = new Top();

  constructor() {
    super('main', ['app']);
    this.element.appendChild(this.navigation.element);
    this.element.appendChild(this.activePageContainer.element);
    this.initApp();
  }

  initApp(): void {
    this.render(state.currentPage);
  }

  render(page: Pages): void {
    state.currentPage = page;
    this.activePageContainer.element.lastChild?.remove();
    this.activePageContainer.element.appendChild(
      this.getPageFromString(state.currentPage).element,
    );
  }

  getPageFromString(page: Pages): PageClass {
    if (page === 'garage') return this.garage;
    return this.top;
  }
}
