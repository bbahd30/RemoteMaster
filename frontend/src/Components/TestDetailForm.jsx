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
} from "@mui/material";
import useGetParaIDs from "../utils/useGetParaIDs";
import useGenerateParaValues from "../utils/useGenerateParaValues";
import { useDispatch, useSelector } from "react-redux";
import { createBound } from "../Slices/parameterSlice";

const ParamForm = ({ testID, handleClose, param }) => {
	console.log(param);
	const dispatch = useDispatch();

	const [formValues, setFormValues] = useState({
		lower_bound: null,
		upper_bound: null,
		unit: "",
		lower_text: "",
		normal_text: "",
		upper_text: "",
	});

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
		let data = { ...formValues, paramID: paramID, testID: testID };
		console.log(data);
		dispatch(createBound(data));
		setFormValues({
			lower_bound: null,
			upper_bound: null,
			unit: "",
		});
		handleClose();
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
			<Button
				type="submit"
				variant="contained"
				sx={{
					mt: 1,
					mb: 3,
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

	return (
		<Dialog maxWidth="xl" open={open} onClose={handleClose}>
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
				<Box sx={{ width: 400, m: "auto" }}>
					<Typography variant="body1" sx={{ fontFamily: "Poppins" }}>
						<strong>Name:</strong> {selectedTest?.test_name}
					</Typography>
					<Typography
						variant="body1"
						sx={{ fontFamily: "Poppins", mt: 1 }}
					>
						<strong>Code:</strong> {selectedTest?.test_code}
					</Typography>
					<Typography
						variant="body1"
						sx={{ fontFamily: "Poppins", mt: 1 }}
					>
						<strong>Method:</strong> {selectedTest?.test_method}
					</Typography>
					{form && params && (
						<Box mt={2}>
							<Typography
								variant="body1"
								sx={{ fontFamily: "Poppins" }}
							>
								<strong>Parameters:</strong>
							</Typography>
							<List>
								{params?.map((param) => (
									<>
										<Typography
											key={param.ID}
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
							variant="body1"
							sx={{ fontFamily: "Poppins" }}
						>
							<strong>Parameters:</strong>
						</Typography>
						{params?.map((param) => (
							<>
								<Typography
									key={param.ID}
									variant="body1"
									sx={{ fontFamily: "Poppins", mb: 1 }}
								>
									{param.param_name}
								</Typography>
								<ParamForm
									param={param}
									testID={selectedTest?.ID}
									handleClose={handleClose}
								/>
							</>
						))}
					</>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default TestDetailForm;
