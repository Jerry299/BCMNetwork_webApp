import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { withdrawUrl } from "../services/urls";
import { withdrawal } from "../services/apiServices";

const initialState = {
	amountToWithdraw: 0,
	recieveWallet: "",
	isLoading: false,
	isError: false,
	isSuccess: false,
	message: "",
};

export const makeWithdrawal = createAsyncThunk(
	withdrawUrl,
	async (data, thunkAPI) => {
		try {
			const token = thunkAPI.getState().userReducer.user.token;
			return await withdrawal(data, token);
		} catch (error) {
			const message = error.message;
			return thunkAPI.rejectWithValue(message);
		}
	}
);

const withdrawSlice = createSlice({
	name: "withdraw",
	initialState,
	reducers: {
		resetWithdrawForm: (state) => {
			state.amountToWithdraw = 0;
			state.recieveWallet = "";
		},
		setAmount: (state, action) => {
			state.amountToWithdraw = parseInt(action.payload);
		},
		setWallet: (state, action) => {
			state.recieveWallet = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(makeWithdrawal.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(makeWithdrawal.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.message = action.payload;
		});
		builder.addCase(makeWithdrawal.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.message = action.payload;
		});
	},
});

export const { resetWithdrawForm, setAmount, setWallet } =
	withdrawSlice.actions;

export default withdrawSlice.reducer;
