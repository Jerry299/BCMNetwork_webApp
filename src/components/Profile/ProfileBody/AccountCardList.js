import React from "react";
import AccountCardItem from "./AccountCardItem";
import "./Accounts.css";

export default function AccountCardList() {
	return (
		<div className="account-cardlist-container">
			<div className="account-cardlist-row">
				<AccountCardItem />
			</div>
		</div>
	);
}
