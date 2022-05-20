import React, { useEffect } from "react";
import "./Landing.css";
import { useNavigate } from "react-router-dom";

export default function Landing() {
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			navigate("/signin");
		}, 5000);
	});
	return (
		<div className="landing-page-container">
			<div className="landing-page-row">
				<div className="landing-page-content">
					<div className="landing-title">BCNetwork</div>
					<div className="landing-body">
						Trusted by millions of users worldwide
					</div>
				</div>
			</div>
		</div>
	);
}
