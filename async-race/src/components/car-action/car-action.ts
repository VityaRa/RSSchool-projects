import { BaseComponent } from '../base-component';
import { Button } from '../button/button';
import { Input } from '../input/input';
import { Car } from '../models';
import { API } from '../requests-api/requests-api';
import { state } from '../state';
import './car-action.scss';
import { throwEvent } from '../../utils/throwEventData';

const carActionAttribute = 'data-car__action';

export class CarAction extends BaseComponent {
  private textInput = new Input('text');

  private colorInput = new Input('color');

  private btnInput: Button;

  private currentId = -1;

  constructor(type: string) {
    super('div', [`car__action__${type}`, 'car__action']);

    this.btnInput = new Button(['btn-action'], type, 'car__action', type);

    this.initContainer();
  }

  initContainer(): void {
    this.element.appendChild(this.textInput.element);
    this.element.appendChild(this.colorInput.element);
    this.element.appendChild(this.btnInput.element);
    this.initBtnListeners();
  }

  clearInputs(): void {
    (<HTMLInputElement> this.textInput.element).value = '';
    (<HTMLInputElement> this.colorInput.element).value = '#ffffff';
  }

  toggleState(): void {
    if (!state.isCarSelected) {
      this.disableInputs();
      return;
    }
    this.enableInputs();
  }

  enableInputs(): void {
    [
      this.textInput.element,
      this.colorInput.element,
      this.btnInput.element,
    ].forEach((elem) => {
      elem.removeAttribute('disabled');
      elem.classList.remove('disabled__input');
    });
  }

  disableInputs(): void {
    [
      this.textInput.element,
      this.colorInput.element,
      this.btnInput.element,
    ].forEach((elem) => {
      elem.setAttribute('disabled', 'true');
      elem.classList.add('disabled__input');
    });
  }

  initBtnListeners(): void {
    this.btnInput.element.addEventListener('click', () => {
      if ((<HTMLInputElement> this.textInput.element).value.length === 0) {
        alert('Название должно содержать текст!');
        return;
      }
      const dataAttr = this.btnInput.element.getAttribute(carActionAttribute);
      const name = (<HTMLInputElement> this.textInput.element).value;
      const color = (<HTMLInputElement> this.colorInput.element).value;

      if (dataAttr === 'create') {
        this.onCreateHandler(name, color);
      } else {
        this.onUpdateHandler();
      }
    });
  }

  onCreateHandler = (name: string, color: string) => {
    API.createCar({ name, color })
      .catch((e) => alert('Ошибка создания!'))
      .then((res) => {
        alert(`Создана:${name}`);
        this.clearInputs();
        throwEvent('Car_Created');
      });
  };

  onUpdateHandler = () => {
    const newName = (<HTMLInputElement> this.textInput.element).value;
    const newColor = (<HTMLInputElement> this.colorInput.element).value;
    const newCar = { name: newName, color: newColor };

    API.updateCar(this.currentId, newCar)
      .catch((e) => console.log(e))
      .then((e) => {
        alert('Успешно обновлено!');
        state.isCarSelected = false;
        this.clearInputs();
        this.toggleState();
        this.currentId = -1;
        throwEvent('Car_Updated_Success');
      });
  };

  fillWithData(data: Car) {
    (<HTMLInputElement> this.textInput.element).value = data.name;
    (<HTMLInputElement> this.colorInput.element).value = data.color;
    if (data.id) this.currentId = data.id;
  }
}
