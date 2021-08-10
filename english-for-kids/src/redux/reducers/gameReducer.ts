import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDataCardLess } from "../../types/entities";
import { IGameState } from "../../types/redux-types";


const initialState: IGameState = {
  isPlayMode: false,
  isGameStarted: false,
  wordList: [],
  currentWordIndex: -1,
  scoreList: [],
  errorCount: undefined,
  clickResult: [],
};


export const counterSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    togglePlayMode: (state) => {
      state.isPlayMode = !state.isPlayMode;
    },
    toggleGame: (state) => {
      state.isGameStarted = !state.isGameStarted;
    },
    randomizeList: (state, action: PayloadAction<string[]>) => {
      state.currentWordIndex = 0;
      state.wordList = action.payload;
    },
    addRightAnswer: (state) => {
      state.currentWordIndex = ++state.currentWordIndex;
      state.scoreList = [...state.scoreList, true];
    },
    addWrongAnswer: (state) => {
      state.scoreList = [...state.scoreList, false];
    },
    refreshScore: (state) => {
      state.scoreList = [];
    },
    setErrors: (state, action: PayloadAction<number>) => {
      state.errorCount = action.payload
    },
  },
});

export const {
  togglePlayMode,
  toggleGame,
  randomizeList,
  addRightAnswer,
  addWrongAnswer,
  refreshScore,
  setErrors,
} = counterSlice.actions;

export default counterSlice.reducer;
