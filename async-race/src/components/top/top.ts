import { BaseComponent } from '../base-component';
import { List } from '../list/list';
import './top.scss';

export class Top extends List {
  constructor() {
    super();
    this.element.classList.add('top__list');
    this.init();
  }

  init(): void {
    const header = new BaseComponent('span', ['table__header']);
    header.element.innerHTML = `
      <p>Car</p>
      <p>Name</p>
      <p>Wins</p>
      <p>Best time</p>
    `;

    this.updateTitle();
    this.updatePage();
    this.render();

    this.element.appendChild(this.title.element);
    this.element.appendChild(this.page.element);
    this.element.appendChild(header.element);
    this.element.appendChild(this.list.element);
    this.element.appendChild(this.backPageBtn.element);
    this.element.appendChild(this.nextPageBtn.element);
  }
}
