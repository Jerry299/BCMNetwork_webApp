import React, { useContext } from "react";
import { DepositProvider } from "../../../Context/UserDeposit";
import AuthUser from "../../../Context/AuthUser";
import AccountCardList from "./AccountCardList";
import Board from "./Board";
import Transactions from "./Transactions";
import "./Wallet.css";

export default function Wallet() {
	return (
		<div className="wallet-container">
			<div className="wallet-row">
				<Board />
				<DepositProvider>
					<Transactions />
				</DepositProvider>
				<AccountCardList />
				{/* <div className="wallet-footer-container">
					<div className="wallet-footer-row">
						<div></div>
						<div></div>
						<div></div>
					</div>
				</div> */}
			</div>
		</div>
	);
}
