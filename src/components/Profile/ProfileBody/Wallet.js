import React from "react";
import Board from "./Board";
import "./Wallet.css";

export default function Wallet() {
	return (
		<div className="wallet-container">
			<div className="wallet-row">
                <Board />
            </div>
		</div>
	);
}
