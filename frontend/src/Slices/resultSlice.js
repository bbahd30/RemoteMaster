import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { resultApi } from "../Links";

export const getResult = createAsyncThunk("result/get", (id) => {
	return axios
		.get(`${resultApi}${id}/`)
		.then((response) => {
			if (response.status === 200) {
				return {
					resultID: id,
					result: response.data,
				};
			}
		})
		.catch((error) => {
			throw new Error(error.response.data.message || "An error occurred");
		});
});

const resultSlice = createSlice({
	name: "result",
	initialState: {
		loading: false,
		paramResults: null,
		resultID: null,
		error: "",
	},
	reducers: {
		setResultID: (state, action) => {
			state.selectedID = action.payload["resultID"];
		},
		setParamResults: (state, action) => {
			state.selectedResult =
				action.payload["result"]["parameter_results"];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getResult.pending, (state) => {
				state.loading = true;
			})
			.addCase(getResult.fulfilled, (state, action) => {
				state.loading = false;
				state.selectedID = action.payload["resultID"];
				state.selectedResult = action.payload["result"];
				state.error = "";
			})
			.addCase(getResult.rejected, (state, action) => {
				state.loading = false;
				state.selectedID = [];
				state.selectedResult = null;
				state.error = action.error.message;
			});
	},
});

export default resultSlice.reducer;
export const { setResultID } = resultSlice.actions;
