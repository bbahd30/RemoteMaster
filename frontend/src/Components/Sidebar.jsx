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

import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import DashboardIcon from "@mui/icons-material/Dashboard";

const links = [
	{ path: `/home`, label: "Dashboard", icon: <DashboardIcon /> },
	{ path: `/tests`, label: "Tests", icon: <BloodtypeIcon /> },
	{ path: `/bookings`, label: "Bookings", icon: <AddToQueueIcon /> },
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
