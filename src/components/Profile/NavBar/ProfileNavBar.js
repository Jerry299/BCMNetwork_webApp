import React from "react";
import "./ProfileNavBar.css";
import profilePic from "../../../images/profilePic.png";

export default function ProfileNavBar() {
	return (
		<nav className="profile-nav-container">
			<section className="profile-nav-row">
				<section className="profile-user-name">
					<div className="profile-picture">
						<img alt="profile" src={profilePic} />
					</div>
					<div className="profile-name">
						<div className="welcome">Welcome</div>
						<div className="profile-username">User Person 2</div>
					</div>
				</section>
				<section className="profile-hamburger">
					<div>
						<div className="burger"></div>
						<div className="burger"></div>
						<div className="burger"></div>
					</div>
				</section>
			</section>
		</nav>
	);
}
