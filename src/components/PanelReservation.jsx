import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getReservationsWithDetails } from "../provider/reservation/getReservationsWithDetails";
import { deleteReservation } from "../provider/reservation/deleteReservation";
import { updateReservationDate } from "../provider/reservation/updateReservationDate";
import Swal from "sweetalert2";
import UpdateReservationForm from "./UpdateReservationForm";

const PanelReservations = () => {
  const { data: reservations = [], refetch } = useQuery({
    queryKey: ["reservations"],
    queryFn: getReservationsWithDetails,
  });

  const [selectedReservationId, setSelectedReservationId] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: deleteReservation,
    onSuccess: () => {
      Swal.fire("Reserva eliminada con éxito", "", "success");
      refetch();
    },
    onError: () => {
      Swal.fire("Error al eliminar la reserva", "", "error");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateReservationDate,
    onSuccess: () => {
      Swal.fire("Fecha de reserva actualizada", "", "success");
      refetch();
    },
    onError: () => {
      Swal.fire("Error al actualizar la fecha", "", "error");
    },
  });

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

  const handleUpdateDate = (id) => {
    setSelectedReservationId(id);
    setShowUpdateForm(true);
  };

  // Ordenar las reservas por fecha de inicio
  const sortedReservations = [...reservations].sort(
    (a, b) => new Date(a.fecha_inicio) - new Date(b.fecha_inicio)
  );

  console.log(sortedReservations);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-semibold mb-6">Reservas de Vehículos</h2>
        <table className="min-w-full bg-white shadow-sm rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-4 text-left text-gray-700">Cliente</th>
              <th className="p-4 text-left text-gray-700">Vehículo</th>
              <th className="p-4 text-left text-gray-700">Fecha de Inicio</th>
              <th className="p-4 text-left text-gray-700">Fecha de Fin</th>
              <th className="p-4 text-left text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sortedReservations.length ? (
              sortedReservations.map((reservation) => (
                <tr key={reservation.id} className="border-t hover:bg-gray-50">
                  <td className="p-4 text-gray-700">
                    {reservation.cliente_nombre}
                  </td>
                  <td className="p-4 text-gray-700">
                    {reservation.vehiculo_marca}
                  </td>
                  <td className="p-4 text-gray-700">
                    {new Date(reservation.fecha_inicio).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-gray-700">
                    {new Date(reservation.fecha_fin).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-7 space-x-2 flex flex-wrap items-end">
                    <button
                      onClick={() => handleUpdateDate(reservation.id)}
                      className="bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700 focus:outline-none"
                    >
                      Ampliar Fecha
                    </button>
                    <button
                      onClick={() => handleDelete(reservation.id)}
                      className="bg-red-600 text-white py-1 px-4 rounded hover:bg-red-700 focus:outline-none"
                    >
                      Eliminar Reserva
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No hay reservas disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {showUpdateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl overflow-y-auto max-h-[80vh]">
              <UpdateReservationForm
                reservationId={selectedReservationId}
                onClose={() => setShowUpdateForm(false)}
                onUpdate={(newDate) =>
                  updateMutation.mutate({ id: selectedReservationId, newDate })
                }
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PanelReservations;
