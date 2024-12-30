import React from "react";
import Header from "./Header";
import Banner from "./Banner";
import { listaAutos } from "../utils/dummyData";
import CardAuto from "./CardAuto";
import CarrouselColabs from "./CarrouselColabs";
import CustomizedAccordions from "./PreguntasAcordeon";
import Footer from "./Footer";

const Home = () => {
	return (
		<div className="min-h-screen max-w-screen ">
			<div className="max-h-screen h-full overflow-hidden">
				<Header />
				<Banner />
			</div>
			<section className="py-10 text-xl font-bold">
				<h2 className="text-center pb-10">
					RESERVA AUTOS A LOS MEJORES PRECIOS
				</h2>
				<div className="flex flex-wrap justify-center max-w-1280 mx-auto gap-8">
					{listaAutos.map((auto) => {
						return <CardAuto key={auto.id} auto={auto} />;
					})}
				</div>
			</section>
			<section>
				<h2 className="text-center pt-20 font-bold text-xl">
					NUESTROS ALIADOS
				</h2>
				<CarrouselColabs />
			</section>
			<section>
				<h2 className="text-center pt-10 font-bold text-xl">
					PREGUNTAS FRECUENTES
				</h2>
				<div className="max-w-[80%] mx-auto py-10">
					<CustomizedAccordions />
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default Home;
