import React, { createContext, useState } from "react";

const AuthUser = createContext({});

export function UserAuthProvider({ children }) {
	const [loggedInUser, setLoggedInUser] = useState({});
	const [isAuthenticated, setIsAuthenticated] = useState("");
	const [walletDetails, setWalletDetails] = useState({});

	return (
		<AuthUser.Provider
			value={{
				loggedInUser,
				setLoggedInUser,
				isAuthenticated,
				setIsAuthenticated,
				walletDetails,
				setWalletDetails,
			}}
		>
			{children}
		</AuthUser.Provider>
	);
}

export default AuthUser;
