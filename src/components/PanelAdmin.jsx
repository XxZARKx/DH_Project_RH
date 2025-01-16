import React from "react";
import { Link, useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import PanelVehicles from "./PanelVehicles";
import PanelUsers from "./PanelUsers";
import PanelReservations from "./PanelReservation";
import IngresosDiarios from "./IngresosDiarios";

const PanelAdmin = () => {
  const { pestania } = useParams();

  let panelContent;

  // Seleccionamos qué componente renderizar según el valor de pestania
  switch (pestania) {
    case "vehiculos":
      panelContent = <PanelVehicles />;
      break;
    case "usuarios":
      panelContent = <PanelUsers />;
      break;
    case "pedidos":
      panelContent = <PanelReservations />;
      break;
    case "ingresos":
      panelContent = <IngresosDiarios />;
      break;
    default:
      panelContent = (
        <div className="text-center text-xl text-red-600">
          Panel no encontrado
        </div>
      );
      break;
  }

  return (
    <div>
      <Header />
      <div className="flex">
        <aside className="w-1/5 bg-gray-800 text-white p-6 space-y-6 shadow-md min-h-screen">
          <h2 className="text-2xl font-bold text-center">Panel Admin</h2>
          <ul className="space-y-4 text-lg">
            <li>
              <Link
                to="/admin/panel/usuarios"
                className="hover:bg-gray-700 p-2 rounded block"
              >
                Lista de Usuarios
              </Link>
            </li>
            <li>
              <Link
                to="/admin/panel/vehiculos"
                className="hover:bg-gray-700 p-2 rounded block"
              >
                Autos Disponibles
              </Link>
            </li>
            <li>
              <Link
                to="/admin/panel/pedidos"
                className="hover:bg-gray-700 p-2 rounded block"
              >
                Pedidos
              </Link>
            </li>
            <li>
              <Link
                to="/admin/panel/ingresos"
                className="hover:bg-gray-700 p-2 rounded block"
              >
                Ingresos
              </Link>
            </li>
          </ul>
        </aside>
        <main className="w-4/5 p-6">{panelContent}</main>
      </div>
      <Footer />
    </div>
  );
};

export default PanelAdmin;
