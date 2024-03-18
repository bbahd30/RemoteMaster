import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import PatientFormDialog from "../Components/PatientFormDialog";
import PatientsTable from "../Components/PatientTable";

const PatientPage = () => {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<>
			<Box sx={{ display: "flex", justifyContent: "space-between" }}>
				<div>Patients</div>
				<Button variant="outlined" onClick={handleClickOpen}>
					Add Patient
				</Button>
				<PatientFormDialog open={open} handleClose={handleClose} />
			</Box>
			<PatientsTable />
		</>
	);
};

export default PatientPage;
