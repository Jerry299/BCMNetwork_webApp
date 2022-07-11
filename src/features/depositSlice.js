import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { depositUrl } from "../services/urls";
import { deposit } from "../services/apiServices";

const initialState = {
	amountToDeposit: 0,
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: "",
};
export const makeDeposit = createAsyncThunk(
	depositUrl,
	async (data, thunkAPI) => {
		try {
			const token = thunkAPI.getState().userReducer.user.token;
			return await deposit(data, token);
		} catch (error) {
			const message = error.message;
			return thunkAPI.rejectWithValue(message);
		}
	}
);

const depositSlice = createSlice({
	name: "depositSlice",
	initialState,
	reducers: {
		resetDeposit: (state) => {
			state.isError = false;
			state.isLoading = false;
			state.isSuccess = false;
			state.amountToDeposit = 0;
			state.message = "";
		},
		setDeposit: (state, action) => {
			state.amountToDeposit = parseInt(action.payload);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(makeDeposit.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(makeDeposit.fulfilled, (state, action) => {
			state.isLoading = false;
			state.message = action.payload;
			state.isSuccess = true;
		});
		builder.addCase(makeDeposit.rejected, (state, action) => {
			state.isLoading = false;
			state.message = action.payload;
			state.isError = true;
		});
	},
});

export const { resetDeposit, setDeposit } = depositSlice.actions;
export default depositSlice.reducer;
