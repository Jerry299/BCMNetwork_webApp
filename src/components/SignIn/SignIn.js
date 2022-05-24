import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import { Outlet, Link } from "react-router-dom";
import SignUpMessage from "../SignUp/SignUpMessage";
import Loader from "../Loader/Loader";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	//state for HTTP responses
	const [resMsg, setResMsg] = useState(null);
	// const [resSuccess, setResSuccess] = useState(null);
	const [resStatus, setResStatus] = useState(null);
	//loader
	const [loader, setLoader] = useState(false);
	//handle inputs
	const handleEmail = (e) => {
		setEmail(e.target.value);
	};
	const handlePassword = (e) => {
		setPassword(e.target.value);
	};
	let navigate = useNavigate();
	// console.log(email, password + " email password here");

	//login
	const Login = () => {
		setLoader(true);
		axios
			.post("https://bcnetworks.herokuapp.com/auth/login", {
				email,
				password,
			})
			.then((response) => {
				console.log(response.response, "success for axios");
				setResMsg(response.response.data.message);
				navigate("/profile");
			})
			.catch((error) => {
				console.log(error.response.data, "error for axios");
				setResStatus(error.response);
				setResMsg(error.response.data.message);
				setTimeout(() => {
					setResMsg(false);
					setLoader(false);
					navigate("/signin");
				}, 2000);
			});
	};
	//handle submit
	const handleSubmit = () => {
		console.log(isSubmit)
		if (isSubmit) {
			Login();
		}
	};
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
		console.log(Object.keys(errors).length,errors)
		if (Object.keys(errors).length === 0) {
			setIsSubmit(true);
		} else {
			setIsSubmit(false);
		}
		return errors;
	};

	return (
		<div className="signin-container">
			{resMsg && <SignUpMessage status={resStatus} message={resMsg} />}
			{loader && <Loader />}
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
							ENTER
						</div>
						<div className="signin-link-to-register">
							Don't have an account yet?{" "}
							<Link to="/register">Register here</Link>
						</div>
					</div>
				</div>
			</div>
			<Outlet />
		</div>
	);
}
