import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { getVehicles } from "../provider/vehicle/getVehicles";

const VehiculosDisponibles = () => {
	const [vehicles, setVehicles] = useState([]);
	const [isLoading, setIsLoading] = useState(true); // Estado para el cargando

	// Usar useEffect para cargar los vehículos cuando el componente se monte
	useEffect(() => {
		const fetchVehicles = async () => {
			setIsLoading(true); // Activar cargando
			const vehicleData = await getVehicles();
			setVehicles(vehicleData); // Establecer los vehículos en el estado
			setIsLoading(false); // Desactivar cargando
		};

		fetchVehicles(); // Llamar la función para obtener los vehículos
	}, []);

	// Mostrar un mensaje mientras se cargan los vehículos
	if (isLoading) {
		return <div>Cargando vehículos...</div>;
	}

	return (
		<div>
			<Header />
			<div className="min-h-screen bg-[#E4E4E4] flex items-center justify-center py-10">
				<div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
					<h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
						Vehículos Disponibles
					</h2>
					<ul className="space-y-4">
						{vehicles.length > 0 ? (
							vehicles.map((vehicle) => (
								<li key={vehicle.id} className="border-b border-gray-300 py-4">
									<div className="font-semibold">
										{vehicle.marca} {vehicle.modelo}
									</div>
									<div>Placa: {vehicle.placa}</div>
									<div>Estado: {vehicle.estado}</div>
									<div>Precio: ${vehicle.precio}</div>
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
