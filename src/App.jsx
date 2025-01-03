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

function App() {
	return (
		<div className="bg-[#E4E4E4] bg-[#red]">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route
						path="/register"
						element={<Register tipo={2} titulo="Registrar Cliente" />}
					/>
					<Route
						path="/register/admin"
						element={<Register tipo={1} titulo="Registrar Empleado" />}
					/>
					<Route path="/vehicles/register" element={<RegistrarVehiculo />} />
					<Route path="/vehicles" element={<VehiculosDisponibles />} />
					<Route path="/admin/panel" element={<PanelAdmin />} />
					<Route path="/admin/panel/:pestania" element={<PanelAdmin />} />
					<Route path="/vehicles/:id" element={<DetallesVehiculo />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
