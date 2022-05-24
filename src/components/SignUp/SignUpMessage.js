import React from "react";
import "./Signup.css";

export default function SignUpMessage({ status, message }) {
	return (
		<div
			className={
				status === "error"
					? "signup-message-container msg-error"
					: "signup-message-container msg-success"
			}
		>
			<div className="signup-message-row">{message}</div>
		</div>
	);
}
