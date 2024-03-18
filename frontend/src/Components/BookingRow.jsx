import React, { useEffect, useState } from "react";
import {
	Collapse,
	IconButton,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Box,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import BookingDialog from "./BookingDialog";
import { useDispatch } from "react-redux";
import { setBookingID, setDialogOpen } from "../Slices/bookingSlice";
import { setTestID } from "../Slices/testSlice";
import { setPatientID } from "../Slices/patientSlice";
import { setResultID } from "../Slices/resultSlice";

const formatDate = (dateString) => {
	return dateString.slice(0, 10);
};

const BookingRow = (props) => {
	const dispatch = useDispatch();
	const { row } = props;
	const [open, setOpen] = useState(false);
	const isCollected =
		row.c_date && row.c_date !== "0001-01-01T05:53:28+05:53";

	return (
		<React.Fragment>
			<TableRow
				sx={{
					"& > *": { borderBottom: "unset" },
					...(isCollected ? {} : { backgroundColor: "#FFEBEE" }),
				}}
				onClick={(event) => {
					if (event.target.cellIndex !== 0) {
						dispatch(setBookingID(row.ID));
						dispatch(setDialogOpen());
						dispatch(
							setTestID({
								testID: row.testID,
								test: row.Test,
							})
						);
						dispatch(
							setPatientID({
								patientID: row.patientID,
								patient: row.Patient,
							})
						);
						dispatch(
							setResultID({
								resultID: row.resultID,
							})
						);
					}
				}}
			>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={(e) => {
							e.stopPropagation();
							setOpen(!open);
						}}
					>
						{open ? (
							<KeyboardArrowUpIcon />
						) : (
							<KeyboardArrowDownIcon />
						)}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					{row.Patient.name}
				</TableCell>
				<TableCell align="right">{row.Test.test_name}</TableCell>
				<TableCell align="right">{row.Test.test_code}</TableCell>
				<TableCell align="right">{row.Test.test_method}</TableCell>
				<TableCell align="right">{formatDate(row.b_date)}</TableCell>
				{/* Booking Date */}
				<TableCell align="right">
					{isCollected
						? formatDate(row.c_date)
						: "Pending Collection"}
				</TableCell>
				{/* Collection Date */}
			</TableRow>
			<TableRow>
				<TableCell
					style={{ paddingBottom: 0, paddingTop: 0 }}
					colSpan={7}
				>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography
								variant="h6"
								gutterBottom
								component="div"
							>
								Details
							</Typography>
							<Table size="small" aria-label="details">
								<TableHead>
									<TableRow>
										<TableCell>Date of Birth</TableCell>
										<TableCell>Gender</TableCell>
										<TableCell align="right">
											Phone
										</TableCell>
										<TableCell align="right">
											Email
										</TableCell>
										<TableCell align="right">
											Address
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow key={row.Patient.ID}>
										<TableCell component="th" scope="row">
											{formatDate(row.Patient.dob)}
										</TableCell>
										<TableCell>
											{row.Patient.gender}
										</TableCell>
										<TableCell align="right">
											{row.Patient.contact_phone}
										</TableCell>
										<TableCell align="right">
											{row.Patient.email}
										</TableCell>
										<TableCell align="right">
											{row.Patient.address}
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
			<BookingDialog />
		</React.Fragment>
	);
};
export default BookingRow;
