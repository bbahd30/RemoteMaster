import React, { useEffect, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getPatients } from "../Slices/patientSlice";

const PatientsTable = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPatients());
	}, []);

	const patients = useSelector((state) => state.patient.patientsList);
	const [searchTerm, setSearchTerm] = useState("");

	const filteredPatients = patients?.filter((patient) =>
		patient.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div>
			<TextField
				label="Search Patients"
				variant="outlined"
				fullWidth
				margin="normal"
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<TableContainer component={Paper}>
				<Table aria-label="simple table" sx={{ fontFamily: "Poppins" }}>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell align="right">Date of Birth</TableCell>
							<TableCell align="right">Gender</TableCell>
							<TableCell align="right">Phone Number</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{filteredPatients?.map((patient) => (
							<TableRow
								key={patient.ID}
								sx={{
									"&:last-child td, &:last-child th": {
										border: 0,
									},
								}}
							>
								<TableCell component="th" scope="row">
									{patient.name}
								</TableCell>
								<TableCell align="right">
									{patient.dob.slice(0, 10)}
								</TableCell>
								<TableCell align="right">
									{patient.gender}
								</TableCell>
								<TableCell align="right">
									{patient.contact_phone}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default PatientsTable;
