import { supabase } from "../../supabaseClient";

export const updateReservationDate = async ({ reservationId, newDate }) => {
  const { data, error } = await supabase
    .from("reserva")
    .update({ fecha_reserva: newDate }) // Asumiendo que el campo es 'fecha_reserva'
    .eq("id", reservationId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
