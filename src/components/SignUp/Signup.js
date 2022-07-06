import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../Context/UserRegister";
import "./Signup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { Outlet, Link } from "react-router-dom";

export default function Signup() {
	//state for local component to track error---- validation
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);

	const { formData1, handleInputs } = useContext(UserContext);

	//validation
	const handleValidation = () => {
		setFormErrors(validate(formData1));
	};

	useEffect(() => {
		if (Object.keys(formErrors).length === 0 && isSubmit) {
		}
	}, [formErrors,isSubmit]);

	const validate = (values) => {
		const errors = {};
		let phoneRegex =
			/(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g;
		if (!values.firstName) {
			errors.firstName = "First Name is Required";
		} else if (values.firstName.length < 3) {
			errors.firstName = "First Name should be more than 3";
		}

		if (!values.otherName) {
			errors.otherName = "Last Name is Required";
		} else if (values.otherName.length < 3) {
			errors.otherName = "Last Name should be more than 3";
		}

		if (!values.phone) {
			errors.phone = "Phone Number is Required";
		} else if (!phoneRegex.test(values.phone)) {
			errors.phone = "Invalid Phone Number";
		}

		if (!values.userType) {
			errors.userType = "User should either be Admin or User";
		}

		// check for no errors before allowing to send

		if (Object.keys(errors).length === 0) {
			setIsSubmit(true);
		} else {
			setIsSubmit(false);
		}
		return errors;
	};

	return (
		<div className="signup-container">
			<div className="signup-row">
				<div className="signup-header">
					<div className="signup-title">Sign Up</div>
					<div className="signup-body">
						Trusted by millions of users worldwide
					</div>
				</div>
				<div className="signup-form">
					<div className="signup-name">
						<label htmlFor="firstName">First Name</label>
						<input
							value={formData1.firstName}
							type="text"
							name="firstName"
							id="signup-first-name"
							placeholder="User’s first name"
							onChange={handleInputs}
							onBlur={handleValidation}
						/>
						<small className="error">{formErrors.firstName}</small>
					</div>
					<div className="signup-name">
						<label htmlFor="otherName">Last Name</label>
						<input
							type="text"
							name="otherName"
							id="signup-last-name"
							placeholder="User’s last name"
							onChange={handleInputs}
							value={formData1.otherName}
							onBlur={handleValidation}
						/>
						<small className="error">{formErrors.otherName}</small>
					</div>
					<div className="signup-phonenumber">
						<label htmlFor="phone">Phone Number</label>
						<input
							type="number"
							name="phone"
							id="signup-phonenumber"
							placeholder="Phone number that can be contacted"
							onChange={handleInputs}
							value={formData1.phone}
							onBlur={handleValidation}
						/>
						<small className="error">{formErrors.phone}</small>
					</div>
					
					<div className="signup-next-container">
						<Link
							to="/register-contd"
							style={{
								color: "white",
								// pointerEvents: isSubmit ? "" : "none",
							}}
						>
							<div className="signup-next" onClick={handleValidation}>
								Next
							</div>
						</Link>{" "}
						{/* <div
							style={{
								color: "white",
								// pointerEvents: error.noError ? "" : "none",
							}}
							className="signup-next"
							onClick={handleValidation}
						>
							Next
						</div> */}
						<div className="signup-link-to-register">
							Already Have an Account? <Link to="/signin"> Sign in here</Link>
						</div>
						<div className="signup-skip">
							Skip this step{" "}
							<span>
								<FontAwesomeIcon icon={faArrowRight} id="skip-arrow-right" />
							</span>
						</div>
					</div>
				</div>
			</div>
			<Outlet />
		</div>
	);
}
