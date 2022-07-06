import React, { createContext, useState } from "react";

const DepositContext = createContext();

export function DepositProvider({ children }) {
	const [depositDetails, setDepositDetails] = useState({
		deposit_amount: null,
        deposit_name:""
	});

	const handleInputs = (e) => {
		setDepositDetails({
			...depositDetails,
			[e.target.name]: e.target.value,
		});
	};
	
	return (
		<DepositContext.Provider value={{ depositDetails, handleInputs}}>
			{children}
		</DepositContext.Provider>
	);
}
export default DepositContext;