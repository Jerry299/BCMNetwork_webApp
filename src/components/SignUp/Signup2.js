import React, { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import "./Signup.css";
import UserContext from "../../Context/UserRegister";
import { useNavigate,Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import SignUpMessage from "./SignUpMessage";
import Loader from "../Loader/Loader";

export default function Signup2() {
	//import global state for user's input
	const { formData1, handleInputs, clearInputs } = useContext(UserContext);
	const userRef = useRef();

	// state for passwod visibilty
	const [passwordVisiblility1, setPasswordVisibility1] = useState(false);
	const [passwordVisiblility2, setPasswordVisibility2] = useState(false);
	//state for local component to track error---- validation
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const [checkbox, setCheckBox] = useState(false);
	//state for HTTP responses
	const [resMsg, setResMsg] = useState(null);
	// const [resSuccess, setResSuccess] = useState(null);
	const [resStatus, setResStatus] = useState(null);
	//loader
	const [loader, setLoader] = useState(false);
	/// register http request
	const Register = () => {
		setLoader(true);
		axios
			.post("https://bcnetworks.herokuapp.com/onboarding/signup", {
				firstName: formData1.firstName,
				otherName: formData1.otherName,
				email: formData1.email,
				password: formData1.password,
				comfirmPassword: formData1.confirm_password,
				phone: formData1.phone,
			})
			.then((response) => {
				console.log(response.response.status, "success for axios");
				setResMsg(response.response.data.message);
				navigate("/confirmation");
			})
			.catch((error) => {
				console.log(error.response.data, "error for axios");
				setResStatus(error.response.data.status);
				setResMsg(error.response.data.message);
				setTimeout(() => {
					setResMsg(false);
					setLoader(false);
					navigate("/signin");
				}, 2000);
			});
	};

	let navigate = useNavigate();

	const handleSubmit = () => {
		handleValidation();
		if (isSubmit) {
			Register();
			resStatus === "success" && clearInputs();
		}
	};
	const handleCheck = (e) => {
		if (e.target.checked) {
			setCheckBox(true);
		} else {
			setCheckBox(false);
		}
	};

	//validation
	const handleValidation = () => {
		setFormErrors(validate(formData1));
	};

	useEffect(() => {
		userRef.current.focus();
		console.log(loader);
	}, [formErrors, loader,isSubmit]);
	// useeffect for error message on register
	// useEffect(() => {

	// }, []);

	const validate = (values) => {
		const errors = {};
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

		if (!values.confirm_password) {
			errors.confirm_password = "Confirm Password is Required";
		} else if (values.password !== values.confirm_password) {
			errors.confirm_password = "Passwords Do Not Match.";
		}
		if (!checkbox) {
			errors.checkbox = "Please accept terms and conditions";
		}
		// check for no errors before allowing to send

		if (Object.keys(errors).length === 0) {
			setIsSubmit(true);
		} else {
			setIsSubmit(false);
		}
		return errors;
	};
	//password toggle visibility
	const togglePassowrdVisibility1 = () => {
		setPasswordVisibility1(passwordVisiblility1 ? false : true);
	};
	const togglePassowrdVisibility2 = () => {
		setPasswordVisibility2(passwordVisiblility2 ? false : true);
	};

	return (
		<div className="signup-container">
			{/* add error or success message here */}
			{resMsg && <SignUpMessage status={resStatus} message={resMsg} />}
			{loader && <Loader />}
			<div className="signup-row">
				<div className="signup-header">
					<div className="signup-title">Sign Up</div>
					<div className="signup-body">
						Trusted by millions of users worldwide
					</div>
				</div>
				<div className="signup-form">
					<div className="signup-email">
						<label htmlFor="email">Email</label>
						<input
							type="text"
							name="email"
							id="signup-email"
							placeholder="ac1384726@gmail.com"
							value={formData1.email}
							onChange={handleInputs}
							ref={userRef}
						/>
						<small className="error">{formErrors.email}</small>
					</div>
					<div className="signup-password">
						<label htmlFor="password">Password</label>
						<input
							type={passwordVisiblility1 ? "text" : "password"}
							name="password"
							id="password"
							placeholder="Enter password "
							value={formData1.password}
							onChange={handleInputs}
						/>

						<FontAwesomeIcon
							icon={faEye}
							className="reveal"
							onClick={() => togglePassowrdVisibility1()}
						/>
					</div>
					<small className="error">{formErrors.password}</small>
					<div className="signup-confirm-password">
						<label htmlFor="confirm_password">Confirm Password</label>
						<input
							type={passwordVisiblility2 ? "text" : "password"}
							name="confirm_password"
							id="confirm_password"
							placeholder="Confirm password"
							value={formData1.confirm_password}
							onChange={handleInputs}
						/>
						<FontAwesomeIcon
							icon={faEye}
							className="reveal"
							onClick={() => togglePassowrdVisibility2()}
						/>
					</div>
					<small className="error">{formErrors.confirm_password}</small>
					<div className="signup-signup__section">
						<small className="error">{formErrors.checkbox}</small>
						<div className="signup-checkbox-container">
							<input
								type="checkbox"
								id="terms-agree"
								name="terms-agree"
								value={checkbox}
								onClick={handleCheck}
							/>
							<label htmlFor="terms-agree">
								I agree to the Terms and Conditions, Privacy Policy and Content
								Policy
							</label>
						</div>

						<div
							className="signup-next register-btn"
							onClick={() => handleSubmit()}
						>
							Ready
						</div>
						<div className="signup-link-to-register">
							Already Have an Account? <Link to="/register">Sign in here</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
