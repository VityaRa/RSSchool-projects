import { BaseComponent } from '../base-component';
import { IUser } from '../../models/Interfaces';

export class ScoreItem extends BaseComponent {
  constructor(info: IUser) {
    super('li');

    this.element.innerHTML = `
    <div class="best-score-item">
      <div class="info">
        <div class="image">

        </div>
        <div class="description">
          <p class="name">${info.fullname}</p>
          <p class="email">${info.email}</p>
        </div>
      </div>
      <div class="score">
        <span>Score: <span class="points">${info.score}</span></span>
      </div>
    </div>
    <hr class="line">`;
  }
}
