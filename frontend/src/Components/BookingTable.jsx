import React, { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Box,
	TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getBookings } from "../Slices/bookingSlice";
import BookingRow from "./BookingRow";

const BookingTable = () => {
	const dispatch = useDispatch();
	const fetchedList = useSelector((state) => state.booking);
	const bookings = fetchedList.bookingsList;

	useEffect(() => {
		if (!bookings) {
			dispatch(getBookings());
		}
	}, [fetchedList]);

	const [searchTerm, setSearchTerm] = useState("");

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value.toLowerCase());
	};

	const filteredBookings = bookings?.filter((booking) =>
		booking.Patient.name.toLowerCase().includes(searchTerm)
	);

	return (
		<Box sx={{ width: "100%" }}>
			<Box sx={{ padding: 2 }}>
				<TextField
					fullWidth
					label="Search by Patient Name"
					variant="outlined"
					onChange={handleSearchChange}
				/>
			</Box>
			<TableContainer component={Paper}>
				<Table aria-label="collapsible table">
					<TableHead>
						<TableRow>
							<TableCell />
							<TableCell>Patient Name</TableCell>
							<TableCell align="right">Test Name</TableCell>
							<TableCell align="right">Test Code</TableCell>
							<TableCell align="right">Test Method</TableCell>
							<TableCell align="right">Booking Date</TableCell>
							<TableCell align="right">Collection Date</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredBookings?.map((row) => (
							<BookingRow key={row.ID} row={row} />
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default BookingTable;
