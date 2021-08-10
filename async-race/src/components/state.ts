export interface IState {
  currentPage: string,
  isCarSelected: boolean,
  winnersPage: number,
  garagePage: number,
  winnerCount: number,
}

export const state: IState = {
  isCarSelected: false,
  currentPage: 'garage',
  winnersPage: 1,
  garagePage: 1,
  winnerCount: 1,
};
