import React from "react";
import { Typography, Box, Divider } from "@mui/material";
import RangeIndicator from "./RangeIndicator";

const HealthCard = ({ param }) => {
	const indicatorColor =
		param.value < param.lower_bound
			? "error.main"
			: param.value > param.upper_bound
			? "warning.main"
			: "success.main";

	const indicatorStyle = {
		borderRadius: "70%",
		width: 14,
		height: 14,
		bgcolor: indicatorColor,
		display: "inline-block",
	};
	return (
		<>
			<Box
				sx={{
					pt: 4,
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						width: "100%",
						justifyContent: "space-between",
					}}
				>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Box
							sx={{ ...indicatorStyle, bgcolor: "warning.main" }}
						/>
						<Typography
							fontFamily={"Poppins"}
							variant="body2"
							sx={{
								ml: 0.5,
								fontWeight:
									param.value < param.lower_bound
										? "bold"
										: "normal",
							}}
						>
							Low (L)
						</Typography>
					</Box>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Box
							sx={{ ...indicatorStyle, bgcolor: "success.main" }}
						/>
						<Typography
							fontFamily={"Poppins"}
							variant="body2"
							sx={{
								ml: 0.5,
								fontWeight:
									param.value > param.lower_bound &&
									param.value < param.upper_bound
										? "bold"
										: "normal",
							}}
						>
							Normal (N)
						</Typography>
					</Box>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Box
							sx={{ ...indicatorStyle, bgcolor: "error.main" }}
						/>
						<Typography
							fontFamily={"Poppins"}
							variant="body2"
							sx={{
								ml: 0.5,
								fontWeight:
									param.value > param.upper_bound
										? "bold"
										: "normal",
							}}
						>
							High (H)
						</Typography>
					</Box>
				</Box>
			</Box>

			<Divider sx={{ my: 2 }} />

			<Typography variant="body1" color="text.secondary">
				{param.description}
			</Typography>
			<RangeIndicator param={param} />
		</>
	);
};

export default HealthCard;
