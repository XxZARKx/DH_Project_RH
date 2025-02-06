import React, { useState, useEffect } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const isMobileDevice = () => {
  return window.innerWidth < 768;
};

function App() {
  const user = getUserFromLocalStorage();

  const [isMobile, setIsMobile] = useState(isMobileDevice());

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(isMobileDevice());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

          <Route
            path="/register/admin"
            element={
              <ProtectedRoute user={user} requiredTipo={1}>
                <Register tipo={1} titulo="Registrar Empleado" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vehicles/register"
            element={
              <ProtectedRoute user={user} requiredTipo={1}>
                <RegistrarVehiculo />
              </ProtectedRoute>
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

          <Route path="*" element={<div>Página no encontrada</div>} />
          <Route path="/access-denied" element={<AccessDenied />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
