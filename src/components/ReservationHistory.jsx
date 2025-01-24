import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getReservations } from "../provider/reservation/getReservations";
import { getAuthUserById } from "../provider/user/getAuthUserById";
import { getVehicleById } from "../provider/vehicle/getVehicleById";

const ReservationHistory = () => {
  // const queryClient = useQueryClient();
  // const { data: reservations = [], isLoading: isReservationsLoading } =
  //   useQuery({
  //     queryKey: ["reservations"],
  //     queryFn: getReservations,
  //     staleTime: 1000 * 60 * 60, // 1 hora de datos frescos
  //     gcTime: 1000 * 60 * 60 * 24, // Mantener en caché durante 24 horas
  //     refetchOnWindowFocus: false, // Desactivar la recarga al volver a la ventana
  //   });
  // // Fetch user details for each reservation
  // const { data: userDetails = {}, isLoading: isUserLoading } = useQuery({
  //   queryKey: ["reservationUsers", reservations],
  //   queryFn: async () => {
  //     const userPromises = reservations.map((reservation) =>
  //       getAuthUserById(reservation.usuario_id)
  //     );
  //     const users = await Promise.all(userPromises);
  //     return users.reduce((acc, user, index) => {
  //       acc[reservations[index].id] = user;
  //       return acc;
  //     }, {});
  //   },
  //   enabled: reservations.length > 0,
  //   staleTime: Infinity,
  //   gcTime: 1000 * 60 * 60,
  // });
  // // Fetch vehicle details for each reservation
  // const { data: vehicleDetails = {}, isLoading: isVehicleLoading } = useQuery({
  //   queryKey: ["reservationVehicles", reservations],
  //   queryFn: async () => {
  //     const vehiclePromises = reservations.map((reservation) =>
  //       getVehicleById(reservation.vehiculo_id)
  //     );
  //     const vehicles = await Promise.all(vehiclePromises);
  //     return vehicles.reduce((acc, vehicle, index) => {
  //       acc[reservations[index].id] = vehicle;
  //       return acc;
  //     }, {});
  //   },
  //   enabled: reservations.length > 0,
  //   staleTime: Infinity,
  //   gcTime: 1000 * 60 * 60,
  // });
  // // Combined loading state
  // const isLoading = isReservationsLoading || isUserLoading || isVehicleLoading;
  // if (isLoading) {
  //   return (
  //     <div className="flex min-h-screen bg-gray-100 items-center justify-center">
  //       <div className="text-gray-700">Cargando...</div>
  //     </div>
  //   );
  // }
  // return (
  //   <div className="flex min-h-screen bg-gray-100">
  //     <main className="flex-1 p-6">
  //       <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
  //         Historial de Reservas
  //       </h2>
  //       <table className="min-w-full bg-white shadow-sm rounded-lg">
  //         <thead className="bg-gray-200">
  //           <tr>
  //             <th className="p-4 text-left text-gray-700">ID Reserva</th>
  //             <th className="p-4 text-left text-gray-700">Usuario</th>
  //             <th className="p-4 text-left text-gray-700">Vehículo</th>
  //             <th className="p-4 text-left text-gray-700">Días</th>
  //             <th className="p-4 text-left text-gray-700">Total</th>
  //             <th className="p-4 text-left text-gray-700">Fecha de Reserva</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {reservations.length ? (
  //             reservations.map((reservation) => (
  //               <tr key={reservation.id} className="border-t hover:bg-gray-50">
  //                 <td className="p-4 text-gray-700">{reservation.id}</td>
  //                 <td className="p-4 text-gray-700">
  //                   {userDetails[reservation.id]?.nombre ||
  //                     "Usuario no encontrado"}
  //                 </td>
  //                 <td className="p-4 text-gray-700">
  //                   {vehicleDetails[reservation.id]?.marca ||
  //                     "Vehículo no encontrado"}
  //                 </td>
  //                 <td className="p-4 text-gray-700">{reservation.dias}</td>
  //                 <td className="p-4 text-gray-700">${reservation.total}</td>
  //                 <td className="p-4 text-gray-700">
  //                   {new Date(reservation.fecha_reserva).toLocaleString()}
  //                 </td>
  //               </tr>
  //             ))
  //           ) : (
  //             <tr>
  //               <td colSpan="6" className="p-4 text-center text-gray-500">
  //                 No hay reservas actuales.
  //               </td>
  //             </tr>
  //           )}
  //         </tbody>
  //       </table>
  //     </main>
  //   </div>
  // );
};

export default ReservationHistory;
