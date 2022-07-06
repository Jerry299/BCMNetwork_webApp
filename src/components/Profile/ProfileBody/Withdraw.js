import React, { useEffect, useState } from "react";
import "./DepositAndWithdraw.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../../hooks/useAuth";
import { numberWithCommas } from "../../../utils/formatNumber";

export default function Withdraw() {
	const [amount, setAmount] = useState(null);
	const [withdrawError, setWithdrawError] = useState("");
	const { loggedInUser } = useAuth();
	const navigate = useNavigate();

	const handleAmount = (e) => {
		setAmount(e.target.value);
	};

	useEffect(() => {
		const value = { amount };
		const checkAmount = (value) => {
			const error = { amount: "" };
			console.log(value.amount);
			if (value.amount < 50) {
				error.amount = "Amount should be greater than 50";
			} else if (value.amount > loggedInUser.loggedInUserMainAccount) {
				error.amount = "Amount exceeds your current balance";
			} else if (!value.amount) {
				error.amount = "amount cannot be empty";
			}

			return error;
		};

		setWithdrawError(checkAmount(value));
	}, [amount, loggedInUser.loggedInUserMainAccount]);

	return (
		<div className="withdraw-container">
			<div className="withdraw-row">
				<span>
					<FontAwesomeIcon icon={faArrowLeft} onClick={() => navigate(-1)} />
				</span>

				<div className="withdraw-form">
					<div className="deposit-header">
						<h3 style={{ color: "#2666CF" }}>Withdrawal Form Bitcoin</h3>
						<h5>
							Remember withdrawals can only be done from Main account balance.
						</h5>
					</div>
					<div className="withdraw-form-item">
						<div className="withdraw-balance" style={{ textAlign: "center" }}>
							Main balance is ${" "}
							{numberWithCommas(loggedInUser.loggedInUserMainAccount)}
						</div>
						<div className="withdraw-form-item">
							<label>Amount</label>
							<input
								type="number"
								value={amount}
								onChange={handleAmount}
								required
								placeholder="Enter amount here"
							/>
							<small className="error">{withdrawError.amount}</small>
						</div>
					</div>
					<div className="withdraw-form-item">
						<div className="withdraw-form-item">
							<label>Recipient Wallet Address</label>
							<input type="text" placeholder="Enter your wallet address here" />
							<small className="error"></small>
						</div>
					</div>
					<Link to="/deposit-contd">
						<div className="withdraw-btn submit">Withdraw</div>
					</Link>
				</div>
			</div>
		</div>
	);
}
