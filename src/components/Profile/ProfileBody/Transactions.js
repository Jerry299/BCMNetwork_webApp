import React from "react";
import { Link } from "react-router-dom";
import "./Wallet.css";

export default function Transactions() {
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
}
