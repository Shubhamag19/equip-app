import { createSlice } from "@reduxjs/toolkit";
import { positionsData } from "../../data/positionsData.js";

const initialState = {
  records: positionsData,
};

const positionsSlice = createSlice({
  name: "positionsSlice",
  initialState,
  reducers: {
    updateRecords(state, action) {
      state.records = [...state.records, action.payload.data];
    },
  },
});

export const positionsAction = positionsSlice.actions;

export default positionsSlice.reducer;
