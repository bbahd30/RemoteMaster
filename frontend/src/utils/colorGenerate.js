const distinctColors = [
	"#ff0000",
	"#b00000",
	"#870000",
	"#550000",
	"#e4e400",
	"#baba00",
	"#878700",
	"#545400",
	"#00ff00",
	"#00b000",
	"#008700",
	"#005500",
	"#00ffff",
	"#00b0b0",
	"#008787",
	"#005555",
	"#b0b0ff",
	"#8484ff",
	"#4949ff",
	"#0000ff",
	"#ff00ff",
	"#b000b0",
	"#870087",
	"#550055",
	"#bababa",
	"#878787",
	"#545454",
];

const generateRandomColor = () => {
	return distinctColors[Math.floor(Math.random() * distinctColors.length)];
};

export default generateRandomColor;
