import React, { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
	const [formData1, setFormData1] = useState({
		firstName: "",
		otherName: "",
		phone: "",
		userType: "",
		email: "",
		password: "",
		confirm_password: "",
	});

	const handleInputs = (e) => {
		setFormData1({
			...formData1,
			[e.target.name]: e.target.value,
		});
	};
	const clearInputs = () => {
		setFormData1({
			firstName: "",
			otherName: "",
			phone: "",
			userType: "",
			email: "",
			password: "",
			confirm_password: "",
		});
	};
	return (
		<UserContext.Provider value={{ formData1, handleInputs, clearInputs }}>
			{children}
		</UserContext.Provider>
	);
}
export default UserContext;
