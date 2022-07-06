import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import investorSlice from "../features/investorSlice";
import depositSlice from "../features/depositSlice";
import withdrawSlice from "../features/withdrawSlice";

export const store = configureStore({
	reducer: {
		userReducer,
		investorSlice,
		depositSlice,
		withdrawSlice,
	},
});
