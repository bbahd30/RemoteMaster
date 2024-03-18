import React, { useEffect, useState } from "react";
import { Box, Toolbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getBookings } from "../Slices/bookingSlice";
import BookingTable from "../Components/BookingTable";
import BookingFormDialog from "../Components/BookingFormDialog";

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
					<BookingFormDialog />
				</Toolbar>
			</Box>
			<BookingTable />
		</div>
	);
};

export default BookingPage;
