// Login.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	TextField,
	Button,
	CircularProgress,
	Card,
	CardMedia,
	CardContent,
	CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../Slices/userSlice";

const LoginPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const loading = useSelector((state) => state.user.loading);
	const error = useSelector((state) => state.user.error);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = (e) => {
		let userData = {
			username: username,
			password: password,
		};
		console.log(userData);
		dispatch(login(userData)).then((response) => {
			if (response.payload) {
				console.log(response);
				navigate("/home");
			}
		});
	};

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
			}}
		>
			<Card sx={{ maxWidth: 345 }}>
				<CardMedia
					sx={{ height: 170 }}
					image={require("../Assets/logoBar.png")}
					title="green iguana"
				/>
				<CardContent>
					<TextField
						label="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						variant="outlined"
						fullWidth
						sx={{ marginBottom: 2 }}
					/>
					<TextField
						label="Password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						variant="outlined"
						fullWidth
						sx={{ marginBottom: 2 }}
					/>
					{error && <div>{error}</div>}
					<Button
						variant="contained"
						onClick={handleLogin}
						disabled={loading}
					>
						{loading ? <CircularProgress size={24} /> : "Login"}
					</Button>
				</CardContent>
			</Card>
		</div>
	);
};

export default LoginPage;
