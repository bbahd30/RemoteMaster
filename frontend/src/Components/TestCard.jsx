import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import { green } from "@mui/material/colors";
import { setTestID } from "../Slices/testSlice";
import { useDispatch, useSelector } from "react-redux";
import { setParameterIDs } from "../Slices/parameterSlice";

const TestCard = ({ data }) => {
	const dispatch = useDispatch();
	const test = useSelector((state) => state.test.selectedTest);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		let params = [];
		test?.parameters?.map((param) => {
			params.push(param.ID);
		});
		dispatch(setParameterIDs(params));
	}, []);

	const handleClick = () => {
		if (!open) {
			dispatch(
				setTestID({
					testID: data.ID,
					test: data,
				})
			);
			setOpen(true);
		} else {
			// dispatch(setTestID({ testID: null, test: null }));
			setOpen(false);
		}
	};
	return (
		<Card
			sx={{
				maxWidth: 345,
				m: 2,
				border: 1,
				borderColor: "grey.300",
				borderRadius: 2,
				boxShadow: 3,
			}}
			onClick={handleClick}
		>
			<CardHeader
				title={data.test_name}
				titleTypographyProps={{ align: "center", variant: "h6" }}
				sx={{
					backgroundColor: green[500],
					color: "common.white",
				}}
			/>
			<CardContent>
				<Typography variant="body2" color="text.secondary">
					Test Code: {data.test_code}
				</Typography>
				<Typography variant="body2" color="text.secondary" mt={2}>
					Test Method: {data.test_method}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default TestCard;
