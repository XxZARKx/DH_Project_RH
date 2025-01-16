import { supabase } from "../../supabaseClient";

export const getReservations = async () => {
  const { data, error } = await supabase.from("reserva").select("*"); // Obtener todas las reservas

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
