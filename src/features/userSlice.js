import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "../services/apiServices";
import { registerUrl, loginUrl } from "../services/urls";

// check local storage for saved user
const user = JSON.parse(localStorage.getItem("bcn_user"));

export const register = createAsyncThunk(
	registerUrl,
	async (user, thunkAPI) => {
		try {
			const response = await registerUser(user);
			return response;
		} catch (error) {
			const message = error.response.data.message;
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const login = createAsyncThunk(loginUrl, async (user, thunkAPI) => {
	try {
		const response = await loginUser(user);
		if (response?.data) {
			localStorage.setItem("bcn_user", JSON.stringify(response.data));
		}
		return response.data;
	} catch (error) {
		const message = error.response.data.message;
		return thunkAPI.rejectWithValue(message);
	}
});

const initialState = {
	user: user ? user : null,
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: "",
	token: "",
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		reset: (state) => {
			state.isError = false;
			state.isLoading = false;
			state.isSuccess = false;
			state.message = "";
		},
		expiredToken: (state, action) => {
			state.token = '';
			state.message = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(register.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(register.fulfilled, (state, action) => {
			state.isLoading = false;
			state.user = action.payload;
			state.isSuccess = true;
		});
		builder.addCase(register.rejected, (state, action) => {
			state.isError = true;
			state.isLoading = false;
			state.message = action.payload;
			state.user = null;
		});
		builder.addCase(login.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(login.fulfilled, (state, action) => {
			state.isLoading = false;
			state.user = action.payload;
			state.isSuccess = true;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.isError = true;
			state.isLoading = false;
			state.message = action.payload;
			state.user = null;
		});
	},
});

export const { reset, expiredToken } = userSlice.actions;

export default userSlice.reducer;
