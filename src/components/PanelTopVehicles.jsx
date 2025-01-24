import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getVehicles } from "../provider/vehicle/getVehicles";

const PopularVehicleBrands = () => {
  const [view, setView] = useState("cards"); // Estado para controlar la vista
  const { data: vehicles = [] } = useQuery({
    queryKey: ["vehicles"],
    queryFn: getVehicles,
  });

  // Contamos las marcas más alquiladas sin distinguir entre mayúsculas y minúsculas
  const brandCounts = vehicles.reduce((acc, vehicle) => {
    const brandLower = vehicle.marca.toLowerCase(); // Convertimos la marca a minúsculas
    if (
      vehicle.estado &&
      ["reservado"].includes(vehicle.estado.toLowerCase())
    ) {
      acc[brandLower] = (acc[brandLower] || 0) + 1;
    }
    return acc;
  }, {});

  // Ordenamos las marcas por cantidad de alquileres
  const sortedBrands = Object.entries(brandCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([brand, count]) => ({ brand, count }));

  // Encontramos el número máximo de alquileres para calcular el porcentaje
  const maxCount = sortedBrands.length > 0 ? sortedBrands[0].count : 1;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
          Ranking de Marcas Más Alquiladas
        </h2>

        {/* Botones para alternar entre vistas */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg ${
              view === "list"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
            onClick={() => setView("list")}
          >
            Vista Tabla
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              view === "cards"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
            onClick={() => setView("cards")}
          >
            Vista en Tarjetas
          </button>
        </div>

        {/* Vista en Tarjetas */}
        {view === "cards" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedBrands.length ? (
              sortedBrands.map((brand, index) => (
                <div
                  key={brand.brand}
                  className={`p-6 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out ${
                    index === 0
                      ? "bg-yellow-200 hover:bg-yellow-300"
                      : index === 1
                      ? "bg-blue-200 hover:bg-blue-300"
                      : index === 2
                      ? "bg-green-200 hover:bg-green-300"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span
                        className={`text-2xl font-bold text-gray-800 mr-4 ${
                          index === 0
                            ? "text-yellow-600"
                            : index === 1
                            ? "text-blue-600"
                            : index === 2
                            ? "text-green-600"
                            : "text-gray-800"
                        }`}
                      >
                        {index === 0
                          ? "🥇"
                          : index === 1
                          ? "🥈"
                          : index === 2
                          ? "🥉"
                          : ""}
                      </span>
                      <span className="text-xl font-semibold text-gray-800">
                        {brand.brand}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="w-2/3 bg-gray-200 rounded-full h-3 relative">
                        <div
                          className="h-3 rounded-full"
                          style={{
                            width: `${(brand.count / maxCount) * 100}%`,
                            backgroundColor: "#4CAF50",
                          }}
                        ></div>
                      </div>
                      <span className="text-lg font-medium text-gray-800">
                        {brand.count}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">
                No hay vehículos alquilados actualmente.
              </div>
            )}
          </div>
        )}

        {/* Vista tablas */}
        {view === "list" && (
          <div className="space-y-4">
            {sortedBrands.length ? (
              sortedBrands.map((brand, index) => (
                <div
                  key={brand.brand}
                  className={`p-6 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out ${
                    index === 0
                      ? "bg-yellow-200 hover:bg-yellow-300"
                      : index === 1
                      ? "bg-blue-200 hover:bg-blue-300"
                      : index === 2
                      ? "bg-green-200 hover:bg-green-300"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span
                        className={`text-2xl font-bold text-gray-800 mr-4 ${
                          index === 0
                            ? "text-yellow-600"
                            : index === 1
                            ? "text-blue-600"
                            : index === 2
                            ? "text-green-600"
                            : "text-gray-800"
                        }`}
                      >
                        {index === 0
                          ? "🥇"
                          : index === 1
                          ? "🥈"
                          : index === 2
                          ? "🥉"
                          : ""}
                      </span>
                      <span className="text-xl font-semibold text-gray-800">
                        {brand.brand}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="w-2/3 bg-gray-200 rounded-full h-3 relative">
                        <div
                          className="h-3 rounded-full"
                          style={{
                            width: `${(brand.count / maxCount) * 100}%`,
                            backgroundColor: "#4CAF50",
                          }}
                        ></div>
                      </div>
                      <span className="text-lg font-medium text-gray-800">
                        {brand.count}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">
                No hay vehículos alquilados actualmente.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default PopularVehicleBrands;
