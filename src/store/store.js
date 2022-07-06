import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import investorSlice from "../features/investorSlice";
import depositSlice from "../features/depositSlice";

export const store = configureStore({
	reducer: {
		userReducer,
		investorSlice,
		depositSlice,
	},
});
