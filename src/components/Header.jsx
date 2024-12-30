import React from "react";
import logo from "@assets/logo.svg";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<div
			className="py-2 px-10 flex items-center w-max-screen min-h-[10%]"
			style={{ backgroundColor: "#9C9C9C" }}>
			<nav className="w-full flex items-center justify-between">
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
				<ul className="header-navlist flex gap-5">
					<li>
						<Link to={"/vehicles/register"}>registrar vehiculo</Link>
					</li>
					<li>
						<Link>Preguntas frecuentes</Link>
					</li>
					<li>
						<Link>Nuestros autos</Link>
					</li>
					<li>
						<Link to={`/register`}>Registrarse</Link>
					</li>
					<li>
						<Link to={`/login`}>Iniciar Sesion</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Header;
