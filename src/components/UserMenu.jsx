import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@assets/avatarUser.png";

const UserMenu = ({ user, onLogout }) => {
	const [menuOpen, setMenuOpen] = useState(false);
	const navigate = useNavigate(); // Hook para redirigir a otras rutas

	const toggleMenu = () => setMenuOpen(!menuOpen);

	const handleLogout = () => {
		setMenuOpen(false);
		onLogout();
	};

	const goToReservations = () => {
		setMenuOpen(false);
		navigate("/mis-reservas");
	};

	const goToRegisterAdmin = () => {
		setMenuOpen(false);
		navigate("/register/admin");
	};

	return (
		<div className="relative inline-block text-left">
			<div
				className="flex items-center cursor-pointer space-x-2"
				onClick={toggleMenu}>
				<span className="font-normal capitalize">
					{user.nombre} {user.apellido}
				</span>
				<img src={Avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
			</div>

			{menuOpen && (
				<div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-20">
					<button
						className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
						onClick={goToRegisterAdmin}>
						Registrar Empleado
					</button>
					<button
						className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
						onClick={goToReservations}>
						Mis Reservas
					</button>
					<button
						className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
						onClick={handleLogout}>
						Salir
					</button>
				</div>
			)}
		</div>
	);
};

export default UserMenu;
