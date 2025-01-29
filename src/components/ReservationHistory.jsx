import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getReservations } from "../provider/reservation/getReservations";
import { getAuthUserById } from "../provider/user/getAuthUserById";
import { getUserByEmail } from "../provider/user/getUserByEmail"; // Importar la función para buscar por correo
import { getVehicleById } from "../provider/vehicle/getVehicleById";

const ReservationHistory = () => {
	// Obtener las reservas
	const {
		data: reservations,
		isLoading: loadingReservations,
		error: reservationError,
	} = useQuery({
		queryKey: ["reservations"],
		queryFn: getReservations,
	});

	if (loadingReservations) {
		return <p>Cargando reservas...</p>;
	}

	if (reservationError) {
		console.error("Error al cargar las reservas:", reservationError.message);
		return <p>Error al cargar las reservas: {reservationError.message}</p>;
	}

	// Agrupar reservas por correo del usuario
	const groupedReservations = reservations.reduce((acc, reservation) => {
		const email = reservation.user?.user_metadata?.email; // Usamos el email para agrupar
		if (!acc[email]) {
			acc[email] = [];
		}
		acc[email].push(reservation);
		return acc;
	}, {});

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Historial de Reservas</h1>
			{Object.keys(groupedReservations).length === 0 ? (
				<p>No hay reservas disponibles.</p>
			) : (
				<ul>
					{Object.keys(groupedReservations).map((email) => (
						<ReservationUser
							key={email}
							email={email}
							reservations={groupedReservations[email]}
						/>
					))}
				</ul>
			)}
		</div>
	);
};

const ReservationUser = ({ email, reservations }) => {
	// Obtener datos del usuario por su correo electrónico
	const {
		data: user,
		isLoading: loadingUser,
		error: userError,
	} = useQuery({
		queryKey: ["userByEmail", email],
		queryFn: () => getUserByEmail(email),
		enabled: !!email, // Solo ejecuta si el email existe
	});

	// Log para verificar datos del usuario
	// console.log(`Usuario para el correo ${email}:`, user);

	if (userError) {
		console.error(
			`Error al cargar el usuario para ${email}:`,
			userError.message
		);
	}

	return (
		<li className="mb-4 border-b pb-4">
			{/* Información del usuario */}
			<div className="mb-4">
				<h3 className="text-xl font-semibold text-gray-800">
					Usuario: {loadingUser ? "Cargando..." : user?.nombre || email}
				</h3>
				<p className="text-gray-600">Correo: {email}</p>
			</div>

			{/* Mostrar las reservas del usuario */}
			{reservations.map((reservation) => (
				<ReservationItem key={reservation.id} reservation={reservation} />
			))}
		</li>
	);
};

const ReservationItem = ({ reservation }) => {
	// Obtener datos del vehículo por su ID
	const {
		data: vehicle,
		isLoading: loadingVehicle,
		error: vehicleError,
	} = useQuery({
		queryKey: ["vehicle", reservation.vehiculo_id],
		queryFn: () => getVehicleById(reservation.vehiculo_id),
		enabled: !!reservation.vehiculo_id, // Solo ejecuta si existe el ID del vehículo
	});

	if (vehicleError) {
		console.error(
			`Error al cargar el vehículo para reserva ${reservation.id}:`,
			vehicleError.message
		);
	}

	return (
		<div className="p-4 border rounded-md bg-white shadow-md mb-4">
			<p className="font-semibold">Reserva ID: {reservation.id}</p>
			<p>
				<strong>Vehículo:</strong>{" "}
				{loadingVehicle
					? "Cargando..."
					: vehicleError
					? "Error al cargar vehículo"
					: vehicle?.marca + ": " + vehicle?.modelo}
			</p>
			<p>
				<strong>Fecha:</strong> {reservation.fecha_reserva}
			</p>
		</div>
	);
};

export default ReservationHistory;
