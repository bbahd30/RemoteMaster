import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Dialog,
	DialogTitle,
	DialogContent,
	Button,
	TextField,
	Box,
} from "@mui/material";

import { getTests, setTestID } from "../Slices/testSlice";
import {
	getParameters,
	resetDetail,
	setFoundBound,
	setParameterIDs,
} from "../Slices/parameterSlice";
import useGenerateParaValues from "../utils/useGenerateParaValues";
import TestFormDialog from "../Components/TestFormDialog";
import TestDetailForm from "../Components/TestDetailForm";

const TestTable = ({ testData }) => {
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const test = useSelector((state) => state.test.selectedTest);
	const testID = useSelector((state) => state.test.selectedID);
	const parameters = test?.parameters;
	const boundFound = useSelector((state) => state.parameter.boundFound);
	const parameterIDsList = useSelector(
		(state) => state.parameter?.parameterIDsList
	);

	const handleClickOpen = (data) => {
		dispatch(setTestID(data));
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		dispatch(setTestID({ testID: null, test: null }));
		dispatch(setFoundBound(false));
		dispatch(setParameterIDs(null));
		dispatch(resetDetail());
	};

	useEffect(() => {
		let params = [];
		parameters?.map((param) => {
			let value = {
				id: param.ID,
			};
			params.push(value);
		});
		if (params?.length > 0) {
			dispatch(setParameterIDs(params));
		}
	}, [test]);

	const selectedTest = useSelector((state) => state.test.selectedTest);
	useGenerateParaValues();
	return (
		<>
			<TableContainer component={Paper}>
				<Table sx={{ fontFamily: "Poppins" }}>
					<TableHead>
						<TableRow sx={{ fontSize: 8, fontWeight: "bold" }}>
							<TableCell>Name</TableCell>
							<TableCell>Code</TableCell>
							<TableCell>Method</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{testData?.map((test) => (
							<TableRow
								key={test.ID}
								hover
								onClick={() =>
									handleClickOpen({
										testID: test.ID,
										test: test,
									})
								}
							>
								<TableCell>{test.test_name}</TableCell>
								<TableCell>{test.test_code}</TableCell>
								<TableCell>{test.test_method}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<TestDetailForm
				open={open}
				handleClose={handleClose}
				selectedTest={selectedTest}
			/>
		</>
	);
};

const TestPage = () => {
	const dispatch = useDispatch();
	const [searchQuery, setSearchQuery] = useState("");
	const [open, setOpen] = useState(false);
	const handleClose = () => {
		setOpen(false);
	};
	useEffect(() => {
		dispatch(getTests());
	}, []);

	const testData = useSelector((state) => state.test.testsList);
	const filteredData = testData?.filter((test) =>
		test.test_name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div>
			<Box
				sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}
			>
				<div>Tests</div>
				<Button
					variant="contained"
					color="primary"
					onClick={() => setOpen(true)}
				>
					Add Test
				</Button>
				<TestFormDialog open={open} handleClose={handleClose} />
			</Box>
			<TextField
				fullWidth
				label="Search Tests"
				variant="outlined"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				sx={{ marginBottom: 2 }}
			/>
			<TestTable testData={filteredData} />
		</div>
	);
};

export default TestPage;
