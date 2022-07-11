import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUser } from "../services/apiServices";
import { getUser } from "../services/urls";

const initialState = {
	combined: 0,
	roi: 0,
	commission: 0,
	main: 0,
	isLoading: false,
	isSuccess: false,
	message: "",
};

export const fetchInvestor = createAsyncThunk(
	getUser,
	async (email, thunkAPI) => {
		try {
			const token = thunkAPI.getState().userReducer.user.token;
			return await fetchUser(email, token);
		} catch (error) {
			const message = error.message;
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const investorSlice = createSlice({
	name: "investor",
	initialState,
	reducers: {
		resetInvestor: (state) => {
			state.isError = false;
			state.isLoading = false;
			state.isSuccess = false;
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchInvestor.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchInvestor.fulfilled, (state, action) => {
			state.roi = action.payload.data.roi;
			state.combined = action.payload.data.combined;
			state.commission = action.payload.data.commission;
			state.main = action.payload.data.main;
			state.isLoading = false;
			state.isSuccess = true;
		});
		builder.addCase(fetchInvestor.rejected, (state, action) => {
			console.table(action.payload);
			state.isError = true;
			state.isLoading = false;
			state.message = action.payload;
		});
	},
});

export const { resetInvestor } = investorSlice.actions;
export default investorSlice.reducer;
