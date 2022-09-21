import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import investorSlice from "../features/investorSlice";
import depositSlice from "../features/depositSlice";
import withdrawSlice from "../features/withdrawSlice";
// import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistConfig = {
	key: "root",
	storage,
};
const persistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
	reducer: {
		userReducer: persistedReducer,
		investorSlice,
		depositSlice,
		withdrawSlice,
	},
	devTools: process.env.NODE_ENV !== "production",
});
