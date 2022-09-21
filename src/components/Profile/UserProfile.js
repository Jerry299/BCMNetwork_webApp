import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import profilePic from "../../images/profilePic.png";
import { Link } from "react-router-dom";
import { Space, Spin } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchInvestor } from "../../features/investorSlice";
import { toast } from "react-toastify";
import {
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined,
} from "@ant-design/icons";
import { Menu, Drawer } from "antd";

const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",

	// These options are needed to round to whole numbers if that's what you want.
	//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
	//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});
export default function UserProfile() {
	const [visible, setVisible] = useState(false);

	//const location = useLocation();
	const { user } = useSelector((state) => state.userReducer);
	const { isError, message, combined, roi, commission, main, isLoading } =
		useSelector((state) => state.investorSlice);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchInvestor(user.email));
		if (isError) {
			toast.error(`Error! ${message}`, {
				position: toast.POSITION.TOP_LEFT,
			});
		}
	}, [isError, user.email, dispatch, message]);
	const handleMenu = () => {
		setVisible(true);
	};
	const onClose = () => {
		setVisible(false);
	};

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
					<ProfileNavBar
						name={user?.firstName}
						handleMenu={handleMenu}
						visible={visible}
						onClose={onClose}
					/>
					<Board combined={combined} />
					<Transactions />
					<AccountCardItem commission={commission} roi={roi} main={main} />
				</div>
			)}
		</div>
	);
}
export const ProfileNavBar = ({ name, visible, onClose, handleMenu }) => {
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

				<section className="mobile-menu-items">
					<div className="burger-container" onClick={handleMenu}>
						<div className="burger"></div>
						<div className="burger"></div>
						<div className="burger"></div>
					</div>
					<Drawer
						
						placement="right"
						onClose={onClose}
						visible={visible}
						// style={{ backgroundColor: "#0B5BA1" }}
					>
						<Menu
							mode="inline"
							defaultSelectedKeys={["4"]}
							items={[
								UserOutlined,
								VideoCameraOutlined,
								UploadOutlined,
								UserOutlined,
							].map((icon, index) => ({
								key: String(index + 1),
								icon: React.createElement(icon),
								label: `nav ${index + 1}`,
							}))}
						/>
					</Drawer>
				</section>
			</section>
			{/* {menuShow && (
				<div className="nav-menu-container">
					<ul className="nav-menu">
						<li>Test 1</li>
						<li>Test 1</li>
						<li>Test 1</li>
						<li>Test 1</li>
						<li>Test 1</li>
						<li>Test 1</li>
						<li>Test 1</li>
					</ul>
				</div>
			)} */}
		</nav>
	);
};

export const Board = ({ combined }) => {
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

export const Transactions = () => {
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

export const AccountCardItem = ({ main, roi, commission }) => {
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
