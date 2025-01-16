import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Asegúrate de instalar react-datepicker

import { supabase } from "../supabaseClient";

const IngresosDiarios = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Función para obtener los ingresos dentro de un rango de fechas
  const fetchIngresos = async () => {
    const { data, error } = await supabase
      .from("reserva")
      .select("total, fecha_reserva")
      .gte("fecha_reserva", startDate ? startDate.toISOString() : "1970-01-01")
      .lte(
        "fecha_reserva",
        endDate ? endDate.toISOString() : new Date().toISOString()
      );

    if (error) {
      console.error("Error al obtener ingresos:", error);
      throw new Error(error.message);
    }

    console.log("Datos obtenidos de Supabase:", data);
    return data;
  };

  // Query para obtener los datos
  const {
    data: ingresos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ingresos", startDate, endDate],
    queryFn: fetchIngresos,
    enabled: !!startDate && !!endDate, // La consulta se ejecuta solo si se seleccionan ambas fechas
  });

  console.log("startDate:", startDate?.toISOString());
  console.log("endDate:", endDate?.toISOString());
  console.log("Datos filtrados por rango de fechas:", ingresos);

  // Calcular el total de ingresos
  const totalIngresos =
    ingresos?.reduce((sum, ingreso) => sum + ingreso.total, 0) || 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Ingresos Diarios
        </h1>

        {/* Selector de rango de fechas */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Fecha de inicio:
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              maxDate={endDate || new Date()}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Fecha de fin:
            </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              minDate={startDate}
              maxDate={new Date()}
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
          </div>
        </div>

        {/* Mostrar resultados */}
        {isLoading ? (
          <div className="text-center text-gray-500">Cargando ingresos...</div>
        ) : error ? (
          <div className="text-center text-red-500">
            Error al cargar los datos: {error.message}
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-semibold mb-3">Resultados:</h2>
            <p className="text-gray-700">
              <strong>Total de ingresos:</strong> S/ {totalIngresos.toFixed(2)}
            </p>
            <ul className="list-disc pl-5 mt-4 space-y-2">
              {ingresos?.map((ingreso, index) => (
                <li key={index}>
                  <strong>Fecha:</strong>{" "}
                  {new Date(ingreso.fecha_reserva).toLocaleDateString()} -{" "}
                  <strong>Ingreso:</strong> S/ {ingreso.total.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default IngresosDiarios;
