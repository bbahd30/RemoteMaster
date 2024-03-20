import React from "react";
import {
	Page,
	Text,
	View,
	Document,
	StyleSheet,
	Image,
	Font,
} from "@react-pdf/renderer";

import smartLogo from "../Assets/smartlogo.png";
import redcliffLogo from "../Assets/redclifflogo.png";
import PoppinsSemiBold from "../fonts/Poppins-SemiBold.ttf";
import PoppinsRegular from "../fonts/Poppins-Regular.ttf";

Font.register({
	family: "Poppins",
	fonts: [
		{ src: PoppinsRegular },
		{ src: PoppinsSemiBold, fontWeight: "semibold" },
	],
});

const styles = StyleSheet.create({
	body: {
		fontFamily: "Poppins",
	},
	semibold: {
		fontWeight: "semibold",
	},
	page: {
		flexDirection: "column",
		backgroundColor: "white",
		padding: 10,
	},
	coverPage: {
		position: "relative",
		flexGrow: 1,
		backgroundColor: "#232667",
	},
	content: {
		justifyContent: "center",
		alignItems: "center",
		textAlign: "center",
	},
	logo: {
		marginTop: 0,
		marginRight: -20,
	},
	smartLogo: {
		width: "100%",
		marginTop: 30,
		marginBottom: 30,
	},
	bodyImage: {
		maxwidth: "100%",
		maxHeight: 600,
		alignSelf: "center",
		paddingLeft: 40,
	},
	paramImg: {
		maxwidth: "100%",
		maxHeight: 600,
		alignSelf: "center",
		paddingLeft: 30,
		paddingTop: 20,
	},
	section: {
		margin: 10,
		padding: 10,
	},
	title: {
		fontSize: 24,
		textAlign: "center",
		color: "#fff",
		marginBottom: 20,
	},
	subtitle: {
		fontSize: 26,
		margin: 80,
		textAlign: "center",
		fontFamily: "Poppins",
		color: "#fff",
	},
	text: {
		fontSize: 20,
		color: "#fff",
		fontFamily: "Poppins",
	},
	data: {
		fontSize: 18,
		color: "#232667",
		fontFamily: "Poppins",
	},
	overlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	patient: {
		bottom: 0,
		textAlign: "center",
	},
	patientDetails: {
		fontSize: 12,
		color: "#232667",
		marginBottom: 5,
		fontFamily: "Poppins",
	},
	patientSection: {
		padding: 10,
		paddingBottom: 5,
		marginBottom: 20,
	},
	box: {
		marginBottom: 10,
		borderWidth: 1,
		borderColor: "#E8E8E8",
		backgroundColor: "#F7F7F7",
		padding: 10,
		borderRadius: 5,
	},
	boxHeading: {
		fontSize: 18,
		color: "#232667",
		fontFamily: "Poppins",
		fontWeight: "semibold",
		marginBottom: 5,
	},
	boxContent: {
		fontSize: 16,
		color: "#232667",
		fontFamily: "Poppins",
		marginBottom: 3,
	},
	highlightText: {
		color: "#D64550",
	},
	bulletPoint: {
		fontSize: 16,
		color: "#232667",
		fontFamily: "Poppins",
		marginTop: 3,
		marginBottom: 3,
	},
});

const BookingDialogPDF = ({
	patient,
	test,
	bodyImage,
	paramImg,
	overallStatus,
	statusData,
}) => {
	return (
		<Document>
			<Page size="A4" style={styles.coverPage}>
				<Image src={redcliffLogo} style={styles.logo} />{" "}
				<View style={styles.content}>
					<Image src={smartLogo} style={styles.smartLogo} />
					<Text style={styles.subtitle}>
						An Insightful Health Analytics Report for Easier
						Understanding
					</Text>
				</View>
				<Text style={[styles.text, styles.patient]}>Prepared For</Text>
				<Text style={[styles.text, styles.patient, { fontSize: 26 }]}>
					{patient?.name || "N/A"}
				</Text>
			</Page>
			<Page size="A4" style={styles.page}>
				<View style={styles.patientSection}>
					<Text style={styles.semibold}>Patient Details:</Text>
					<Text style={styles.patientDetails}>
						Name: {patient?.name || "N/A"}
					</Text>
					<Text style={styles.patientDetails}>
						Age: {patient?.age || "N/A"}
					</Text>
					<Text style={styles.patientDetails}>
						Gender: {patient?.gender || "N/A"}
					</Text>
					<Text style={styles.patientDetails}>
						Contact: {patient?.contact_phone || "N/A"}
					</Text>
					<Text style={styles.patientDetails}>
						Email: {patient?.email || "N/A"}
					</Text>
					<Text style={styles.patientDetails}>
						Address: {patient?.address || "N/A"}
					</Text>
				</View>
				<Text style={styles.data}>
					Test: {test?.test_name || "N/A"}
				</Text>
				<Image src={bodyImage} style={styles.bodyImage} />
			</Page>
			<Page size="A4" style={styles.page}>
				<Image src={paramImg} style={styles.paramImg} />
				<View style={styles.section}>
					{statusData.map((param, index) => (
						<View key={index} style={{ marginBottom: 10 }}>
							<Text
								style={[
									styles.data,
									{ fontWeight: "semibold" },
								]}
							>
								{param.param_name}:
							</Text>
							{param.normal_text && (
								<Text style={styles.data}>
									{param.normal_text}
								</Text>
							)}
							{param.lower_reasons && (
								<View style={styles.box}>
									<Text style={styles.boxHeading}>
										Reasons
									</Text>
									<Text
										style={[
											styles.boxContent,
											styles.highlightText,
										]}
									>
										{param.lower_text}
									</Text>
									{param.lower_reasons
										.split(",")
										.map((reason, idx) => (
											<Text
												key={idx}
												style={styles.bulletPoint}
											>
												• {reason.trim()}
											</Text>
										))}
								</View>
							)}
							{param.upper_reasons && (
								<View style={styles.box}>
									<Text style={styles.boxHeading}>
										Reasons
									</Text>
									<Text
										style={[
											styles.boxContent,
											styles.highlightText,
										]}
									>
										{param.upper_text}
									</Text>
									{param.upper_reasons
										.split(",")
										.map((reason, idx) => (
											<Text
												key={idx}
												style={styles.bulletPoint}
											>
												• {reason.trim()}
											</Text>
										))}
								</View>
							)}
						</View>
					))}
					<Text style={styles.data}>
						{overallStatus === "All parameters within range"
							? `Dear ${
									patient?.name || "Patient"
							  }, we're pleased to see your results are within a healthy range. Keep up the good work and continue your current lifestyle.`
							: `Dear ${
									patient?.name || "Patient"
							  }, some of your levels are outside the typical range, which could be due to various factors. We recommend scheduling a follow-up consultation to discuss your personalized health plan.`}
					</Text>
				</View>
			</Page>
		</Document>
	);
};

export default BookingDialogPDF;
