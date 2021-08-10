import { configureStore } from "@reduxjs/toolkit";

import gameReducer from "../reducers/gameReducer";
import modalReducer from "../reducers/modalReducer";
import logger from "redux-logger";
import { LOCAL_ITEM } from "../../utils/constants";
import cardReducer from "../reducers/cardReducer";

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: { game: gameReducer, modal: modalReducer, cards: cardReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
