import "./ProfileNavBar.css";
import profilePic from "../../../images/profilePic.png";

export default function ProfileNavBar({ name }) {
	return (
		<nav className="profile-nav-container">
			<section className="profile-nav-row">
				<section className="profile-user-name">
					<div className="profile-picture">
						<img alt="profile" src={profilePic} />
					</div>
					<div className="profile-name">
						<div className="welcome">Welcome</div>
						<div className="profile-username">{name}</div>
					</div>
				</section>
				{/* <section
					className="profile-hamburger"
					onClick={() => console.log("mobile menu clicked")}
				>
					Log Out
				</section> */}
			</section>
		</nav>
	);
}
// {/* <section className="mobile-menu-items">
// 					<ul>
// 						<li><Link>Log out</Link></li>
// 					</ul>
// 				</section> */}
// 				{/* <div>
// 						<div className="burger"></div>
// 						<div className="burger"></div>
// 						<div className="burger"></div>
// 					</div> */}
