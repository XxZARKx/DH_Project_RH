import React from "react";
import logo from "@assets/logo.svg";

const Register = () => {
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
					<div className="pt-[70px]">
						<form className="flex flex-col gap-[20px]">
							<input
								className="form-input"
								type="text"
								name="text"
								id="username"
								placeholder="Nombres"
							/>
							<input
								className="form-input"
								type="text"
								name="text"
								id="userlastname"
								placeholder="Apellidos"
							/>
							<input
								className="form-input"
								type="number"
								name="dni"
								id="dni"
								placeholder="DNI"
							/>
							<input
								className="form-input"
								type="email"
								name="email"
								id="email"
								placeholder="Correo electronico"
							/>
							<input
								className="form-input"
								type="password"
								name="password"
								id="password"
								placeholder="Contraseña"
							/>
							<input
								className="form-input"
								type="password"
								name="password"
								id="password"
								placeholder="Confirmar contraseña"
							/>
							<button
								type="submit"
								onClick={handleSubmit}
								className="btn my-3 w-75 mx-auto"
								style={{ backgroundColor: "#0A283E", color: "#ffffff" }}>
								Registrarse
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
