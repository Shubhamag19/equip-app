import { createSlice } from "@reduxjs/toolkit";
// import { positionsData } from "../../data/positionsData.js";

const initialState = {
  userType: "",
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    updateUserType(state, action) {
      state.userType = action.payload.data;
    },
  },
});

export const loginAction = loginSlice.actions;

export default loginSlice.reducer;
