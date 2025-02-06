import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RegistrarVehiculo from "./components/RegistrarVehiculo";
import VehiculosDisponibles from "./components/VehiculosDisponibles";
import DetallesVehiculo from "./components/DetallesVehiculo";
import PanelAdmin from "./components/PanelAdmin";
import ProtectedRoute from "./components/ProtectedRoute";
import AccessDenied from "./components/AccessDenied";
import ReservaVehiculo from "./components/ReservaVehiculo";
import MisReservas from "./components/UserReservas";
import PoliticaPrivacidad from "./components/PoliticaPrivacidad";
import TerminosYCondiciones from "./components/TerminosYCondiciones";

const getUserFromLocalStorage = () => {
  try {
    const userData = localStorage.getItem("user");
    if (!userData) return null;
    return JSON.parse(userData);
  } catch (error) {
    console.error("Error al analizar los datos del usuario:", error);
    return null;
  }
};

// Función para detectar si el usuario está en un dispositivo móvil
const isMobileDevice = () => {
  return window.innerWidth < 768; // Define el ancho máximo para dispositivos móviles
};

function App() {
  const user = getUserFromLocalStorage();

  // Estado para almacenar si el usuario está en un dispositivo móvil
  const [isMobile, setIsMobile] = useState(isMobileDevice());

  // Efecto para detectar cambios en el tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(isMobileDevice());
    };

    // Añadir el listener para el evento resize
    window.addEventListener("resize", handleResize);

    // Limpieza del listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Componente que maneja el acceso denegado para dispositivos móviles
  const MobileAccessDenied = () => {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Acceso no permitido</h1>
        <p>
          No puedes acceder a esta sección desde un dispositivo móvil. Por
          favor, utiliza un dispositivo de escritorio.
        </p>
        <a href="/">Ir a la página de inicio</a>
      </div>
    );
  };

  return (
    <div className="bg-[#E4E4E4]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/register"
            element={<Register tipo={2} titulo="Registrar Cliente" />}
          />
          <Route path="/vehicles" element={<VehiculosDisponibles />} />
          <Route path="/politicaPrivacidad" element={<PoliticaPrivacidad />} />
          <Route
            path="/terminosYcondiciones"
            element={<TerminosYCondiciones />}
          />
          <Route path="/vehicles/:id" element={<DetallesVehiculo />} />
          <Route path="/reservation/:id" element={<ReservaVehiculo />} />
          <Route path="/mis-reservas" element={<MisReservas />} />

          {/* Rutas protegidas */}
          <Route
            path="/register/admin"
            element={
              isMobile ? (
                <MobileAccessDenied />
              ) : (
                <ProtectedRoute user={user} requiredTipo={1}>
                  <Register tipo={1} titulo="Registrar Empleado" />
                </ProtectedRoute>
              )
            }
          />
          <Route
            path="/vehicles/register"
            element={
              isMobile ? (
                <MobileAccessDenied />
              ) : (
                <ProtectedRoute user={user} requiredTipo={1}>
                  <RegistrarVehiculo />
                </ProtectedRoute>
              )
            }
          />
          <Route
            path="/admin/panel"
            element={
              isMobile ? (
                <MobileAccessDenied />
              ) : (
                <ProtectedRoute user={user} requiredTipo={1}>
                  <PanelAdmin />
                </ProtectedRoute>
              )
            }
          />
          <Route
            path="/admin/panel/:pestania"
            element={
              isMobile ? (
                <MobileAccessDenied />
              ) : (
                <ProtectedRoute user={user} requiredTipo={1}>
                  <PanelAdmin />
                </ProtectedRoute>
              )
            }
          />

          {/* Ruta para página no encontrada */}
          <Route path="*" element={<div>Página no encontrada</div>} />
          <Route path="/access-denied" element={<AccessDenied />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
