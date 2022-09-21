import React, { useState, useEffect } from "react";
import "./DepositAndWithdraw.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCopy } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import { conversionRate } from "../../../utils/formatNumber";
import { useSelector, useDispatch } from "react-redux";
import { Space, Spin } from "antd";
import "antd/es/spin/style/css";
import { toast } from "react-toastify";
import { handleImageUpload } from "../../../hooks/imageCompression";
import { resetDeposit, makeDeposit } from "../../../features/depositSlice";

export default function Deposit() {
	const [copied, setCopied] = useState(false);
	const [selectedImage, setSelectedImage] = useState(undefined);
	const [imgFile, setImgFile] = useState(undefined)
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const { amountToDeposit, isLoading, isSuccess, isError, message } =
		useSelector((state) => state.depositSlice);
	const { email } = useSelector((state) => state.userReducer.user);
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
		console.log(error);
		if (error === null) {
			const formData = new FormData();
			formData.append("image", selectedImage);
			formData.append("email", email);
			formData.append("amount", amountToDeposit);
			formData.append("rate", 0.5);
			console.table(formData);
			dispatch(makeDeposit(formData));
		}
	};

	useEffect(() => {
		if (parseInt(amountToDeposit) < Number(100) || !parseInt(amountToDeposit)) {
			setError("Amount should be more that 100");
		}
	}, [amountToDeposit]);
	useEffect(() => {
		const controller = new AbortController();
		if (isError) {
			toast.error(`Error! ${message}`, {
				position: toast.POSITION.TOP_LEFT,
			});
			//dispatch(resetDeposit());
		}
		if (isSuccess) {
			toast.success(`Success! Deposit Successful`, {
				position: toast.POSITION.TOP_LEFT,
			});
			dispatch(resetDeposit());
		}
		return () => controller.abort();
	}, [dispatch, isError, isSuccess, message]);
	console.table(
		isError,
		isSuccess,
		isLoading,
		message,
		" error sucess loading msg"
	);

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
							name="file"
							onChange={(event) => {
								//dispatch(setImage(event.target.files[0]));
								setImgFile(event.target.files[0])
								console.log(event.target.files[0]);
								const reader = new FileReader();
								reader.readAsDataURL(event.target.files[0]);
								reader.onloadend = () => {
								  setSelectedImage(reader.result);
								  console.log(selectedImage , " selected images")
								};
								//setImgFile(event.target.files[0]);
							}}
						/>
						{selectedImage && (
							<div>
								<img
									alt="not found"
									width={"250px"}
									src={URL.createObjectURL(imgFile)}
								/>
								<br />
								<button onClick={() => setSelectedImage(undefined)}>
									Remove
								</button>
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
							{isLoading ? (
								<div className="example">
									<Space size="middle">
										<Spin size="small" />
									</Space>
								</div>
							) : (
								"Deposit"
							)}
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}
