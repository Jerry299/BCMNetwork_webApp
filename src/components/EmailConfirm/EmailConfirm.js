import React from "react";
import { Link } from "react-router-dom";

export default function EmailConfirm() {
	return (
		<div
			className="email-confirm-container"
			style={{
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<div
				className="email-confirm-row"
				style={{ width: "80%", margin: "0 auto" }}
			>
				<div className="email-confirm-content">
					You have registered successfully, Please check email and confirm your
					email
				</div>
				<div>
					Verified your email?
					<Link
						to={"/signin"}
						style={{ textDecoration: "none", color: "#0b5ba1" }}
					>
						{" "}
						Log In
					</Link>
				</div>
			</div>
		</div>
	);
}
