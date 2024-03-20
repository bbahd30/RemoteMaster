import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { parameterApi, paramDetailApi, paramValueApi } from "../Links";

export const getParameters = createAsyncThunk("parameters/get", () => {
	return axios
		.get(parameterApi)
		.then((response) => {
			if (response.status === 200) {
				return response.data;
			}
		})
		.catch((error) => {
			throw new Error(error.response.data.message || "An error occurred");
		});
});

export const getParameter = createAsyncThunk("parameter/get", (id) => {
	return axios
		.get(`${parameterApi}${id}/`)
		.then((response) => {
			if (response.status === 200) {
				return response.data;
			}
		})
		.catch((error) => {
			throw new Error(error.response.data.message || "An error occurred");
		});
});

export const createBound = createAsyncThunk(
	"paramDetail/createBound",
	(data) => {
		return axios
			.post(paramDetailApi, data)
			.then((response) => {
				if (response.status === 200) {
					return response.data;
				}
			})
			.catch((error) => {
				throw new Error(
					error.response.data.message || "An error occurred"
				);
			});
	}
);

export const addTestValue = createAsyncThunk(
	"paramDetail/addTestValue",
	(data) => {
		return axios
			.post(paramValueApi, data)
			.then((response) => {
				if (response.status === 200) {
					return response.data;
				}
			})
			.catch((error) => {
				throw new Error(
					error.response.data.message || "An error occurred"
				);
			});
	}
);

export const getBounds = createAsyncThunk("paramDetail/get", (paramDetail) => {
	const paramID = paramDetail["id"];
	const testID = paramDetail["testID"];

	return axios
		.get(`${paramDetailApi}${paramID}/${testID}`)
		.then((response) => {
			if (response.status === 200) {
				let res = {
					paramID: paramID,
					data: response.data,
				};
				return res;
			}
		})
		.catch((error) => {
			throw new Error(error.response.data.message || "An error occurred");
		});
});

export const getValue = createAsyncThunk(
	"paramDetail/getValue",
	(paramDetail) => {
		const paramID = paramDetail["id"];
		const bookingID = paramDetail["bookingID"];

		return axios
			.get(`${paramValueApi}${paramID}/${bookingID}`)
			.then((response) => {
				if (response.status === 200) {
					let res = {
						paramID: paramID,
						data: {
							value: response.data,
						},
					};
					return res;
				}
			})
			.catch((error) => {
				throw new Error(
					error.response.data.message || "An error occurred"
				);
			});
	}
);

export const getStatusData = createAsyncThunk(
	"paramDetail/getStatusData",
	(data) => {
		return axios
			.post(`${paramDetailApi}status`, data)
			.then((response) => {
				if (response.status === 200) {
					return response.data;
				}
			})
			.catch((error) => {
				throw new Error(
					error.response.data.message || "An error occurred"
				);
			});
	}
);

export const createParameter = createAsyncThunk(
	"parameter/add",
	(parameterData) => {
		return axios
			.post(parameterApi, parameterData)
			.then((response) => {
				if (response.status === 200) {
					return response.data;
				} else {
					throw new Error("Invalid parametername or password");
				}
			})
			.catch((error) => {
				throw new Error(
					error.response.data.message || "An error occurred"
				);
			});
	}
);

const parameterSlice = createSlice({
	name: "parameter",
	initialState: {
		loading: false,
		parametersList: null,
		parameterIDsList: null,
		selected: null,
		boundFound: false,
		orderColor: [],
		paramDetailFilled: true,
		error: "",
	},
	reducers: {
		setParameterIDs: (state, action) => {
			state.parameterIDsList = action.payload;
		},
		setFoundBound: (state, action) => {
			state.boundFound = action.payload;
		},
		resetParameter: (state) => {
			state.parameterIDsList = null;
			state.boundFound = false;
		},
		resetDetail: (state) => {
			state.paramDetailFilled = false;
		},
		setOrderColor: (state, action) => {
			state.orderColor = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getParameter.pending, (state) => {
				state.loading = true;
			})
			.addCase(getParameter.fulfilled, (state, action) => {
				state.loading = false;
				state.selected = action.payload;
				state.error = "";
			})
			.addCase(getParameter.rejected, (state, action) => {
				state.loading = false;
				state.selected = [];
				state.error = action.error.message;
			})
			.addCase(getParameters.pending, (state) => {
				state.loading = true;
			})
			.addCase(getParameters.fulfilled, (state, action) => {
				state.loading = false;
				state.parametersList = action.payload;
				state.error = "";
			})
			.addCase(getParameters.rejected, (state, action) => {
				state.loading = false;
				state.parametersList = [];
				state.error = action.error.message;
			})
			.addCase(createParameter.pending, (state) => {
				state.loading = true;
			})
			.addCase(createParameter.fulfilled, (state, action) => {
				state.loading = false;
				state.selected = [];
				state.error = "";
			})
			.addCase(createParameter.rejected, (state, action) => {
				state.loading = false;
				state.selected = [];
				state.error = action.error.message;
			})
			.addCase(getBounds.pending, (state) => {
				state.loading = true;
			})
			.addCase(getBounds.fulfilled, (state, action) => {
				state.loading = false;
				if (action.payload.data === null) {
					state.paramDetailFilled = false;
				} else state.paramDetailFilled = true;
				const { paramID, data } = action.payload;
				state.parameterIDsList = state.parameterIDsList.map((param) =>
					param.id === paramID ? { ...param, ...data } : param
				);
			})
			.addCase(getBounds.rejected, (state, action) => {
				state.paramDetailFilled = false;
				state.loading = false;
				state.parametersList = [];
				state.selected = [];
				state.error = action.error.message;
			})
			.addCase(getValue.pending, (state) => {
				state.loading = true;
			})
			.addCase(getValue.fulfilled, (state, action) => {
				state.loading = false;
				const { paramID, data } = action.payload;
				state.parameterIDsList = state.parameterIDsList.map((param) =>
					param.id === paramID ? { ...param, ...data } : param
				);
			})
			.addCase(getValue.rejected, (state, action) => {
				state.loading = false;
				state.parametersList = [];
				state.selected = [];
				state.error = action.error.message;
			})
			.addCase(createBound.pending, (state) => {
				state.loading = true;
			})
			.addCase(createBound.fulfilled, (state, action) => {
				state.loading = false;
				state.paramDetail = false;
				state.selected = [];
				state.error = "";
			})
			.addCase(createBound.rejected, (state, action) => {
				state.loading = false;
				state.paramDetail = false;
				state.selected = [];
				state.error = action.error.message;
			})
			.addCase(addTestValue.pending, (state) => {
				state.loading = true;
			})
			.addCase(addTestValue.fulfilled, (state, action) => {
				state.loading = false;
				state.paramDetail = false;
				state.selected = [];
				state.error = "";
			})
			.addCase(addTestValue.rejected, (state, action) => {
				state.loading = false;
				state.paramDetail = false;
				state.selected = [];
				state.error = action.error.message;
			})
			.addCase(getStatusData.pending, (state) => {
				state.loading = true;
			})
			.addCase(getStatusData.fulfilled, (state, action) => {
				state.loading = false;
				state.StatusData = action.payload;
				state.error = "";
			})
			.addCase(getStatusData.rejected, (state, action) => {
				state.loading = false;
				state.StatusData = [];
				state.error = action.error.message;
			});
	},
});

export default parameterSlice.reducer;
export const {
	setParameterIDs,
	setFoundBound,
	resetParameter,
	setOrderColor,
	resetDetail,
} = parameterSlice.actions;
