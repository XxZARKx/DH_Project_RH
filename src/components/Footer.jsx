import React from "react";
import logo from "@assets/logo.svg";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<div
			className="py-2 px-10 flex items-center w-max-screen min-h-[10%]"
			style={{ backgroundColor: "#9C9C9C" }}>
			<nav className="w-full flex items-center justify-between">
				<div className="flex w-[30%] items-center justify-between flex-wrap">
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
					<div className="flex flex-col h-full">
						<h3 className="text-xl text-[#ffffff] pb-4 underline">
							Encuentranos en:
						</h3>
						<ul className="header-navlist flex gap-5 justify-between text-3xl text-[#ffffff]">
							<li>
								<a
									href="https://facebook.com/"
									target="_blank"
									rel="noopener noreferrer">
									<i
										className="fa-brands fa-facebook"
										style={{ color: "#ffffff" }}></i>
								</a>
							</li>
							<li>
								<a
									href="https://x.com/"
									target="_blank"
									rel="noopener noreferrer">
									<i
										className="fa-brands fa-x-twitter"
										style={{ color: "#ffffff" }}></i>
								</a>
							</li>
							<li>
								<a
									href="https://www.instagram.com/"
									target="_blank"
									rel="noopener noreferrer">
									<i
										className="fa-brands fa-instagram"
										style={{ color: "#ffffff" }}></i>
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="flex items-center w-[50%] justify-evenly text-[#ffffff]">
					<h3 className="cursor-pointer">Política de privacidad</h3>
					<h3 className="cursor-pointer">Términos y condiciones</h3>
				</div>
			</nav>
		</div>
	);
};

export default Footer;
