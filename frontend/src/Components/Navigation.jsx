import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	AppBar,
	Box,
	Button,
	IconButton,
	Toolbar,
	Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { setUser } from "../Slices/userSlice";
import Sidebar from "./Sidebar";

const getUser = () => {
	let user = localStorage.getItem("user");
	if (user) return JSON.parse(user);
	else return null;
};

const Navigation = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.user);

	useEffect(() => {
		if (!user) dispatch(setUser(getUser()));
	}, [user]);

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
						>
							<SearchIcon />
						</IconButton>
						<Typography
							variant="h6"
							component="div"
							sx={{ flexGrow: 1 }}
						>
							Search
						</Typography>
						<Button color="inherit">{user?.username}</Button>
					</Toolbar>
				</AppBar>
			</Box>
		</>
	);
};

export default Navigation;
