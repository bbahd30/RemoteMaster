import React, { useState } from "react";
import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	Box,
	Grid,
	Typography,
	List,
	TextareaAutosize,
	Divider,
	Chip,
	Card,
} from "@mui/material";

import useGetParaIDs from "../utils/useGetParaIDs";
import useGenerateParaValues from "../utils/useGenerateParaValues";
import { useDispatch, useSelector } from "react-redux";
import { createBound } from "../Slices/parameterSlice";
import { AddCircleOutline } from "@mui/icons-material";

const ParamForm = ({ testID, handleClose, param }) => {
	const dispatch = useDispatch();

	const [formValues, setFormValues] = useState({
		lower_bound: null,
		upper_bound: null,
		unit: "",
		lower_text: "",
		upper_text: "",
		lower_reasons: [""],
		upper_reasons: [""],
	});

	const handleReasons = (e, index, type) => {
		const { name, value } = e.target;
		if (type === "reason") {
			const reasons = formValues[name].slice();
			reasons[index] = value;
			setFormValues({ ...formValues, [name]: reasons });
		} else {
			let modifiedValue =
				name === "lower_bound" || name === "upper_bound"
					? parseFloat(value)
					: value;
			if (
				isNaN(modifiedValue) &&
				(name === "lower_bound" || name === "upper_bound")
			) {
				modifiedValue = null;
			}
			setFormValues({ ...formValues, [name]: modifiedValue });
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		let modifiedValue = value;

		if (name === "lower_bound" || name === "upper_bound") {
			modifiedValue = parseFloat(value);
			if (isNaN(modifiedValue)) {
				modifiedValue = null;
			}
		}

		setFormValues((prevState) => ({
			...prevState,
			[name]: modifiedValue,
		}));
	};

	const handleSubmit = (event, paramID) => {
		event.preventDefault();
		let lowerReasonsString = formValues.lower_reasons.join(",");
		let upperReasonsString = formValues.upper_reasons.join(",");
		let data = {
			...formValues,
			lower_reasons: lowerReasonsString,
			upper_reasons: upperReasonsString,
			paramID: paramID || param.ID,
			testID: testID,
		};
		console.log(data);
		dispatch(createBound(data));
	};

	const addReasonField = (type) => {
		setFormValues((prevState) => ({
			...prevState,
			[type]: [...prevState[type], ""],
		}));
	};

	return (
		<Box
			component="form"
			onSubmit={(e) => handleSubmit(e, param.id)}
			noValidate
		>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={4}>
					<TextField
						required
						fullWidth
						name="lower_bound"
						label="Lower Bound"
						type="number"
						id="lower_bound"
						value={param.lower_bound || formValues.lower_bound}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<TextField
						required
						fullWidth
						name="upper_bound"
						label="Upper Bound"
						type="number"
						id="upper_bound"
						value={param.upper_bound || formValues.upper_bound}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={12} sm={4}>
					<TextField
						fullWidth
						name="unit"
						label="Unit"
						id="unit"
						value={formValues.unit}
						onChange={handleChange}
					/>
				</Grid>
			</Grid>
			<Divider sx={{ mt: 2 }}>
				<Chip label="Lower Range" size="small" />
			</Divider>
			<>
				<TextField
					fullWidth
					multiline
					rows={4}
					margin="normal"
					variant="outlined"
					name="lower_text"
					label="Health Advice for Lower Range"
					id="lower_text"
					value={formValues.lower_text}
					onChange={handleChange}
				/>
				{formValues.lower_reasons?.map((reason, index) => (
					<Box
						key={index}
						sx={{
							display: "flex",
							alignItems: "center",
							gap: 1,
							mb: 2,
						}}
					>
						<TextField
							fullWidth
							variant="outlined"
							name="lower_reasons"
							label={`Reason #${index + 1} for lower range`}
							value={reason}
							onChange={(e) => handleReasons(e, index, "reason")}
						/>
						{index === formValues.lower_reasons.length - 1 && (
							<AddCircleOutline
								sx={{ color: "primary" }}
								onClick={() => addReasonField("lower_reasons")}
							/>
						)}
					</Box>
				))}
			</>
			<Divider>
				<Chip label="Higher Range" size="small" />
			</Divider>
			<>
				<TextField
					fullWidth
					multiline
					rows={4}
					margin="normal"
					variant="outlined"
					name="upper_text"
					label="Health Advice for Higher Range"
					id="upper_text"
					value={formValues.upper_text}
					onChange={handleChange}
					style={{ marginBottom: "1.5rem" }}
				/>
				{formValues.upper_reasons?.map((reason, index) => (
					<Box
						key={index}
						sx={{
							display: "flex",
							alignItems: "center",
							gap: 1,
							mb: 2,
						}}
					>
						<TextField
							fullWidth
							variant="outlined"
							name="upper_reasons"
							label={`Reason #${index + 1} higher range`}
							value={reason}
							onChange={(e) => handleReasons(e, index, "reason")}
						/>
						{index === formValues.upper_reasons.length - 1 && (
							<AddCircleOutline
								sx={{ color: "primary" }}
								onClick={() => addReasonField("upper_reasons")}
							/>
						)}
					</Box>
				))}
			</>
			<Button
				type="submit"
				variant="contained"
				sx={{
					width: "max-content",
				}}
			>
				Submit
			</Button>
		</Box>
	);
};

const TestDetailForm = ({ open, handleClose, selectedTest }) => {
	useGetParaIDs();
	useGenerateParaValues();

	const form = useSelector((state) => state.parameter.paramDetailFilled);
	const params = useSelector((state) => state.parameter?.parameterIDsList);
	const paramDetails = useSelector(
		(state) => state.parameter?.parametersList
	);
	let itemsToRender = params?.some((param) => "name" in param)
		? params
		: paramDetails;

	console.log(itemsToRender);

	return (
		<Dialog fullWidth maxWidth="lg" open={open} onClose={handleClose}>
			<DialogTitle>
				<Typography
					variant="h6"
					component="div"
					sx={{ fontFamily: "Poppins", mb: 2 }}
				>
					Test Details
				</Typography>
			</DialogTitle>
			<DialogContent>
				<Box>
					<Typography variant="body1" sx={{ fontFamily: "Poppins" }}>
						<strong>Name:</strong> {selectedTest?.test_name}
					</Typography>
					<Typography
						variant="body1"
						sx={{ fontFamily: "Poppins", mt: 1 }}
					>
						<strong>Code:</strong> {selectedTest?.test_code}
					</Typography>
					{selectedTest?.test_method && (
						<Typography
							variant="body1"
							sx={{ fontFamily: "Poppins", mt: 1 }}
						>
							<strong>Method:</strong> {selectedTest?.test_method}
						</Typography>
					)}
					{form && itemsToRender && (
						<Box mt={2}>
							<Typography
								variant="body1"
								sx={{ fontFamily: "Poppins", mb: 1 }}
							>
								<strong>Parameters:</strong>
							</Typography>
							<List>
								{itemsToRender?.map((param) => (
									<>
										<Typography
											key={param.id}
											variant="body1"
											sx={{
												fontFamily: "Poppins",
												mb: 1,
											}}
										>
											{" "}
											{param.param_name}:{" "}
											<strong>
												{param.lower_bound} -{" "}
												{param.upper_bound}{" "}
												{param?.unit}
											</strong>
										</Typography>
									</>
								))}
							</List>
						</Box>
					)}
				</Box>
				{!form && (
					<>
						<Typography
							variant="h6"
							sx={{ fontFamily: "Poppins", mb: 2, mt: 4 }}
						>
							<strong>Parameters:</strong>
						</Typography>
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								flexWrap: "wrap",
								gap: 2,
							}}
						>
							{itemsToRender?.map((param, index) => (
								<Card
									variant="outlined"
									sx={{
										flex: "1 1 auto",
										minWidth: "300px",
										mb: 4,
										mt: index === 0 ? 0 : 4,
										p: 2,
										boxShadow: 3,
									}}
									key={param.ID}
								>
									<Typography
										variant="h5"
										sx={{
											fontFamily: "Poppins",
											mb: 2,
											fontWeight: "fontWeightMedium",
										}}
									>
										{param.param_name}
									</Typography>
									<Divider sx={{ mb: 2 }} />
									<ParamForm
										param={param}
										testID={selectedTest?.ID}
										handleClose={handleClose}
									/>
								</Card>
							))}
						</Box>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default TestDetailForm;
