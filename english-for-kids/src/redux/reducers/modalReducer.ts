import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IModalState } from "../../types/redux-types";

const initialState: IModalState = {
  isSmileModalActive: false,
  isFailureModalActive: false,
  isActiveSidebar: false,
};

export const counterSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModalSmile: (state) => {
      state.isSmileModalActive = !state.isSmileModalActive;
    },
    toggleModalFailure: (state) => {
      state.isFailureModalActive = !state.isFailureModalActive;
    },
    toggleSidebar: (state) => {
      state.isActiveSidebar = !state.isActiveSidebar;
    },
  },
});

export const { toggleModalSmile, toggleModalFailure, toggleSidebar } =
  counterSlice.actions;

export default counterSlice.reducer;
