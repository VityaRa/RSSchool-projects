import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import { CardsField } from '../cards-field/cards-field';
import { delay } from '../shared/delay';
import { Timer } from '../timer/timer';
import { SHOW_TIME, FLIP_DELAY } from '../shared/constants';
import { Popup } from '../popup/popup';

type ImageURL = string;

export class Game extends BaseComponent {
  private readonly cardsField = new CardsField();

  private activeCard?: Card;

  private timer: Timer;

  private isAnimation = false;

  private counter = 4;

  private wrongComp = 0;

  private rightComp = 0;

  public score = 0;

  constructor() {
    super('div', ['game-content']);
    this.cardsField = new CardsField();
    this.timer = new Timer();

    this.element.appendChild(this.timer.element);
    this.element.appendChild(this.cardsField.element);
  }

  // eslint-disable-next-line class-methods-use-this
  getSize(cardCount: number): string {
    if (cardCount === 8) return 'card-size-4';
    return 'card-size-6';
  }

  startGame(images: ImageURL[], cardCount: number): void {
    this.score = 0;
    this.counter = cardCount * 2;
    setTimeout(() => {
      this.timer.start();
    }, SHOW_TIME * 1000);

    this.cardsField.clear();
    const cards = images
      .concat(images)
      .map((url) => new Card(url, this.getSize(cardCount)))
      .sort(() => Math.random() - 0.5);

    cards.forEach((card) => card.element.addEventListener('click', () => this.cardHandler(card)));

    this.cardsField.addCards(cards);
  }

  private async cardHandler(card: Card) {
    if (this.isAnimation) return;
    if (!card.isFlipped) return;
    this.isAnimation = true;
    await card.flipToFront();
    await delay(FLIP_DELAY);

    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }

    if (this.activeCard.image !== card.image) {
      this.wrongComp++;
      this.activeCard.addColorBlock(false);
      card.addColorBlock(false);
      await delay(FLIP_DELAY * 1000);
      card.removeColorBlock();
      this.activeCard.removeColorBlock();
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
    } else {
      this.activeCard.addColorBlock(true);
      card.addColorBlock(true);

      this.rightComp++;
      this.counter -= 2;
      if (!this.counter) {
        this.finishGame();
      }
    }
    this.activeCard = undefined;
    this.isAnimation = false;
  }

  finishGame() {
    const popup = new Popup('Congratz');

    this.element.parentElement?.parentElement?.parentElement?.appendChild(popup.element);

    this.score = (this.rightComp - this.wrongComp) * 100 - this.timer.time * 10;

    this.score = this.score >= 0 ? this.score : 0;
    this.clearVars();

    const event = new Event('GameFinished', { bubbles: true });
    popup.element.dispatchEvent(event);
  }

  clearVars() {
    this.rightComp = 0;
    this.wrongComp = 0;
    this.timer.time = 0;
  }
}
