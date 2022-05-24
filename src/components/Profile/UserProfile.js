import React from "react";
import "./UserProfile.css";
import ProfileNavBar from "./NavBar/ProfileNavBar";
import Wallet from "./ProfileBody/Wallet";

export default function UserProfile() {
	return (
		<div className="user-profile-container">
			<div className="user-profile-row">
				<ProfileNavBar />
				<Wallet />
			</div>
		</div>
	);
}
