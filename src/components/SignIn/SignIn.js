import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Space, Spin } from "antd";
import { login, reset } from "../../features/userSlice";
import { toast } from "react-toastify";
import "antd/es/spin/style/css";
// import axios from "axios";
import "./SignIn.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import SignUpMessage from "../SignUp/SignUpMessage";
// import Loader from "../Loader/Loader";
// import useAuth from "../../hooks/useAuth";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);

	const dispatch = useDispatch();
	const { isError, isLoading, user, isSuccess, message } = useSelector(
		(state) => state.userReducer
	);
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/profile";

	//console.log(loggedInUser);
	//state for HTTP responses
	// const [resMsg, setResMsg] = useState(null);
	// // const [resSuccess, setResSuccess] = useState(null);
	// const [resStatus, setResStatus] = useState(null);
	// //loader
	// const [loader, setLoader] = useState(false);
	//handle inputs
	const handleEmail = (e) => {
		setEmail(e.target.value);
	};
	const handlePassword = (e) => {
		setPassword(e.target.value);
	};

	// console.log(email, password + " email password here");
	//original url = https://bcnetworks.herokuapp.com/auth/login  http://localhost:5000/api/v1/user/login
	//login
	// const Login = () => {
	// 	setLoader(true);
	// 	axios
	// 		.post("https://bcnetworks.herokuapp.com/auth/login", { email, password })
	// 		.then((response) => {
	// 			setLoggedInUser(response.data.data);
	// 			setResMsg(response.data.message);
	// 			setResStatus(response.data.status);
	// 			// localStorage.setItem(
	// 			// 	"BCNUSER",
	// 			// 	JSON.stringify(response.data.data.email)
	// 			// );
	// 			setTimeout(() => {
	// 				navigate(from, { replace: true });
	// 			}, 2000);
	// 		})
	// 		.catch((error) => {
	// 			console.log(error, "error for axios");
	// 			setIsAuthenticated(error.response.data.status);
	// 			setResStatus(error.response.data.status);
	// 			setResMsg(error.response.data.message);
	// 			setTimeout(() => {
	// 				setResMsg(false);
	// 				setLoader(false);
	// 				navigate("/signin");
	// 			}, 2000);
	// 		});
	// };

	//handle submit
	const handleSubmit = () => {
		const newData = { email, password };
		if (isSubmit) {
			dispatch(login(newData));
		}
	};
	useEffect(() => {
		const controller = new AbortController();
		if (isError) {
			if (message === "Auth Failed") {
				toast.error(`Error! Invalid username or password`, {
					position: toast.POSITION.TOP_LEFT,
				});
				dispatch(reset());
			} else {
				console.log(message, " message");
				toast.error(`Error! ${message}`, {
					position: toast.POSITION.TOP_LEFT,
				});
				dispatch(reset());
			}
		}
		if (isSuccess) {
			toast.success(`Success! Logged In Successfully`, {
				position: toast.POSITION.TOP_LEFT,
			});
			dispatch(reset());
			navigate(from, { replace: true });
		}
		return () => controller.abort();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isError, isSuccess, isLoading, message, navigate, user]);
	//console.log(isError, isSuccess, isLoading, message, navigate, user, " chek");

	useEffect(() => {
		let values = {
			email,
			password,
		};
		setFormErrors(validate(values));
	}, [email, password]);

	//validation
	const validate = (values) => {
		const errors = { email: "", password: "" };
		let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

		if (!values.email) {
			errors.email = "Email is Required";
		} else if (!emailRegex.test(values.email)) {
			errors.email = "Invalid Email Format!";
		}

		if (!values.password) {
			errors.password = "Password is Required.";
		} else if (!/\d/.test(values.password)) {
			errors.password = "Password Should Contain AtLeast A Number.";
		} else if (!/[a-z]/.test(values.password)) {
			errors.password = "Password Should Contain Lower Case.";
		} else if (!/[A-Z]/.test(values.password)) {
			errors.password = "Password Should Contain Upper Case.";
		} else if (!/[!#=@$%&*)(_-]/.test(values.password)) {
			errors.password = "Password Should Contain A Special Character.";
		} else if (values.password.length < 8) {
			errors.password = "Password Should Contain At Least 8 characters.";
		}

		if (errors.email.length === 0 && errors.password.length === 0) {
			setIsSubmit(true);
		} else {
			setIsSubmit(false);
		}

		return errors;
	};

	return (
		<div className="signin-container">
			<div className="signin-row">
				<div className="signin-header">
					<div className="signin-title">BCNetwork</div>
					<div className="signin-body">
						Trusted by millions of users worldwide
					</div>
				</div>
				<div className="signin-form">
					<div className="signin-email">
						<label htmlFor="signin-email">Email</label>
						<input
							type="text"
							name="signin-email"
							id="signin-email"
							placeholder="user@emaildomain.com"
							value={email}
							onChange={handleEmail}
						/>
					</div>
					<small className="error">{formErrors.email}</small>
					<div className="signin-password">
						<label htmlFor="signin-password">Password</label>
						<input
							type="password"
							name="signin-password"
							id="signin-password"
							placeholder="Enter Password "
							value={password}
							onChange={handlePassword}
						/>
					</div>
					<small className="error">{formErrors.password}</small>
					<div className="signin-forgot-password">
						<div className="forgot-password">Forgot password?</div>
						<div className="signin-submit" onClick={handleSubmit}>
							{isLoading ? (
								<div className="example">
									<Space size="middle">
										<Spin size="small" />
									</Space>
								</div>
							) : (
								"Log In"
							)}
						</div>
						<div className="signin-link-to-register">
							Don't have an account yet?{" "}
							<Link to="/register">Register here</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
