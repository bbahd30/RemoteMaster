import React, { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import BookingDialogPDF from "./BookingDialogPDF";
import { Button } from "@mui/material";
import html2canvas from "html2canvas";

const linkStyle = {
	textDecoration: "none",
	color: "white",
};

const getParam = async (ref) => {
	const canvas = await html2canvas(ref.current);
	const image = canvas.toDataURL("image/png");
	return image;
};

const PDFDownloadBtn = ({ patient, test, bodyImage, paramRef }) => {
	const [paramImg, setParamImg] = useState(null);

	useEffect(() => {
		if (bodyImage) {
			getParam(paramRef).then((data) => {
				setParamImg(data);
			});
		}
	}, [bodyImage]);

	return (
		<Button>
			{bodyImage && paramImg && (
				<PDFDownloadLink
					document={
						<BookingDialogPDF
							patient={patient}
							test={test}
							bodyImage={bodyImage}
							paramImg={paramImg}
						/>
					}
					fileName="booking-dialog.pdf"
					style={linkStyle}
					onClick={() => {
						window.location.reload();
					}}
				>
					{({ blob, url, loading, error }) =>
						loading ? "Loading document..." : "Download PDF"
					}
				</PDFDownloadLink>
			)}
		</Button>
	);
};

export default PDFDownloadBtn;
