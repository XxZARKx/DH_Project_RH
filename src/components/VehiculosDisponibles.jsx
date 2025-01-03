import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { getVehicles } from "../provider/vehicle/getVehicles";
import CardAuto from "./CardAuto";

const VehiculosDisponibles = () => {
	const [vehicles, setVehicles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchVehicles = async () => {
			setIsLoading(true);
			const vehicleData = await getVehicles();
			setVehicles(vehicleData);
			setIsLoading(false);
		};

		fetchVehicles();
	}, []);

	if (isLoading) {
		return <div>Cargando vehículos...</div>;
	}

	return (
		<div>
			<Header />
			<div className="min-h-screen flex items-center justify-center py-10 w-[80%] mx-auto px-10">
				<div className="bg-white shadow-lg rounded-lg p-8 w-full flex items-center justify-center flex-col">
					<h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
						Vehículos Disponibles
					</h2>
					<ul className="flex flex-wrap justify-center gap-10 w-full">
						{vehicles.length > 0 ? (
							vehicles.map((vehicle) => (
								<li className="w-full sm:w-[48%] lg:w-[30%] max-w-[300px] flex-grow-0 flex-shrink-0">
									<CardAuto vehicle={vehicle} />
								</li>
							))
						) : (
							<li>No hay vehículos disponibles.</li>
						)}
					</ul>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default VehiculosDisponibles;
