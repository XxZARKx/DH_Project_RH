import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getReservations } from "../provider/reservation/getReservations";
import { getAuthUserById } from "../provider/user/getAuthUserById";
import { getUserByEmail } from "../provider/user/getUserByEmail";
import { getVehicleById } from "../provider/vehicle/getVehicleById";

const ReservationHistory = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);

  const {
    data: reservations,
    isLoading: loadingReservations,
    error: reservationError,
  } = useQuery({
    queryKey: ["reservations"],
    queryFn: getReservations,
  });

  // Obtener los nombres y apellidos de los usuarios
  const {
    data: usersData,
    isLoading: loadingUsers,
    error: usersError,
  } = useQuery({
    queryKey: ["usersWithReservations"],
    queryFn: async () => {
      if (!reservations) return [];

      // Obtener datos de cada usuario
      const users = await Promise.all(
        reservations.map(async (reservation) => {
          const user = await getAuthUserById(reservation.usuario_id);
          const userEmailData = await getUserByEmail(
            user?.user?.user_metadata?.email
          );
          return {
            id: reservation.usuario_id,
            nombre: userEmailData?.nombre,
            apellido: userEmailData?.apellido,
          };
        })
      );

      // Eliminar duplicados (usuarios con múltiples reservas)
      const uniqueUsers = Array.from(new Set(users.map((user) => user.id))).map(
        (id) => users.find((user) => user.id === id)
      );

      return uniqueUsers;
    },
    enabled: !!reservations,
  });

  if (loadingReservations || loadingUsers) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-lg text-gray-700">Cargando reservas...</span>
      </div>
    );
  }

  if (reservationError || usersError) {
    return (
      <div className="p-4">
        <p className="text-red-500">
          Error al cargar los datos:{" "}
          {reservationError?.message || usersError?.message}
        </p>
      </div>
    );
  }

  // Agrupar reservas por usuario
  const reservationsByUser = reservations.reduce((acc, reservation) => {
    const userId = reservation.usuario_id;
    if (!acc[userId]) {
      acc[userId] = [];
    }
    acc[userId].push(reservation);
    return acc;
  }, {});

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-blue-600 mb-6">
        Historial de Reservas
      </h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Seleccione un usuario
        </h2>
        <select
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="">Seleccione un usuario</option>
          {usersData?.map((user) => (
            <option key={user.id} value={user.id}>
              {user.nombre} {user.apellido}
            </option>
          ))}
        </select>
      </div>

      {selectedUserId && (
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Reservas de{" "}
            {usersData.find((user) => user.id === selectedUserId)?.nombre}{" "}
            {usersData.find((user) => user.id === selectedUserId)?.apellido}
          </h2>
          <ul className="space-y-4">
            {reservationsByUser[selectedUserId].map((reservation) => (
              <ReservationItem key={reservation.id} reservation={reservation} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const ReservationItem = ({ reservation }) => {
  const {
    data: user,
    isLoading: loadingUser,
    error: userError,
  } = useQuery({
    queryKey: ["user", reservation?.usuario_id],
    queryFn: () => getAuthUserById(reservation?.usuario_id),
    enabled: !!reservation?.usuario_id,
  });

  const {
    data: userEmailData,
    isLoading: loadingUserEmail,
    error: userEmailError,
  } = useQuery({
    queryKey: ["userByEmail", user?.user?.user_metadata?.email],
    queryFn: () => getUserByEmail(user?.user?.user_metadata?.email),
    enabled: !!user?.user?.user_metadata?.email,
  });

  const {
    data: vehicle,
    isLoading: loadingVehicle,
    error: vehicleError,
  } = useQuery({
    queryKey: ["vehicle", reservation.vehiculo_id],
    queryFn: () => getVehicleById(reservation.vehiculo_id),
    enabled: !!reservation.vehiculo_id,
  });

  return (
    <li className="flex flex-col bg-white rounded-lg shadow-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <p className="text-xl font-semibold text-gray-700">
          <strong>Reserva ID:</strong> {reservation.id}
        </p>
        <p className="text-sm text-gray-500">{reservation.fecha_reserva}</p>
      </div>

      <div className="mb-4">
        <strong className="text-gray-600">Vehículo:</strong>
        {loadingVehicle ? (
          <span className="text-gray-500">Cargando...</span>
        ) : vehicleError ? (
          <span className="text-red-500">Error al cargar vehículo</span>
        ) : (
          <p className="text-gray-700">
            {vehicle?.marca}: {vehicle?.modelo}
          </p>
        )}
      </div>

      <div className="mb-4">
        {loadingUser ? (
          <span className="text-gray-500">Cargando...</span>
        ) : userError ? (
          <span className="text-red-500">Error al cargar usuario</span>
        ) : (
          <p className="text-gray-700">{user?.user_metadata?.email}</p>
        )}
      </div>

      {loadingUserEmail ? (
        <div className="flex justify-center items-center">
          <span className="text-gray-500">
            Cargando detalles del usuario...
          </span>
        </div>
      ) : userEmailError ? (
        <p className="text-red-500">Error al cargar detalles del usuario</p>
      ) : (
        userEmailData && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-600">
              <strong>Nombre:</strong>{" "}
              {userEmailData.nombre + " " + userEmailData.apellido}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Email:</strong> {userEmailData.correo}
            </p>
          </div>
        )
      )}
    </li>
  );
};

export default ReservationHistory;
