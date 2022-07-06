import { useContext } from "react";
import AuthUser from "../Context/AuthUser";

const useAuth = () => {
	return useContext(AuthUser);
};

export default useAuth;
