import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { testApi } from "../Links";

export const getTests = createAsyncThunk("tests/get", () => {
	return axios
		.get(testApi)
		.then((response) => {
			if (response.status === 200) {
				return response.data;
			}
		})
		.catch((error) => {
			throw new Error(error.response.data.message || "An error occurred");
		});
});

export const getTest = createAsyncThunk("test/get", (id) => {
	return axios
		.get(`${testApi}${id}/`)
		.then((response) => {
			if (response.status === 200) {
				return {
					testID: id,
					test: response.data,
				};
			}
		})
		.catch((error) => {
			throw new Error(error.response.data.message || "An error occurred");
		});
});

export const createTest = createAsyncThunk("test/add", (testData) => {
	return axios
		.post(testApi, testData)
		.then((response) => {
			if (response.status === 200) {
				return response.data;
			} else {
				throw new Error("Invalid testname or password");
			}
		})
		.catch((error) => {
			throw new Error(error.response.data.message || "An error occurred");
		});
});

const testSlice = createSlice({
	name: "test",
	initialState: {
		loading: false,
		testsList: null,
		selectedID: null,
		selectedTest: null,
		error: "",
	},
	reducers: {
		setTestID: (state, action) => {
			state.selectedID = action.payload["testID"];
			state.selectedTest = action.payload["test"];
		},
		resetTest: (state) => {
			state.selectedID = null;
			state.selectedTest = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getTest.pending, (state) => {
				state.loading = true;
			})
			.addCase(getTest.fulfilled, (state, action) => {
				state.loading = false;
				state.selectedID = action.payload["testID"];
				state.selectedTest = action.payload["test"];
				state.error = "";
			})
			.addCase(getTest.rejected, (state, action) => {
				state.loading = false;
				state.selectedID = [];
				state.selectedTest = null;
				state.error = action.error.message;
			})
			.addCase(getTests.pending, (state) => {
				state.loading = true;
			})
			.addCase(getTests.fulfilled, (state, action) => {
				state.loading = false;
				state.testsList = action.payload;
				state.error = "";
			})
			.addCase(getTests.rejected, (state, action) => {
				state.loading = false;
				state.testsList = [];
				state.error = action.error.message;
			})
			.addCase(createTest.pending, (state) => {
				state.loading = true;
			})
			.addCase(createTest.fulfilled, (state, action) => {
				state.loading = false;
				state.testsList = [];
				state.selectedID = [];
				state.error = "";
			})
			.addCase(createTest.rejected, (state, action) => {
				state.loading = false;
				state.testsList = [];
				state.selectedID = [];
				state.error = action.error.message;
			});
	},
});

export default testSlice.reducer;
export const { setTestID, resetTest } = testSlice.actions;
