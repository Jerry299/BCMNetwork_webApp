import React, { useEffect, useState } from "react";
import "./DepositAndWithdraw.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Spin, Space } from "antd";

import {
	resetWithdrawForm,
	makeWithdrawal,
	setAmount,
	setWallet,
	setWithDrawFrom,
} from "../../../features/withdrawSlice";
import { FormDropDown } from "../../../form_dropdown/FormDropDown";

const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",

	// These options are needed to round to whole numbers if that's what you want.
	//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
	//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export default function Withdraw() {
	//const [amount, setAmount] = useState(null);
	const [withdrawError, setWithdrawError] = useState("");
	const dispatch = useDispatch();
	const {
		amountToWithdraw,
		recieveWallet,
		isLoading,
		accountToWithdrawFrom,
		isError,
		isSuccess,
		message,
	} = useSelector((state) => state.withdrawSlice);
	const { combined, main, commission, roi } = useSelector(
		(state) => state.investorSlice
	);
	//console.table(combined, main, commission, roi)

	const options = ["main", "commission", "roi"];
	const { email } = useSelector((state) => state.userReducer.user);
	const navigate = useNavigate();
	// do some validation

	const handleWithdraw = async () => {
		console.log(withdrawError);
		if (
			(withdrawError.amount === "" ||
				withdrawError.amount < 1 ||
				withdrawError.amount === undefined) &&
			(withdrawError.wallet === "" || !withdrawError.wallet)
		) {
			const data = {
				email: email,
				amount: amountToWithdraw,
				wallet: accountToWithdrawFrom,
				payto: recieveWallet,
			};
			await dispatch(makeWithdrawal(data));
			dispatch(resetWithdrawForm());
			navigate("/profile");
		} else {
			toast.error(`Error! Insufficient Balance`, {
				position: toast.POSITION.TOP_LEFT,
			});
		}
	};

	const data = useSelector(
		(state) => state.investorSlice[accountToWithdrawFrom]
	);
	useEffect(() => {
		const checkAmount = (value, account) => {
			const error = { amount: "", wallet: "" };
			if (value < 50) {
				error.amount = "Amount should be greater than 50";
			} else if (!value) {
				error.amount = "amount cannot be empty";
			} else if (value > parseInt(data)) {
				error.amount = "You don't have sufficient balance";
			} else if (account === "") {
				error.wallet = "Please Enter a Bitcoin Wallet";
			}
			setWithdrawError(error);
		};
		checkAmount(amountToWithdraw, accountToWithdrawFrom);
	}, [amountToWithdraw, accountToWithdrawFrom, data]);
	useEffect(() => {
		if (isError) {
			toast.error(`Error! ${message}`, {
				position: toast.POSITION.TOP_LEFT,
			});
		}
		if (isSuccess) {
			toast.success(`Success! Withdrawal Underway,check wallet`, {
				position: toast.POSITION.TOP_LEFT,
			});
		}
	}, [isSuccess, isError, message, amountToWithdraw]);

	return (
		<div className="withdraw-container">
			<div className="withdraw-row">
				<span>
					<FontAwesomeIcon icon={faArrowLeft} onClick={() => navigate(-1)} />
				</span>

				<div className="withdraw-form">
					<div className="deposit-header">
						<h3 style={{ color: "#2666CF" }}>
							Withdrawal Form (Payment In Bitcoin)
						</h3>
					</div>
					<div className="withdraw-balance" style={{ textAlign: "center" }}>
						.....
					</div>
					<div className="withdraw-form-item">
						<div className="withdraw-form-item">
							<FormDropDown
								placeholder="select account for withdrawal....."
								className="full-width"
								options={options}
								onChange={(value) => dispatch(setWithDrawFrom(value))}
							/>
							<small className="error">{withdrawError.wallet}</small>
						</div>
					</div>
					<div className="withdraw-form-item">
						<div className="withdraw-form-item">
							<label>Amount</label>
							<input
								type="number"
								onChange={(e) => dispatch(setAmount(e.target.value))}
								required
								placeholder="Enter amount here"
								value={amountToWithdraw}
							/>
							<small className="error">{withdrawError.amount}</small>
						</div>
					</div>

					<div className="withdraw-form-item">
						<div className="withdraw-form-item">
							<label>Recipient Wallet Address</label>
							<input
								type="text"
								placeholder="Enter your wallet address here"
								onChange={(e) => dispatch(setWallet(e.target.value))}
								value={recieveWallet}
							/>
							<small className="error"></small>
							<small className="error">
								Please make sure this address is correct, Action not reversable
							</small>
						</div>
					</div>

					<div className="withdraw-btn submit" onClick={() => handleWithdraw()}>
						{isLoading ? (
							<div className="example">
								<Space size="middle">
									<Spin size="small" />
								</Space>
							</div>
						) : (
							"Withdraw"
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
