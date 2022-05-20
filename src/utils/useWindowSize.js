import { useState, useEffect } from "react";

const useWindowSize = () => {
	const [size, setSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEffect(() => {
		const handleSizeChange = () => {
			setSize({ width: window.innerWidth, height: window.innerHeight });
		};
		window.addEventListener("resize", handleSizeChange);
		handleSizeChange();

		return () => {
			window.removeEventListener("resize", handleSizeChange);
		};
	}, []);
	return size;
};

export default useWindowSize;
