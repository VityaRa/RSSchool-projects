import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDataCard } from "../../types/entities";
import { LOCAL_ITEM } from "../../utils/constants";
import { cards } from "../../utils/data";

//get state
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(LOCAL_ITEM);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const initialState: IDataCard[] = loadState() || [...cards.flat()];

export const counterSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    hydrate: (state, action) => {
      return action.payload;
    },
    addRightStatistics: (state, action: PayloadAction<number>) => {
      state[action.payload].correct++;
    },
    addWrongStatistics: (state, action: PayloadAction<number>) => {
      state[action.payload].wrong++;
    },
    refreshStatistics: (state) => {
      state.forEach((card) => {
        card.wrong = 0;
        card.correct = 0;
      });
    },
    sortTable: (state) => {
      state.sort((a, b) => {
        if (a.correct > b.correct) {
          return -1;
        }
        if (a.correct < b.correct) {
          return 1;
        }
        return 0;
      });
    },
  },
});

export const {
  hydrate,
  addWrongStatistics,
  addRightStatistics,
  refreshStatistics,
  sortTable
} = counterSlice.actions;

export default counterSlice.reducer;
