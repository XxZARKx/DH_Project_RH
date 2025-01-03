import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import logo from "@assets/logo.svg";
import UserMenu from "./UserMenu";

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

const Header = () => {
	const {
		data: user,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["user"],
		queryFn: getUserFromLocalStorage,
		initialData: null,
		refetchOnWindowFocus: false,
	});

	const handleLogout = () => {
		localStorage.removeItem("user");
	};

	if (isLoading) return <div>Cargando...</div>;
	if (isError) return <div>Error al cargar el usuario.</div>;

	return (
		<div
			className="px-10 flex items-center w-max-screen min-h-[10%]"
			style={{ backgroundColor: "#9C9C9C" }}>
			<nav className="w-full flex items-center justify-between">
				<Link to={"/"}>
					<img
						src={logo}
						alt="logo"
						style={{
							width: "120px",
							height: "120px",
							objectFit: "cover",
							cursor: "pointer",
						}}
					/>
				</Link>
				<ul className="header-navlist flex gap-5 items-center">
					{user?.user_metadata.tipo === 1 && (
						<>
							<li>
								<Link to={"/vehicles/register"}>Registrar Vehiculo</Link>
							</li>
							<li>
								<Link to={"/admin/panel"}>Panel</Link>
							</li>
						</>
					)}

					<li>
						<Link to={"/vehicles"}>Nuestros Autos</Link>
					</li>

					{!user ? (
						<>
							<li>
								<Link to={`/register`}>Registrarse</Link>
							</li>
							<li>
								<Link to={`/login`}>Iniciar Sesión</Link>
							</li>
						</>
					) : (
						<UserMenu user={user} onLogout={handleLogout} />
					)}
				</ul>
			</nav>
		</div>
	);
};

export default Header;
