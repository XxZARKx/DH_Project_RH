import React from "react";
import Slider from "react-slick";
import socioImage from "@assets/socios.svg";

function CarrouselColabs() {
	const settings = {
		dots: false,
		infinite: true,
		speed: 1000,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 4500,
		arrows: true,
		pauseOnHover: true,
	};

	return (
		<div className="pX-[50px] mx-auto max-w-[500px]">
			<Slider {...settings}>
				<div>
					<img className="h-full" src={socioImage} alt="Socio" />
				</div>
				<div>
					<img className="h-full" src={socioImage} alt="Socio" />
				</div>
			</Slider>
		</div>
	);
}

export default CarrouselColabs;
