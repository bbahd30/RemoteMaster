import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import { blue } from "@mui/material/colors";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import useGenerateParaValues from "../utils/useGenerateParaValues";
import { createParameter, getParameters } from "../Slices/parameterSlice";
import useGetParaIDs from "../utils/useGetParaIDs";
import { getTests } from "../Slices/testSlice";
import TestCard from "../Components/TestCard";
import { Button, Dialog, TextField } from "@mui/material";

const AddParamForm = ({ handleClose, open }) => {
	const dispatch = useDispatch();
	const [paramName, setParamName] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		let data = { param_name: paramName };
		dispatch(createParameter(data))
			.then((response) => {
				dispatch(getParameters());
			})
			.catch((error) => {
				console.error("Failed to create the param:", error);
			});
		setParamName("");
		handleClose();
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<Box p={3}>
				<TextField
					required
					fullWidth
					name="param_name"
					label="Name"
					type="text"
					id="param_name"
					value={paramName}
					onChange={(e) => setParamName(e.target.value)}
				/>
				<Button
					onClick={handleSubmit}
					variant="contained"
					sx={{
						mt: 2,
						width: "max-content",
					}}
				>
					Add
				</Button>
			</Box>
		</Dialog>
	);
};

const ParaCard = ({ data }) => {
	return (
		<Card
			sx={{
				maxWidth: 345,
				m: 2,
				border: 1,
				borderColor: "grey.300",
				borderRadius: 2,
			}}
		>
			<CardHeader
				title={data.name}
				titleTypographyProps={{ align: "center", variant: "h6" }}
				sx={{
					backgroundColor: blue[500],
					color: "common.white",
				}}
			/>
			<CardContent>
				<Typography
					fontFamily={"Poppins"}
					variant="body2"
					color="text.secondary"
				>
					ID: {data.ID}
				</Typography>
				<Typography
					mt={2}
					fontFamily={"Poppins"}
					variant="h5"
					color="text.secondary"
				>
					{data.param_name}
				</Typography>
			</CardContent>
		</Card>
	);
};

const ParameterPage = () => {
	useGetParaIDs();
	useGenerateParaValues();
	const dispatch = useDispatch();
	const parameters = useSelector((state) => state.parameter.parametersList);
	const tests = useSelector((state) => state.test.testsList);
	const testID = useSelector((state) => state.test.selectedID);
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		dispatch(getTests());
		dispatch(getParameters());
	}, []);

	const parametersIDs = useSelector(
		(state) => state.parameter.parameterIDsList
	);
	return (
		<>
			<Box>
				<Button
					sx={{ mt: 5, mb: 5, display: "flex" }}
					variant="contained"
					color="primary"
					onClick={() => setOpen(true)}
				>
					Add Parameters
				</Button>
				<AddParamForm open={open} handleClose={handleClose} />
			</Box>
			<Box
				display="flex"
				flexDirection="row"
				flexWrap="wrap"
				justifyContent="space-evenly"
			>
				<Box>
					{parameters?.map((param, id) => (
						<ParaCard key={id} data={param} />
					))}
				</Box>
				<Box>
					{tests?.map((test, index) => (
						<TestCard key={index} data={test} />
					))}
				</Box>
			</Box>
		</>
	);
};

export default ParameterPage;
