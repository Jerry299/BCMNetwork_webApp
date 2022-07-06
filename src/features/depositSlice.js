import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { depositUrl, uploadProofUrl } from "../services/urls";
import { deposit, uploadDepositProof } from "../services/apiServices";

const initialState = {
	amountToDeposit: 0,
	imageProof: undefined,
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

export const postProof = createAsyncThunk(
	uploadProofUrl,
	async (formData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().userReducer.user.token;
			return await uploadDepositProof(formData, token);
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
		},
		resetImage: (state) => {
			state.isError = false;
			state.isLoading = false;
			state.isSuccess = false;
			state.imageProof = null;
		},
		setImage: (state, action) => {
			state.imageProof = action.payload;
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
		});
		builder.addCase(makeDeposit.rejected, (state, action) => {
			state.isLoading = false;
			state.message = action.payload;
		});
		builder.addCase(postProof.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(postProof.fulfilled, (state, action) => {
			state.isLoading = false;
			state.message = action.payload;
		});
		builder.addCase(postProof.rejected, (state, action) => {
			state.isLoading = false;
			state.message = action.payload;
		});
	},
});

export const { resetDeposit, resetImage, setImage, setDeposit } =
	depositSlice.actions;
export default depositSlice.reducer;
