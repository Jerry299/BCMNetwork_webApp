import React from "react";
import "./Wallet.css";
import { numberWithCommas } from "../../../utils/formatNumber";
import useAuth from "../../../hooks/useAuth";

export default function Board() {
	const { walletDetails } = useAuth();

	return (
		<section className="board-container">
			<div className="board-row">
				<section className="board">
					<div>BCN Portfolio</div>
					<div className="board-main-account">
						$ {numberWithCommas(walletDetails.combined)}
					</div>
				</section>
				{/* <section className="board-indicator">+ 15 %</section> */}
			</div>
		</section>
	);
}
