import React from "react";
import bgImage from "@assets/banner.jpg";

const Banner = () => {
	return (
		<div className="w-full h-[30vh] sm:h-[50vh] md:h-[60vh] lg:h-[100vh] relative">
			<img
				src={bgImage}
				alt="Banner"
				className="absolute top-0 left-0 w-full h-auto object-fill"
			/>
		</div>
	);
};

export default Banner;
