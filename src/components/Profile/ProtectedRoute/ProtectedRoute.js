import { Navigate, Outlet, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { expiredToken } from "../../../features/userSlice";
import { useDispatch } from "react-redux";

export default function ProtectedRoute() {
	const dispatch = useDispatch();
	const location = useLocation();

	//first get the token
	let token = JSON.parse(localStorage.getItem("bcn_user")).token;
	let decodedToken = jwt_decode(token);
	let currentDate = new Date();
	if (!token) {
		return <Navigate to="/signin" state={{ from: location }} />;
	}
	// JWT exp is in seconds
	else if (!localStorage.getItem("bcn_user") || token.length < 1) {
		return <Navigate to="/signin" state={{ from: location }} replace />;
	} else if (decodedToken.exp * 1000 < currentDate.getTime()) {
		localStorage.removeItem("bcn_user");
		dispatch(expiredToken, "Expired Token");
		return <Navigate to="/signin" state={{ from: location }} replace />;
	} else {
		return <Outlet />;
	}
}
