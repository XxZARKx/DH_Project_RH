import { supabase } from "../../supabaseClient";

export const getReservationsWithDetails = async () => {
  // Primero obtenemos todas las reservas
  const { data: reservations, error: reservationsError } = await supabase
    .from("reserva")
    .select("*");

  if (reservationsError) {
    throw new Error(reservationsError.message);
  }

  // Creamos un array de promesas para obtener el nombre de usuario y vehículo
  const reservationsWithDetails = await Promise.all(
    reservations.map(async (reservation) => {
      // Obtener detalles del usuario usando el usuario_id (UUID)
      const { data: user, error: userError } = await supabase
        .from("usuario")
        .select("nombre")
        .eq("auth_id", reservation.usuario_id) // Aquí usas el UUID que está en la columna auth_id
        .single();

      if (userError) {
        throw new Error(userError.message);
      }

      // Obtener detalles del vehículo
      const { data: vehicle, error: vehicleError } = await supabase
        .from("vehiculo")
        .select("nombre")
        .eq("id", reservation.vehiculo_id)
        .single();

      if (vehicleError) {
        throw new Error(vehicleError.message);
      }

      // Formatear la fecha correctamente
      const formattedDate = new Date(
        reservation.fecha_reserva
      ).toLocaleString();

      // Devolver la reserva con los detalles del usuario, vehículo y la fecha formateada
      return {
        ...reservation,
        usuario_nombre: user.nombre,
        vehiculo_nombre: vehicle.nombre,
        fecha_reserva_formateada: formattedDate,
      };
    })
  );

  return reservationsWithDetails;
};
