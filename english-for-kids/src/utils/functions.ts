import { useDispatch } from "react-redux";
import { randomizeList } from "../redux/reducers/gameReducer";
import { IRef, ICard } from "../types/entities";
import { LOCAL_ITEM } from "./constants";
import { cards, refs } from "./data";

export const getMainPageData = (): IRef[] => {
  return refs.slice(1, refs.length - 1)
};

export const getCurrentCardList = (page: number): ICard[] => {
  return cards[page];
};

export const playSound = (url: string): void => {
  const path = `${process.env.PUBLIC_URL}/${url}`;
  const audio = new Audio(path);
  audio.play();
};

export const getRandomURL = (cards: ICard[]): string[] => {
  return shuffleArray(cards.map((card) => card.audioSrc));
};

export const shuffleArray = (array: string[]) => {
  let currentIndex = array.length,
    randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export const delay = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export const getPercentage = (correct: number, total: number): number => {
  if (total === 0) return 0
  return Math.floor(correct / total * 100)
}

export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(LOCAL_ITEM, serializedState);
  } catch {}
};
