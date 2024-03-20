import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, Button, TextField } from "@mui/material";
import HealthCard from "./HealthCard";
import useGenerateParaValues from "../utils/useGenerateParaValues";
import { addTestValue } from "../Slices/parameterSlice";

const TestValueForm = ({ paramID }) => {
	const dispatch = useDispatch();
	const bookingID = useSelector((state) => state.booking.selectedBooking);
	const [value, setValue] = useState(0);

	const handleChange = (e) => {
		setValue(e.target.value);
	};

	const handleSubmit = () => {
		dispatch(
			addTestValue({
				bookingID: bookingID,
				value: parseFloat(value),
				parameterID: paramID,
			})
		);
	};

	return (
		<Box>
			<Typography variant="h6" sx={{ mb: 1 }} fontFamily={"Poppins"}>
				Enter Test Value
			</Typography>
			<TextField
				required
				fullWidth
				name="lower_bound"
				label="Value"
				type="number"
				id="lower_bound"
				value={value}
				onChange={handleChange}
			/>
			<Button
				onClick={handleSubmit}
				variant="contained"
				sx={{
					mt: 1,
					width: "max-content",
				}}
			>
				Submit
			</Button>
		</Box>
	);
};
const ParameterCard = ({ parameter, color }) => {
	const dispatch = useDispatch();
	const testID = useSelector((state) => state.test.selectedID);
	const boundFound = useSelector((state) => state.parameter.boundFound);
	const bookingID = useSelector((state) => state.booking.selectedBooking);

	const parameterIDsList = useSelector(
		(state) => state.parameter?.parameterIDsList
	);
	const param = parameterIDsList?.find((param) => param.id === parameter.ID);

	useGenerateParaValues();
	const GetStatus = () => {
		if (!param) return "transparent";
		if (
			param.value < param.lower_bound ||
			param.value > param.upper_bound
		) {
			return "#d93333de";
		}
		return "#149914";
	};

	return (
		<>
			<div
				style={{
					position: "relative",
					fontFamily: "Poppins",
					padding: 30,
					margin: 2,
					width: "max-content",
					boxShadow:
						"rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
					borderBottomStyle: "solid",
					borderBottomWidth: "6px",
					borderBottomColor: GetStatus(),
				}}
			>
				<Box
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						width: 24,
						height: 24,
						borderRadius: "50%",
						backgroundColor: color,
					}}
				/>
				<Typography
					fontFamily={"Poppins"}
					variant="h5"
					sx={{ fontWeight: "bold", mb: 1 }}
				>
					{parameter.param_name}
				</Typography>
				<Typography
					fontFamily={"Poppins"}
					variant="body1"
					sx={{ mb: 2 }}
				>
					Normal Range: {param?.lower_bound} - {param?.upper_bound}
				</Typography>
				<Typography
					fontFamily={"Poppins"}
					variant="h4"
					sx={{ fontWeight: "medium" }}
				>
					{param?.value || "N/A"}
				</Typography>
				{param && (
					<Typography
						fontFamily={"Poppins"}
						variant="body2"
						sx={{ color: GetStatus(), mt: 1 }}
					>
						{param.value < param.lower_bound ||
						param.value > param.upper_bound
							? "Out of the normal range"
							: "Within the normal range"}
					</Typography>
				)}
				<HealthCard param={param} />
				<Box mt={6}>
					{!param?.value && <TestValueForm paramID={param.id} />}
				</Box>
			</div>
		</>
	);
};

export default ParameterCard;
