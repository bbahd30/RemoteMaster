import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box } from "@mui/material";
import HealthCard from "./HealthCard";
import { getBounds, getValue, setFoundBound } from "../Slices/parameterSlice";

const ParameterCard = ({ parameter, color }) => {
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
			return "#d93333de";
		}
		return "#149914";
	};

	return (
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
					width: 12,
					height: 12,
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
		</div>
	);
};

export default ParameterCard;
