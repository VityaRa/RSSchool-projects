import { IDataCardLess } from "./entities";

export interface IGameState {
  isPlayMode: boolean;
  isGameStarted: boolean;
  wordList: string[];
  currentWordIndex: number;
  scoreList: boolean[];
  errorCount?: number;
  clickResult: IDataCardLess[],
}

export interface IGameAction {
  words: string[];
  errorCount?: number;
}

export interface IModalState {
  isSmileModalActive: boolean;
  isFailureModalActive: boolean;
  isActiveSidebar: boolean;
}

export type IMainState = IGameState & IModalState
