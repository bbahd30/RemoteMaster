import React, { useEffect, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import BookingDialogPDF from "./BookingDialogPDF";
import { Button } from "@mui/material";
import html2canvas from "html2canvas";
import useStatusData from "../utils/useStatusData";
import { useSelector } from "react-redux";

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
	const overallStatus = useStatusData();
	const statusData = useSelector((state) => state.parameter.StatusData);
	const parameters = useSelector(
		(state) => state.test.selectedTest.parameters
	);
	const [dataToRender, setDataToRender] = useState([]);

	useEffect(() => {
		const combinedData = statusData?.map((statusItem, index) => {
			const parameterItem = parameters[index];
			return {
				...statusItem,
				param_name: parameterItem.param_name,
			};
		});

		console.log(combinedData);
	}, [statusData]);

	return (
		<Button>
			{dataToRender.length > 0 && bodyImage && paramImg && (
				<PDFDownloadLink
					document={
						<BookingDialogPDF
							patient={patient}
							test={test}
							bodyImage={bodyImage}
							paramImg={paramImg}
							overallStatus={overallStatus}
							statusData={statusData}
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
