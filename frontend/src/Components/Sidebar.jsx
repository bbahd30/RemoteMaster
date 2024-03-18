import React from "react";
import {
	Box,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import ColorizeIcon from "@mui/icons-material/Colorize";
import GroupIcon from "@mui/icons-material/Group";
import ScienceIcon from "@mui/icons-material/Science";

const links = [
	{ path: `/parameters`, label: "Parameters", icon: <ColorizeIcon /> },
	{ path: `/tests`, label: "Tests", icon: <ScienceIcon /> },
	{ path: `/bookings`, label: "Bookings", icon: <AddToQueueIcon /> },
	{ path: `/patients`, label: "Patients", icon: <GroupIcon /> },
];

const ListComponent = ({ toggleDrawer }) => (
	<Box sx={{ width: "100%" }}>
		<List>
			{links.map((link, index) => (
				<React.Fragment key={index}>
					<ListItem button component={Link} to={link.path}>
						<ListItemIcon>{link.icon}</ListItemIcon>
						<ListItemText primary={link.label} />
					</ListItem>
					{index !== links.length - 1 && <Divider />}
				</React.Fragment>
			))}
		</List>
	</Box>
);

const Sidebar = () => {
	return (
		<div>
			<Drawer
				variant="permanent"
				sx={{
					// display: { xs: "none", sm: "block" },
					"& .MuiDrawer-paper": {
						boxSizing: "border-box",
						width: 280,
					},
				}}
				open
			>
				<Box sx={{ height: "100vh", px: 2 }}>
					<h1>ReportMaster</h1>
					<ListComponent />
				</Box>
			</Drawer>
		</div>
	);
};

export default Sidebar;
