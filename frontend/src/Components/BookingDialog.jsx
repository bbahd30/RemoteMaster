import React, { forwardRef, useEffect } from "react";
import {
	AppBar,
	Box,
	Button,
	Dialog,
	IconButton,
	Slide,
	Toolbar,
	Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useDispatch, useSelector } from "react-redux";
import { resetBooking, setDialogOpen } from "../Slices/bookingSlice";
import { resetParameter, setParameterIDs } from "../Slices/parameterSlice";
import ParameterCard from "./ParameterCard";
import { resetTest } from "../Slices/testSlice";
import { resetPatient } from "../Slices/patientSlice";

const BookingDialog = () => {
	const dispatch = useDispatch();
	const open = useSelector((state) => state.booking.open);
	const patient = useSelector((state) => state.patient.selectedPatient);
	const test = useSelector((state) => state.test.selectedTest);

	const handleClose = () => {
		dispatch(setDialogOpen());
		window.location.reload();
		// dispatch(resetBooking());
		// dispatch(resetTest());
		// dispatch(resetParameter());
		// dispatch(resetPatient());
	};
	const Transition = forwardRef(function Transition(props, ref) {
		return <Slide direction="up" ref={ref} {...props} />;
	});

	useEffect(() => {
		let params = [];
		test?.parameters?.map((param) => {
			let value = {
				id: param.ID,
			};
			params.push(value);
		});
		if (params?.length > 0) {
			dispatch(setParameterIDs(params));
		}
	}, [test]);
	return (
		<Dialog
			fullScreen
			open={open}
			onClose={handleClose}
			TransitionComponent={Transition}
		>
			<AppBar sx={{ position: "relative" }}>
				<Toolbar>
					<IconButton
						edge="start"
						color="inherit"
						onClick={handleClose}
						aria-label="close"
					>
						<CloseIcon />
					</IconButton>
					<Typography
						sx={{ ml: 2, flex: 1 }}
						variant="h6"
						component="div"
					>
						{patient?.name}
					</Typography>
					<Button autoFocus color="inherit" onClick={handleClose}>
						Save
					</Button>
				</Toolbar>
			</AppBar>
			<Box p={2}>
				<Typography fontFamily={"Poppins"} variant="h4">
					Test Record
				</Typography>
				<Typography fontFamily={"Poppins"} variant="h6" sx={{ p: 2 }}>
					{test?.test_name}
				</Typography>
				<Box sx={{ display: "flex" }}>
					{test?.parameters?.map((param) => (
						<ParameterCard parameter={param} />
					))}
				</Box>
			</Box>
		</Dialog>
	);
};

export default BookingDialog;
