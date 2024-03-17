import React, { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import BookingDialogPDF from "./BookingDialogPDF";
import { Button } from "@mui/material";

const PDFDownloadBtn = ({ patient, test, image }) => {
	return (
		<Button
			sx={{ color: "white", borderColor: "white" }}
			variant="outlined"
		>
			{image ? (
				<PDFDownloadLink
					document={
						<BookingDialogPDF
							patient={patient}
							test={test}
							image={image}
						/>
					}
					fileName="booking-dialog.pdf"
				>
					{({ blob, url, loading, error }) =>
						loading ? "Loading document..." : "Download PDF"
					}
				</PDFDownloadLink>
			) : (
				"Preparing Image..."
			)}
		</Button>
	);
};

export default PDFDownloadBtn;
