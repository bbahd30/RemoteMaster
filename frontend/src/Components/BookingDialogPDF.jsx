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
		paddingLeft: 45,
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
});

const BookingDialogPDF = ({ patient, test, bodyImage, paramImg }) => (
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
			<Text
				style={{
					fontFamily: "Poppins",
					fontSize: 20,
					color: "#232667",
				}}
			>
				Body Parts and the concerned Parameter
			</Text>
			<Image src={bodyImage} style={styles.bodyImage} />
			<Image src={paramImg} style={styles.bodyImage} />
		</Page>
	</Document>
);

export default BookingDialogPDF;
