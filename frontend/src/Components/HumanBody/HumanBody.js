import React, { useEffect, useState } from "react";
import HumanSVG from "./HumanSVG";
import { Button } from "@mui/material";

const usedColors = new Set();

const generateRandomColor = () => {
	let color = "";
	do {
		const r = Math.floor(Math.random() * 128);
		const g = Math.floor(Math.random() * 128);
		const b = Math.floor(Math.random() * 128);
		color = `#${r.toString(16).padStart(2, "0")}${g
			.toString(16)
			.padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
	} while (usedColors.has(color));
	usedColors.add(color);
	return color;
};

const HumanBodySVG = () => {
	const [clicks, setClicks] = useState([]);

	const handleSvgClick = (event) => {
		const svg = document.getElementById("humanBody");
		if (!svg) return;

		const rect = svg.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		const color = generateRandomColor();

		const newCircle = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"circle"
		);
		newCircle.setAttribute("cx", x);
		newCircle.setAttribute("cy", y);
		newCircle.setAttribute("r", "3");
		newCircle.setAttribute("fill", color);
		svg.appendChild(newCircle);

		// getting coordinates where the svg is being rendered
		const dom = event.currentTarget.getBoundingClientRect();
		const domx = event.clientX - dom.left;
		const domy = event.clientY - dom.top;

		setClicks([...clicks, { x, y, color }]);
	};

	const handleReset = () => {
		const svg = document.getElementById("humanBody");
		if (svg) {
			const circles = svg.querySelectorAll("circle");
			circles.forEach((circle) => {
				svg.removeChild(circle);
			});
		}

		setClicks([]);
	};

	const circleRadius = 5;
	return (
		<>
			<div style={{ position: "relative", width: "max-content" }}>
				<HumanSVG onClickFunction={handleSvgClick} />
				{clicks.map((click, index) => (
					<svg
						key={index}
						style={{
							zIndex: 1000,
							position: "absolute",
							left: `${click.x - circleRadius}px`,
							top: `${click.y - circleRadius}px`,
							overflow: "visible",
						}}
						xmlns="http://www.w3.org/2000/svg"
						width={circleRadius * 2}
						height={circleRadius * 2}
					>
						<circle
							cx={circleRadius}
							cy={circleRadius}
							r={circleRadius}
							fill={click.color}
						/>
					</svg>
				))}
			</div>
			<div
				style={{
					paddingTop: 8,
					display: "flex",
					justifyContent: "center",
				}}
			>
				<Button onClick={handleReset}>Reset</Button>
			</div>
		</>
	);
};

export default HumanBodySVG;
