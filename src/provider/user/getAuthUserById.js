// src/auth.js
import { supabase } from "../../supabaseClient";

export const getAuthUserById = async (userId) => {
  try {
    if (!userId) {
      throw new Error("El ID de usuario es requerido.");
    }

    // Filtramos el usuario por el ID proporcionado como parámetro
    const { data: userDetails, error } = await supabase
      .from("usuario") // Asumiendo que la tabla de usuarios se llama "usuario"
      .select("*")
      .eq("id", userId) // Filtramos por el ID del usuario
      .single(); // Esperamos solo un resultado

    if (error) {
      throw error;
    }

    console.log("Usuario encontrado:", userDetails);
    return userDetails; // Devolvemos los detalles del usuario
  } catch (error) {
    console.error("Error al obtener el usuario por ID:", error);
    throw new Error("No se pudo obtener el usuario.");
  }
};
