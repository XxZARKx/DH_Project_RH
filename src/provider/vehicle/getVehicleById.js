import { supabase } from "../../supabaseClient";

export const getVehicleById = async (id) => {
	try {
		const { data, error } = await supabase
			.from("vehiculo")
			.select("*")
			.eq("id", id)
			.single(); // Asegúrate de que esperas un solo registro

		console.log("Datos del vehículo:", data); // Verifica que los datos estén correctos

		if (error) {
			throw new Error(error.message);
		}

		return data;
	} catch (error) {
		console.error("Error al obtener el vehículo:", error);
		return null;
	}
};
