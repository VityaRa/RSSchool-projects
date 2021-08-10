export interface IState {
  currentPath: string;
  stage: {
    isLogin: boolean;
    isGame: boolean;
  };
  gameSettings: {
    cardsCount: string;
    category: string;
  };
}

export interface IGame {
  cardsCount: string;
  category: string;
}

export interface IUser {
  fullname: string;
  email: string;
  score: number;
}
