import React, { useState, useEffect } from "react";
import "./DepositAndWithdraw.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCopy } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import { conversionRate } from "../../../utils/formatNumber";
import { useSelector, useDispatch } from "react-redux";
import {
	setDeposit,
	setImage,
	resetDeposit,
	resetImage,
	postProof,
	makeDeposit,
} from "../../../features/depositSlice";

export default function Deposit() {
	const [copied, setCopied] = useState(false);
	//const [selectedImage, setSelectedImage] = useState(undefined);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const { amountToDeposit, imageProof, isLoading, isSuccess, isError } =
		useSelector((state) => state.depositSlice);

	let navigate = useNavigate();
	//context

	//handle copied show state
	const showCopied = () => {
		navigator.clipboard.writeText("TesterInSHow Copied");
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 1000);
	};

	const handleDeposit = () => {
		if (error === null) {
			const formData = new FormData();
			formData.append("image", imageProof);
			try {
				dispatch(postProof(formData));
				try {
					dispatch(makeDeposit(amountToDeposit));
				} catch (error) {
					console.log(error, " inner catch block");
				}
			} catch (error) {
				console.log(error, " inner catch block");
			}
		}
	};

	useEffect(() => {
		if (parseInt(amountToDeposit) < Number(100)) {
			setError("Amount should be more that 100");
		} else if (imageProof === undefined) {
			setError("Proof of Payment is required.");
		}
		console.log(imageProof);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [amountToDeposit]);

	let btcValue = parseFloat(conversionRate()) * parseFloat(amountToDeposit);

	return (
		<div className="deposit-container">
			<div className="deposit-row">
				<span>
					<FontAwesomeIcon icon={faArrowLeft} onClick={() => navigate(-1)} />
				</span>
				<div className="deposit-form">
					<div className="deposit-header">
						<h3 style={{ color: "#2666CF" }}>Complete Deposit.</h3>
					</div>
					<div className="deposit-rate">
						<div>
							${amountToDeposit} = {Number(btcValue)} BTC
						</div>
						<small>
							Rates vary with current price, please complete transaction within
							10 minutes.
						</small>
					</div>
					<div className="deposit-form-item" id="deposit-form-item-1">
						<label htmlFor="deposit_amount">Company Bitcoin Address</label>
						<input
							type="text"
							readOnly
							className="wallet-address"
							value="j3ej38eTTTGVBBoejay237wayu3y3jejk&*@(bdwjjb2&#@hajkjdjk"
						/>
						{copied && <span className="tooltip">Copied</span>}
						<FontAwesomeIcon
							icon={faCopy}
							className="copy"
							onClick={showCopied}
						/>
					</div>

					<div className="deposit-form-item">
						<label htmlFor="deposit_image">
							Proof of Payment Image <span className="required">required</span>
						</label>
						<input
							type="file"
							name={imageProof}
							onChange={(event) => {
								dispatch(setImage(event.target.files[0]));
							}}
						/>
						{imageProof && (
							<div>
								<img
									alt="not found"
									width={"250px"}
									src={URL.createObjectURL(imageProof)}
								/>
								<br />
								<button onClick={() => dispatch(resetImage())}>Remove</button>
							</div>
						)}
					</div>
					{/* errr display */}
					<small style={{ color: "#FF1818" }}>{error}</small>
					<Link to="/deposit-contd">
						<div
							className="deposit-next submit"
							onClick={() => handleDeposit()}
						>
							Deposit
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}
