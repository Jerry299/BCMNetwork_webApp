import React, { useContext } from "react";
import "./Accounts.css";
import AuthUser from "../../../Context/AuthUser";
import { numberWithCommas, conversionRate } from "../../../utils/formatNumber";

export default function AccountCardItem() {
	let { walletDetails } = useContext(AuthUser);
	console.log(walletDetails, " account card item");
	return (
		<div className="account-card-container">
			<div className="account-card-row">
				<div className="main-account_card card-item">
					<div className="account-card-inner">
						<div className="account-card-name">Main Account</div>
						<div className="account-card-bal">
							<div className="account-btc-bal">
								BTC {numberWithCommas(walletDetails.main)}
							</div>
							<div className="account-dollar-bal">
								$ {parseFloat(walletDetails.main * conversionRate()).toFixed(6)}
							</div>
						</div>
					</div>
				</div>
				<div className="roi-account_card card-item">
					<div className="account-card-inner">
						<div className="account-card-name">ROI Account</div>
						<div className="account-card-bal">
							<div className="account-btc-bal">
								BTC {numberWithCommas(walletDetails.roi)}
							</div>
							<div className="account-dollar-bal">
								$ {parseFloat(walletDetails.roi * conversionRate()).toFixed(6)}
							</div>
						</div>
					</div>
				</div>
				<div className="commission-account_card card-item">
					<div className="account-card-inner">
						<div className="account-card-name">Commision Account</div>
						<div className="account-card-bal">
							<div className="account-btc-bal">
								BTC {numberWithCommas(walletDetails.commission)}
							</div>
							<div className="account-dollar-bal">
								${" "}
								{parseFloat(
									walletDetails.commission * conversionRate()
								).toFixed(6)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
