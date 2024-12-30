import React from "react";
import logo from "@assets/logo.svg";
import { Link } from "react-router-dom";

const Login = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div className="w-screen h-screen flex items-center">
			<div className="max-w-1280 mx-auto" style={{ width: "100%" }}>
				<span className="bg-autheticate" />
				<div
					className="form-login  mx-auto h-1/2 p-5 pb-3 relative"
					style={{ width: "40%" }}>
					<img
						src={logo}
						alt="logo"
						className="absolute top-0 start-[30%] translate-y-[-80px]"
						style={{ width: "200px" }}
					/>
					<div className="pt-[100px] pb-[30px]">
						<form className="flex flex-col gap-[20px]">
							<input
								className="form-input w-full"
								type="email"
								name="email"
								id="email"
								placeholder="Correo Electronico"
							/>
							<input
								className="form-input"
								type="password"
								name="password"
								id="password"
								placeholder="Contraseña"
							/>
							<button
								type="submit"
								onClick={handleSubmit}
								className="btn w-[75%] mx-auto my-5"
								style={{ backgroundColor: "#0A283E", color: "#ffffff" }}>
								Ingresar
							</button>
						</form>
						<p
							className="mt-[20px] text-center"
							style={{ color: "#1F7A9B", fontSize: "15px" }}>
							¿No tienes una Cuenta? <Link to={`/register`}>Registrate</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
