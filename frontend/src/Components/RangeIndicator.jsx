import React from "react";
import { Box, Typography, Tooltip, Paper } from "@mui/material";

const RangeIndicator = ({ param }) => {
	const value = param.value;
	const lowThreshold = param.lower_bound;
	const highThreshold = param.upper_bound;
	const lowColor = "#FFCDD2";
	const normalColor = "#C8E6C9";
	const highColor = "#FFE082";

	const getMarkerLeftPosition = (value, low, high) => {
		const sectionRatio = 1 / 3;
		const greenSectionWidthAsPercentage = 100 * sectionRatio;

		if (value < low) {
			return `16.65%`;
		} else if (value > high) {
			return `83.325%`;
		} else {
			const scale = (value - low) / (high - low);
			const offsetForRedSection = greenSectionWidthAsPercentage;
			return `${
				offsetForRedSection + scale * greenSectionWidthAsPercentage
			}%`;
		}
	};

	const markerWidth = 20;
	const markerLeftPosition = getMarkerLeftPosition(
		value,
		lowThreshold,
		highThreshold,
		markerWidth
	);

	return (
		<Box sx={{ minWidth: 500 }}>
			<Box
				sx={{
					position: "relative",
					height: 25,
					mt: 1,
					mb: 1,
					overflow: "hidden",
				}}
			>
				<Box sx={{ display: "flex", height: "100%" }}>
					<Box sx={{ flex: 1, bgcolor: lowColor }} />
					<Box sx={{ flex: 1, bgcolor: normalColor }} />
					<Box sx={{ flex: 1, bgcolor: highColor }} />
				</Box>
				<Tooltip title={`You: ${value}`} placement="top" arrow>
					<Box
						sx={{
							position: "absolute",
							left: markerLeftPosition,
							top: 15,
							width: 0,
							height: 0,
							borderLeft: `${
								markerWidth / 2
							}px solid transparent`,
							borderRight: `${
								markerWidth / 2
							}px solid transparent`,
							borderBottom: `${markerWidth}px solid black`,
						}}
					/>
				</Tooltip>
			</Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-around",
					color: "text.secondary",
				}}
			>
				<Typography variant="body2">&lt; {lowThreshold}</Typography>
				<Typography variant="body2">
					{lowThreshold} - {highThreshold}
				</Typography>
				<Typography variant="body2">&gt; {highThreshold}</Typography>
			</Box>
		</Box>
	);
};

export default RangeIndicator;
