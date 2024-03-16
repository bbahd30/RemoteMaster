import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slices/userSlice";
import bookingReducer from "../Slices/bookingSlice";
import testReducer from "../Slices/testSlice";
import patientReducer from "../Slices/patientSlice";
import resultReducer from "../Slices/resultSlice";
import parameterReducer from "../Slices/parameterSlice";

const store = configureStore({
	reducer: {
		user: userReducer,
		booking: bookingReducer,
		test: testReducer,
		patient: patientReducer,
		result: resultReducer,
		parameter: parameterReducer,
	},

	// middleware: (getDefaultMiddleware) =>
	// 	getDefaultMiddleware({
	// 		serializableCheck: false,
	// 	}),
});

export default store;
