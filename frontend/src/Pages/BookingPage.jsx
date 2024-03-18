import React, { useEffect, useState } from "react";
import Navigation from "../Components/Navigation";
import { Box, Button, Toolbar, Typography } from "@mui/material";
import { setUser } from "../Slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { getBookings } from "../Slices/bookingSlice";
import BookingTable from "../Components/BookingTable";

const BookingPage = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getBookings());
	}, []);

	return (
		<div>
			<Box pt={2}>
				<Toolbar>
					<Typography
						fontFamily="Poppins"
						variant="h4"
						sx={{ flexGrow: 1 }}
					>
						Bookings
					</Typography>
					<Button variant="contained" color="primary">
						Add Booking
					</Button>
				</Toolbar>
			</Box>
			<BookingTable />
		</div>
	);
};

export default BookingPage;
