import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { bookingApi } from "../Links";

export const getBookings = createAsyncThunk("bookings/get", () => {
	return axios
		.get(bookingApi)
		.then((response) => {
			if (response.status === 200) {
				return response.data;
			}
		})
		.catch((error) => {
			throw new Error(error.response.data.message || "An error occurred");
		});
});

export const getBooking = createAsyncThunk("booking/get", (id) => {
	return axios
		.get(`${bookingApi}${id}/`)
		.then((response) => {
			if (response.status === 200) {
				return response.data;
			}
		})
		.catch((error) => {
			throw new Error(error.response.data.message || "An error occurred");
		});
});

export const createBooking = createAsyncThunk("booking/add", (bookingData) => {
	return axios
		.post(bookingApi, bookingData)
		.then((response) => {
			if (response.status === 200) {
				return response.data;
			} else {
				throw new Error("Invalid bookingname or password");
			}
		})
		.catch((error) => {
			throw new Error(error.response.data.message || "An error occurred");
		});
});

const bookingSlice = createSlice({
	name: "booking",
	initialState: {
		loading: false,
		bookingsList: null,
		open: false,
		selectedBooking: null,
		error: "",
	},
	reducers: {
		setBookingID: (state, action) => {
			state.selectedBooking = action.payload;
		},
		setDialogOpen: (state) => {
			state.open = !state.open;
		},
		resetBooking: (state) => {
			state.selectedBooking = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getBooking.pending, (state) => {
				state.loading = true;
			})
			.addCase(getBooking.fulfilled, (state, action) => {
				state.loading = false;
				state.selectedBooking = action.payload;
				state.error = "";
			})
			.addCase(getBooking.rejected, (state, action) => {
				state.loading = false;
				state.selectedBooking = [];
				state.error = action.error.message;
			})
			.addCase(getBookings.pending, (state) => {
				state.loading = true;
			})
			.addCase(getBookings.fulfilled, (state, action) => {
				state.loading = false;
				state.bookingsList = action.payload;
				state.error = "";
			})
			.addCase(getBookings.rejected, (state, action) => {
				state.loading = false;
				state.bookingsList = [];
				state.error = action.error.message;
			})
			.addCase(createBooking.pending, (state) => {
				state.loading = true;
			})
			.addCase(createBooking.fulfilled, (state, action) => {
				state.loading = false;
				state.bookingsList = [];
				state.selectedBooking = [];
				state.error = "";
			})
			.addCase(createBooking.rejected, (state, action) => {
				state.loading = false;
				state.bookingsList = [];
				state.selectedBooking = [];
				state.error = action.error.message;
			});
	},
});

export default bookingSlice.reducer;
export const { setBookingID, setDialogOpen, resetBooking } =
	bookingSlice.actions;
