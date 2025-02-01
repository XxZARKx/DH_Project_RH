import React from "react";
import { Link, useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import PanelVehicles from "./PanelVehicles";
import PanelUsers from "./PanelUsers";
import PanelReservations from "./PanelReservation";
import IngresosDiarios from "./IngresosDiarios";
import PopularVehicleBrands from "./PanelTopVehicles";
import ReservationHistory from "./ReservationHistory";
import VehicleAvailabilityReport from "./DisponibilidadVehiculo";

const PanelAdmin = () => {
	const { pestania } = useParams();

	let panelContent;

	switch (pestania) {
		case "vehiculos":
			panelContent = <PanelVehicles />;
			break;
		case "usuarios":
			panelContent = <PanelUsers />;
			break;
		case "ingresos":
			panelContent = <IngresosDiarios />;
			break;
		case "top":
			panelContent = <PopularVehicleBrands />;
			break;
		case "reservationHistory":
			panelContent = <ReservationHistory />;
			break;
		case "ingresoVehiculo":
			panelContent = <VehicleAvailabilityReport />;
			break;
		default:
			panelContent = (
				<div className="text-center text-xl text-red-600">
					Panel no encontrado
				</div>
			);
			break;
	}

	return (
		<div>
			<Header />
			<div className="flex">
				<aside className="w-1/5 bg-gray-800 text-white p-6 space-y-6 shadow-md min-h-screen">
					<h2 className="text-2xl font-bold text-center">Panel Admin</h2>
					<ul className="space-y-4 text-lg">
						<li>
							<Link
								to="/admin/panel/usuarios"
								className="hover:bg-gray-700 p-2 rounded block">
								Lista de Usuarios
							</Link>
						</li>
						<li>
							<Link
								to="/admin/panel/vehiculos"
								className="hover:bg-gray-700 p-2 rounded block">
								Autos Disponibles
							</Link>
						</li>

						<li>
							<Link
								to="/admin/panel/ingresos"
								className="hover:bg-gray-700 p-2 rounded block">
								Ingresos
							</Link>
						</li>
						<li>
							<Link
								to="/admin/panel/top"
								className="hover:bg-gray-700 p-2 rounded block">
								Vehiculos Populares
							</Link>
						</li>
						<li>
							<Link
								to="/admin/panel/reservationHistory"
								className="hover:bg-gray-700 p-2 rounded block">
								Historial de reservas
							</Link>
						</li>
						<li>
							<Link
								to="/admin/panel/ingresoVehiculo"
								className="hover:bg-gray-700 p-2 rounded block">
								Ingreso Por Vehiculo
							</Link>
						</li>
					</ul>
				</aside>
				<main className="w-4/5 p-6">{panelContent}</main>
			</div>
			<Footer />
		</div>
	);
};

export default PanelAdmin;
