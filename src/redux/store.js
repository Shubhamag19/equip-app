import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import positionsReducer from "./slices/positionsSlice";
import usersReducer from "./slices/usersSlice";
import loginReducer from "./slices/loginSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  positions: positionsReducer,
  users: usersReducer,
  login: loginReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
});

export let persistor = persistStore(store);
