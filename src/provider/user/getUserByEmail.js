import { supabase } from "../../../api/supabaseClient";

export const getUserByEmail = async (email) => {
	try {
		if (!email) {
			throw new Error("El correo electrónico es requerido.");
		}

		const { data, error } = await supabase
			.from("usuario") // Asegúrate de usar el nombre correcto de tu tabla de usuarios
			.select("*")
			.eq("correo", email)
			.single();

		if (error) {
			throw new Error(error.message);
		}

		// console.log("from function: ", data);

		return data; // Devuelve la información del usuario encontrado
	} catch (err) {
		throw new Error(err.message);
	}
};
