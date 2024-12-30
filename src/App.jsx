import Home from "./components/Home";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RegistrarVehiculo from "./components/RegistrarVehiculo";
import VehiculosDisponibles from "./components/VehiculosDisponibles";

function App() {
	return (
		<div className="bg-[#E4E4E4] bg-[#red]">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/vehicles/register" element={<RegistrarVehiculo />} />
					<Route path="/vehicles" element={<VehiculosDisponibles />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
