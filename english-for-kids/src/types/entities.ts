export interface IRef {
  title: string;
  endpoint: string;
  imageSrc?: string;
}

export interface ICard {
  word: string;
  translation: string;
  image: string;
  audioSrc: string;
  category?: string;
}

export interface ICardStatistic {
  correct: number;
  wrong: number;
}

export type IDataCard = ICard & ICardStatistic;

export interface IDataCardLess {
  word: string;
  correct: number;
  wrong: number;
}