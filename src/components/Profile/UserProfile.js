import React, { useEffect } from "react";
import "./UserProfile.css";
import profilePic from "../../images/profilePic.png";
import { Link } from "react-router-dom";
import { Space, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchInvestor } from "../../features/investorSlice";
import { toast } from "react-toastify";

const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",

	// These options are needed to round to whole numbers if that's what you want.
	//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
	//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
export default function UserProfile() {
	//const location = useLocation();
	const { user } = useSelector((state) => state.userReducer);
	const { isError, message, combined, roi, commission, main, isLoading } =
		useSelector((state) => state.investorSlice);
	const dispatch = useDispatch();

	useEffect(() => {
		// console.log(!!isError, " out Error")
		dispatch(fetchInvestor(user.email));
		// console.log(isSuccess, isLoading);
		if (isError) {
			toast.error(`Error! ${message}`, {
				position: toast.POSITION.TOP_LEFT,
			});
		}
	}, [isError, user.email, dispatch, message]);

	return (
		<div className="user-profile-container">
			{isLoading ? (
				<div
					className="example"
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "100%",
					}}
				>
					<Space size="large">
						<Spin size="large" />
					</Space>
				</div>
			) : (
				<div className="user-profile-row">
					<ProfileNavBar name={user?.firstName} />
					<Board combined={combined} />
					<Transactions />
					<AccountCardItem commission={commission} roi={roi} main={main} />
				</div>
			)}
		</div>
	);
}
const ProfileNavBar = ({ name }) => {
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
};

const Board = ({ combined }) => {
	return (
		<section className="board-container">
			<div className="board-row">
				<section className="board">
					<div>Combined Wallet Value</div>
					<div className="board-main-account">{formatter.format(combined)}</div>
				</section>
				{/* <section className="board-indicator">+ 15 %</section> */}
			</div>
		</section>
	);
};

const Transactions = () => {
	return (
		<div className="transactions-container">
			<div className="transactions-row">
				<div className="fund-wallet">
					{" "}
					<Link to="/deposit"> Fund Wallet</Link>
				</div>
				<div className="withdraw">
					<Link to="/withdraw">Withdraw</Link>
				</div>
			</div>
		</div>
	);
};

const AccountCardItem = ({ main, roi, commission }) => {
	return (
		<div className="account-card-container">
			<div className="account-card-row">
				<div className="main-account_card card-item">
					<div className="account-card-inner">
						<div className="account-card-name">Main Account</div>
						<div className="account-card-bal">
							<div className="account-btc-bal">{formatter.format(main)}</div>
						</div>
					</div>
				</div>
				<div className="roi-account_card card-item">
					<div className="account-card-inner">
						<div className="account-card-name">ROI Account</div>
						<div className="account-card-bal">
							<div className="account-btc-bal">{formatter.format(roi)}</div>
						</div>
					</div>
				</div>
				<div className="commission-account_card card-item">
					<div className="account-card-inner">
						<div className="account-card-name">Commision Account</div>
						<div className="account-card-bal">
							<div className="account-btc-bal">
								{formatter.format(commission)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

// axios
// 			.get(`https://bcnetworks.herokuapp.com/wallet/${email}`, config)
// 			.then((response) => {
// 				setWalletDetails(response.data.data);
// 			})
// 			.catch((error) => {
// 				console.log(error);
// 			});
