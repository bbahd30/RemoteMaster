import React, { useEffect, useState } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	MenuItem,
	Select,
	InputLabel,
	FormControl,
	Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getPatients } from "../Slices/patientSlice";
import { getTests } from "../Slices/testSlice";
import { createBooking } from "../Slices/bookingSlice";

const BookingFormDialog = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getPatients());
		dispatch(getTests());
	}, []);

	const [selectedPatient, setSelectedPatient] = useState();
	const [selectedTest, setSelectedTest] = useState("");

	const tests = useSelector((state) => state.test.testsList);
	const patients = useSelector((state) => state.patient.patientsList);
	const userID = useSelector((state) => state.user?.user?.ID);
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSave = () => {
		dispatch(
			createBooking({
				testID: selectedTest,
				patientID: selectedPatient,
				leadID: userID,
			})
		);
		handleClose();
	};

	return (
		<div>
			<Button
				variant="contained"
				color="primary"
				onClick={handleClickOpen}
			>
				Add Booking
			</Button>
			<Dialog maxWidth="md" open={open} onClose={handleClose}>
				<DialogTitle>Add a Booking</DialogTitle>
				<Box sx={{ px: 4, py: 3, width: "400px" }}>
					<FormControl fullWidth>
						<InputLabel>Patient</InputLabel>
						<Select
							value={selectedPatient}
							label="Patient"
							onChange={(e) => {
								setSelectedPatient(e.target.value);
							}}
						>
							{patients?.map((patient) => (
								<MenuItem key={patient.ID} value={patient.ID}>
									{patient.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<FormControl fullWidth style={{ marginTop: "20px" }}>
						<InputLabel>Test</InputLabel>
						<Select
							value={selectedTest}
							label="Test"
							onChange={(e) => {
								setSelectedTest(e.target.value);
							}}
						>
							{tests?.map((test) => (
								<MenuItem key={test.ID} value={test.ID}>
									{test.test_name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSave}>Save</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default BookingFormDialog;
