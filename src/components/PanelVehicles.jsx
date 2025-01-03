import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getVehicles } from "../provider/vehicle/getVehicles";
import { deleteVehicle } from "../provider/vehicle/deleteVehicle";
import Swal from "sweetalert2";
import UpdateVehicleForm from "./UpdateVehicleForm";

const PanelVehicles = () => {
	const { data: vehicles = [], refetch } = useQuery({
		queryKey: ["vehicles"],
		queryFn: getVehicles,
	});

	const [selectedVehicleId, setSelectedVehicleId] = useState(null);
	const [showUpdateForm, setShowUpdateForm] = useState(false);

	const deleteMutation = useMutation({
		mutationFn: deleteVehicle,
		onSuccess: () => {
			Swal.fire("Vehículo eliminado con éxito", "", "success");
			refetch();
		},
		onError: () => {
			Swal.fire("Error al eliminar el vehículo", "", "error");
		},
	});

	const handleUpdate = (id) => {
		setSelectedVehicleId(id);
		setShowUpdateForm(true);
	};

	const handleDelete = (id) => {
		Swal.fire({
			title: "¿Estás seguro?",
			text: "Esta acción no se puede deshacer.",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Sí, eliminar",
			cancelButtonText: "Cancelar",
		}).then((result) => {
			if (result.isConfirmed) {
				deleteMutation.mutate(id);
			}
		});
	};

	// Ordenar los vehículos por ID
	const sortedVehicles = [...vehicles].sort((a, b) => a.id - b.id);
	return (
		<div className="flex min-h-screen bg-gray-100">
			<main className="flex-1 p-6">
				<h2 className="text-2xl font-semibold mb-6">Autos Disponibles</h2>
				<table className="min-w-full bg-white shadow-sm rounded-lg">
					<thead className="bg-gray-200">
						<tr>
							<th className="p-4 text-left text-gray-700">Imagen</th>
							<th className="p-4 text-left text-gray-700">Marca</th>
							<th className="p-4 text-left text-gray-700">Matrícula</th>
							<th className="p-4 text-left text-gray-700">Precio</th>
							<th className="p-4 text-left text-gray-700">Estado</th>
							<th className="p-4 text-left text-gray-700">Acciones</th>
						</tr>
					</thead>
					<tbody>
						{sortedVehicles.length ? (
							sortedVehicles.map((vehicle) => (
								<tr key={vehicle.id} className="border-t hover:bg-gray-50">
									<td className="p-4">
										<img
											src={vehicle.imagen_url}
											alt={vehicle.marca}
											className="w-16 h-16 rounded object-contain"
										/>
									</td>
									<td className="p-4 text-gray-700">{vehicle.marca}</td>
									<td className="p-4 text-gray-700">{vehicle.matricula}</td>
									<td className="p-4 text-gray-700">S/{vehicle.precio}</td>
									<td className="p-4 text-gray-700">{vehicle.estado}</td>
									<td className="px-4 py-7 space-x-2 flex flex-wrap items-end">
										<button
											onClick={() => handleUpdate(vehicle.id)}
											className="bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700 focus:outline-none">
											Actualizar
										</button>
										<button
											onClick={() => handleDelete(vehicle.id)}
											className="bg-red-600 text-white py-1 px-4 rounded hover:bg-red-700 focus:outline-none">
											Eliminar
										</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="6" className="p-4 text-center text-gray-500">
									No hay autos disponibles.
								</td>
							</tr>
						)}
					</tbody>
				</table>

				{showUpdateForm && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
						<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl overflow-y-auto max-h-[80vh]">
							<UpdateVehicleForm
								vehicleId={selectedVehicleId}
								onClose={() => setShowUpdateForm(false)}
							/>
						</div>
					</div>
				)}
			</main>
		</div>
	);
};

export default PanelVehicles;
