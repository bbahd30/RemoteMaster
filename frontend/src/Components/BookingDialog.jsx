import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	AppBar,
	Box,
	Button,
	Collapse,
	Dialog,
	IconButton,
	Slide,
	Toolbar,
	Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { resetBooking, setDialogOpen } from "../Slices/bookingSlice";
import {
	resetParameter,
	setOrderColor,
	setParameterIDs,
} from "../Slices/parameterSlice";
import { resetTest } from "../Slices/testSlice";
import { resetPatient, setImage } from "../Slices/patientSlice";
import ParameterCard from "./ParameterCard";
import PDFDownloadBtn from "./PdfDownloadBtn";
import HumanBodySVG from "./HumanBody/HumanBody";
import svgToDataURL from "./svgToDataURL";
import generateRandomColor from "../utils/colorGenerate";
import useGetParaIDs from "../utils/useGetParaIDs";

const BookingDialog = () => {
	useGetParaIDs();
	const dispatch = useDispatch();
	const [generate, setGenerate] = useState(false);
	const open = useSelector((state) => state.booking.open);
	const test = useSelector((state) => state.test.selectedTest);
	const parameters = test?.parameters;
	const bodyImage = useSelector((state) => state.patient.imageDataUrl);
	const patient = useSelector((state) => state.patient.selectedPatient);
	const colors = useSelector((state) => state.parameter.orderColor);

	const paramRef = useRef();

	const handleClose = () => {
		dispatch(setDialogOpen());
		window.location.reload();
		// dispatch(resetBooking());
		// dispatch(resetTest());
		// dispatch(resetParameter());
		// dispatch(resetPatient());
	};

	const generatePDF = () => {
		const svgElement = document.getElementById("humanBody");
		svgToDataURL(svgElement)
			.then((image64) => {
				dispatch(setImage(image64));
			})
			.catch((error) => {
				console.error("Error converting SVG to image", error);
			});
	};

	const handleImage = () => {
		if (generate) {
			generatePDF();
		} else {
			setGenerate(true);
		}
	};

	const Transition = forwardRef(function Transition(props, ref) {
		return <Slide direction="up" ref={ref} {...props} />;
	});

	useEffect(() => {
		if (parameters?.length > 0) {
			let orderColor = [];
			parameters?.map((param) => {
				orderColor.push(generateRandomColor());
			});
			dispatch(setOrderColor(orderColor));
		}
	}, [parameters]);

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
					<PDFDownloadBtn
						patient={patient}
						test={test}
						bodyImage={bodyImage}
						paramRef={paramRef}
					/>
				</Toolbar>
			</AppBar>
			<Box p={2}>
				<Typography fontFamily={"Poppins"} variant="h6">
					Test Records
				</Typography>
				<Typography fontFamily={"Poppins"} variant="h4" sx={{ p: 2 }}>
					{test?.test_name}
				</Typography>
				<Box
					ref={paramRef}
					sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}
				>
					{parameters?.map((param, id) => (
						<ParameterCard
							key={id}
							color={colors[id]}
							parameter={param}
						/>
					))}
				</Box>
			</Box>
			<AppBar
				position="fixed"
				sx={{
					top: "auto",
					bottom: 0,
					backgroundColor: "transparent",
				}}
			>
				<Button onClick={handleImage}>
					{generate ? "Save Image" : "Mark affected Body Parts"}
				</Button>
			</AppBar>
			<Box
				sx={{
					display: "flex",
					marginLeft: "50%",
					transform: "translateX(-50%)",
					alignContent: "center",
					width: "max-content",
				}}
			>
				<Box sx={{ padding: 2, maxWidth: "20rem" }}>
					<Typography fontFamily={"Poppins"} variant="h4">
						Instructions
					</Typography>
					<Typography fontFamily={"Poppins"} variant="body1">
						Click on the affected body parts as per the order of
						parameters tested. The body parts will be marked. You
						can reset them too if order is wrong.
					</Typography>
				</Box>
				<Box
					sx={{
						width: "100%",
						py: 5,
						width: "max-content",
					}}
				>
					<Collapse in={generate}>
						<HumanBodySVG />
					</Collapse>
				</Box>
			</Box>
		</Dialog>
	);
};

export default BookingDialog;
