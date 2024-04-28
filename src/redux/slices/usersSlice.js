import { createSlice } from "@reduxjs/toolkit";
import { usersData } from "../../data/usersData.js";

const initialState = {
  usersData: usersData,
};

const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    updateUsersData(state, action) {
      state.usersData = [...state.usersData, action.payload.data];
    },
    updateUsersContainer(state, action) {
      const { activeUserId, container } = action.payload.data;
      const updatedUsers = state.usersData.map((data) => {
        if (String(data.id) === String(activeUserId)) {
          data.container = container;
        }
        return data;
      });
      state.usersData = updatedUsers;
    },
  },
});

export const usersAction = usersSlice.actions;

export default usersSlice.reducer;
