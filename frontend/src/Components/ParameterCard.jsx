import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Typography, Box } from "@mui/material";
import HealthCard from "./HealthCard";
import { getBounds, getValue, setFoundBound } from "../Slices/parameterSlice";

const ParameterCard = ({ parameter }) => {
	const dispatch = useDispatch();
	const testID = useSelector((state) => state.test.selectedID);
	const boundFound = useSelector((state) => state.parameter.boundFound);

	const parameterIDsList = useSelector(
		(state) => state.parameter?.parameterIDsList
	);
	const param = parameterIDsList?.find((param) => param.id === parameter.ID);

	useEffect(() => {
		if (!boundFound && parameterIDsList.length > 0) {
			parameterIDsList?.forEach((param) => {
				dispatch(
					getBounds({
						id: param.id,
						testID: testID,
					})
				);
				dispatch(getValue({ id: param.id, testID: testID }));
			});
			dispatch(setFoundBound(true));
		}
	}, [parameterIDsList, boundFound, dispatch, testID]);

	const GetStatus = () => {
		if (!param) return "transparent";
		if (
			param.value < param.lower_bound ||
			param.value > param.upper_bound
		) {
			return "#ff0000";
		}
		return "#149914";
	};

	return (
		<Paper
			elevation={3}
			sx={{
				position: "relative",
				fontFamily: "Poppins",
				p: 3,
				m: 2,
				width: "max-content",
			}}
		>
			<Box
				sx={{
					position: "absolute",
					right: 8,
					top: 8,
					width: 12,
					height: 12,
					borderRadius: "50%",
					backgroundColor: GetStatus(),
				}}
			/>
			<Typography
				fontFamily={"Poppins"}
				variant="h5"
				sx={{ fontWeight: "bold", mb: 1 }}
			>
				{parameter.param_name}
			</Typography>
			<Typography fontFamily={"Poppins"} variant="body1" sx={{ mb: 2 }}>
				Normal Range: {param?.lower_bound} - {param?.upper_bound}
			</Typography>
			<Typography
				fontFamily={"Poppins"}
				variant="h4"
				sx={{ fontWeight: "medium" }}
			>
				{param?.value}
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
		</Paper>
	);
};

export default ParameterCard;
