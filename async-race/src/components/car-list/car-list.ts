import { List } from '../list/list';

export class CarList extends List {
  constructor() {
    super();

    this.render();
    this.init();
  }

  init(): void {
    this.element.appendChild(this.title.element);
    this.element.appendChild(this.page.element);
    this.element.appendChild(this.list.element);
    this.element.appendChild(this.backPageBtn.element);
    this.element.appendChild(this.nextPageBtn.element);
  }
}
