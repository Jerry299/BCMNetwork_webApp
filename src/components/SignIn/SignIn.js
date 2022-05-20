import React from "react";
import "./SignIn.css";
import { Outlet, Link } from "react-router-dom";

export default function SignIn() {
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
						/>
					</div>
					<div className="signin-password">
						<label htmlFor="signin-password">Password</label>
						<input
							type="password"
							name="signin-password"
							id="signin-password"
							placeholder="Enter Password "
						/>
					</div>
					<div className="signin-forgot-password">
						<div className="forgot-password">Forgot password?</div>
						<div className="signin-submit">ENTER</div>
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
