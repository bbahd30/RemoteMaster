function svgToDataURL(svgElement) {
	const scaleFactor = 7;
	return new Promise((resolve, reject) => {
		try {
			const serializer = new XMLSerializer();
			let source = serializer.serializeToString(svgElement);

			if (
				!source.match(
					/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/
				)
			) {
				source = source.replace(
					/^<svg/,
					'<svg xmlns="http://www.w3.org/2000/svg"'
				);
			}
			if (
				!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)
			) {
				source = source.replace(
					/^<svg/,
					'<svg xmlns:xlink="http://www.w3.org/1999/xlink"'
				);
			}

			const blob = new Blob([source], {
				type: "image/svg+xml;charset=utf-8",
			});

			const url = URL.createObjectURL(blob);

			const img = new Image();
			img.onload = () => {
				const canvas = document.createElement("canvas");
				canvas.width = img.width * scaleFactor;
				canvas.height = img.height * scaleFactor;
				const ctx = canvas.getContext("2d");

				ctx.scale(6, 6);

				ctx.drawImage(img, 0, 0);

				const pngDataUrl = canvas.toDataURL("image/png");

				resolve(pngDataUrl);
				URL.revokeObjectURL(url);
			};
			img.onerror = (e) => {
				reject(e);
			};
			img.src = url;
		} catch (error) {
			reject(error);
		}
	});
}

export default svgToDataURL;
