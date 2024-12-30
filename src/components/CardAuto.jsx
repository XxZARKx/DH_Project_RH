import React from "react";

const CardAuto = ({ auto }) => {
	return (
		<div className="w-[250px] bg-[#ffffff] border-solid border flex flex-col items-center justify-between p-5 rounded-2xl cardAuto">
			<img className="w-[50%]" src={auto.image} alt={auto.name} />
			<p className="py-2">{auto.name}</p>
			<div className="flex flex-wrap justify-between w-full text-base gap-x-10 gap-y-4 py-4">
				<p className="flex items-center gap-x-2">
					<i className="fa-solid fa-user" />
					{auto.limit}
				</p>
				<p className="flex items-center gap-x-2">
					<i className="fa-solid fa-door-closed" />
					{auto.doors}
				</p>
				<p className="flex items-center gap-x-2">
					<i className="fa-solid fa-suitcase" />
					{auto.trunk}
				</p>
				<p className="flex items-center gap-x-2">
					<i className="fa-solid fa-car" />
					{auto.brand}
				</p>
			</div>
			<div className="flex w-full justify-between mt-2 items-center">
				<p className="text-xs">S/{auto.price} /dia</p>
				<button className="text-xs text-[#ffffff] bg-[#566C85] py-2 px-4 rounded-3xl">
					Ver detalles
				</button>
			</div>
		</div>
	);
};

export default CardAuto;
