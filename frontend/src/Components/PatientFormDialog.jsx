import React, { useState } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
	Button,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { createPatient, getPatients } from "../Slices/patientSlice";

const PatientFormDialog = ({ open, handleClose }) => {
	const dispatch = useDispatch();
	const [form, setForm] = useState({
		name: "",
		dob: "",
		gender: "",
		contact_phone: "",
		email: "",
		address: "",
		age: 0,
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({
			...form,
			[name]: name === "age" ? Number(value) : value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(createPatient(form))
			.unwrap()
			.then((response) => {
				dispatch(getPatients());
			})
			.catch((error) => {
				console.error("Failed to create the patient:", error);
			});
		handleClose();
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Add New Patient</DialogTitle>
			<form onSubmit={handleSubmit}>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						name="name"
						label="Name"
						type="text"
						fullWidth
						variant="outlined"
						onChange={handleChange}
						value={form.name}
					/>
					<TextField
						margin="dense"
						id="dob"
						name="dob"
						label="Date of Birth"
						type="date"
						fullWidth
						variant="outlined"
						InputLabelProps={{
							shrink: true,
						}}
						onChange={handleChange}
						value={form.dob}
					/>
					<TextField
						margin="dense"
						id="gender"
						name="gender"
						label="Gender"
						type="text"
						fullWidth
						variant="outlined"
						onChange={handleChange}
						value={form.gender}
					/>
					<TextField
						margin="dense"
						id="contact_phone"
						name="contact_phone"
						label="Contact Phone"
						type="text"
						fullWidth
						variant="outlined"
						onChange={handleChange}
						value={form.contact_phone}
					/>
					<TextField
						margin="dense"
						id="email"
						name="email"
						label="Email"
						type="email"
						fullWidth
						variant="outlined"
						onChange={handleChange}
						value={form.email}
					/>
					<TextField
						margin="dense"
						id="address"
						name="address"
						label="Address"
						type="text"
						fullWidth
						variant="outlined"
						onChange={handleChange}
						value={form.address}
					/>
					<TextField
						margin="dense"
						id="age"
						name="age"
						label="Age"
						type="number"
						fullWidth
						variant="outlined"
						onChange={handleChange}
						value={form.age}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button type="submit">Submit</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default PatientFormDialog;
