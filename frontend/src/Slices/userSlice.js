import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loginApi } from "../Links";

export const login = createAsyncThunk("user/login", (userData) => {
	return axios
		.post(loginApi, userData)
		.then((response) => {
			if (response.status === 200) {
				localStorage.setItem("user", JSON.stringify(response.data));
				return response.data;
			} else {
				throw new Error("Invalid username or password");
			}
		})
		.catch((error) => {
			throw new Error(error.response.data.message || "An error occurred");
		});
});

const userSlice = createSlice({
	name: "user",
	initialState: {
		loading: false,
		user: null,
		error: "",
	},
	reducers: {
		setUser: (state, action) => void (state.user = action.payload),
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.loading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
				state.error = "";
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false;
				state.user = [];
				state.error = action.error.message;
			});
	},
});

export default userSlice.reducer;
export const { setUser } = userSlice.actions;
