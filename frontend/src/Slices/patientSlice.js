import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { patientApi } from "../Links";

export const getPatients = createAsyncThunk("patients/get", () => {
	return axios
		.get(patientApi)
		.then((response) => {
			if (response.status === 200) {
				return response.data;
			}
		})
		.catch((error) => {
			throw new Error(error.response.data.message || "An error occurred");
		});
});

export const getPatient = createAsyncThunk("patient/get", (id) => {
	return axios
		.get(`${patientApi}${id}/`)
		.then((response) => {
			if (response.status === 200) {
				return {
					patientID: id,
					patient: response.data,
				};
			}
		})
		.catch((error) => {
			throw new Error(error.response.data.message || "An error occurred");
		});
});

export const createPatient = createAsyncThunk("patient/add", (patientData) => {
	return axios
		.post(patientApi, patientData)
		.then((response) => {
			if (response.status === 200) {
				return response.data;
			} else {
				throw new Error("Invalid patientname or password");
			}
		})
		.catch((error) => {
			throw new Error(error.response.data.message || "An error occurred");
		});
});

const patientSlice = createSlice({
	name: "patient",
	initialState: {
		loading: false,
		patientsList: null,
		selectedID: null,
		selectedPatient: null,
		imageDataUrl: null,
		error: "",
	},
	reducers: {
		setPatientID: (state, action) => {
			state.selectedID = action.payload["patientID"];
			state.selectedPatient = action.payload["patient"];
		},
		resetPatient: (state) => {
			state.selectedID = null;
			state.selectedPatient = null;
		},
		setImage: (state, action) => {
			state.imageDataUrl = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getPatient.pending, (state) => {
				state.loading = true;
			})
			.addCase(getPatient.fulfilled, (state, action) => {
				state.loading = false;
				state.selectedID = action.payload["patientID"];
				state.selectedPatient = action.payload["patient"];
				state.error = "";
			})
			.addCase(getPatient.rejected, (state, action) => {
				state.loading = false;
				state.selectedID = [];
				state.selectedPatient = null;
				state.error = action.error.message;
			})
			.addCase(getPatients.pending, (state) => {
				state.loading = true;
			})
			.addCase(getPatients.fulfilled, (state, action) => {
				state.loading = false;
				state.patientsList = action.payload;
				state.error = "";
			})
			.addCase(getPatients.rejected, (state, action) => {
				state.loading = false;
				state.patientsList = [];
				state.error = action.error.message;
			})
			.addCase(createPatient.pending, (state) => {
				state.loading = true;
			})
			.addCase(createPatient.fulfilled, (state, action) => {
				state.loading = false;
				state.selectedID = [];
				state.error = "";
			})
			.addCase(createPatient.rejected, (state, action) => {
				state.loading = false;
				state.selectedID = [];
				state.error = action.error.message;
			});
	},
});

export default patientSlice.reducer;
export const { setPatientID, resetPatient, setImage } = patientSlice.actions;
