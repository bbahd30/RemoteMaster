import React, { useEffect, useState } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	Button,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Chip,
	OutlinedInput,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getParameters } from "../Slices/parameterSlice";
import { createTest, getTests } from "../Slices/testSlice";

const TestFormDialog = ({ open, handleClose }) => {
	const dispatch = useDispatch();

	const parameters = useSelector((state) => state.parameter.parametersList);
	useEffect(() => {
		dispatch(getParameters());
	}, []);

	const [testDetails, setTestDetails] = useState({
		test_name: "",
		test_code: "",
		test_method: "",
		parameters: [],
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setTestDetails({ ...testDetails, [name]: value });
	};

	const handleParameterChange = (event) => {
		const {
			target: { value },
		} = event;
		setTestDetails({
			...testDetails,
			parameters: typeof value === "string" ? value.split(",") : value,
		});
	};

	const handleSave = () => {
		const formattedParameters = testDetails.parameters.map((id) => ({
			ID: id,
		}));
		dispatch(
			createTest({
				...testDetails,
				parameters: formattedParameters,
			})
		)
			.unwrap()
			.then((response) => {
				dispatch(getTests());
			})
			.catch((error) => {
				console.error("Failed to create the test:", error);
			});

		handleClose();
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Add New Test</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					name="test_name"
					label="Test Name"
					type="text"
					fullWidth
					variant="outlined"
					value={testDetails.test_name}
					onChange={handleChange}
				/>
				<TextField
					margin="dense"
					name="test_code"
					label="Test Code"
					type="text"
					fullWidth
					variant="outlined"
					value={testDetails.test_code}
					onChange={handleChange}
				/>
				<TextField
					margin="dense"
					name="test_method"
					label="Test Method"
					type="text"
					fullWidth
					variant="outlined"
					value={testDetails.test_method}
					onChange={handleChange}
				/>
				<FormControl fullWidth margin="normal">
					<InputLabel id="parameters-label">Parameters</InputLabel>
					<Select
						labelId="parameters-label"
						multiple
						value={testDetails.parameters}
						onChange={handleParameterChange}
						input={
							<OutlinedInput
								id="select-multiple-chip"
								label="Chip"
							/>
						}
						renderValue={(selected) => (
							<div>
								{selected.map((value) => (
									<Chip
										sx={{ mr: 2 }}
										key={value}
										label={
											parameters.find(
												(param) => param.ID === value
											)?.param_name || value
										}
									/>
								))}
							</div>
						)}
					>
						{parameters?.map((parameter) => (
							<MenuItem key={parameter.ID} value={parameter.ID}>
								{parameter.param_name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<Button onClick={handleSave}>Save</Button>
			</DialogContent>
		</Dialog>
	);
};

export default TestFormDialog;
