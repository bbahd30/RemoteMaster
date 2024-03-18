import React, { useEffect, useState } from "react";
import HumanSVG from "./HumanSVG";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

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
	const [clickLimit, setClickLimit] = useState(0);
	const paramColors = useSelector((state) => state.parameter.orderColor);
	const [currentClickCount, setCurrentClickCount] = useState(0);

	useEffect(() => {
		if (paramColors?.length > 0) setClickLimit(paramColors.length);
	}, [paramColors]);

	const handleSvgClick = (event) => {
		if (currentClickCount >= clickLimit) return;
		console.log("***");
		const svg = document.getElementById("humanBody");
		if (!svg) return;

		const rect = svg.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		const color = paramColors[currentClickCount];
		const newCircle = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"circle"
		);
		newCircle.setAttribute("cx", x + 8);
		newCircle.setAttribute("cy", y + 2);
		newCircle.setAttribute("r", "3");
		newCircle.setAttribute("fill", color);
		svg.appendChild(newCircle);

		// getting coordinates where the svg is being rendered
		const dom = event.currentTarget.getBoundingClientRect();

		setClicks([...clicks, { x, y, color }]);
		setCurrentClickCount(currentClickCount + 1);
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
		setCurrentClickCount(0);
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
							left: `${click.x}px`,
							top: `${click.y}px`,
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
				<div
					style={{
						paddingTop: 8,
						display: "flex",
						justifyContent: "center",
					}}
				>
					<Button onClick={handleReset}>Reset</Button>
				</div>
			</div>
		</>
	);
};

export default HumanBodySVG;
