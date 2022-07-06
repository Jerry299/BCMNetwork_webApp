import React from "react";
import "./DepositAndWithdraw.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setDeposit } from "../../../features/depositSlice";

export default function Deposit() {
	let navigate = useNavigate();
	const dispatch = useDispatch();
	const { amountToDeposit } = useSelector((state) => state.depositSlice);
	

	return (
		<div className="deposit-container">
			<div className="deposit-row">
				<span>
					<FontAwesomeIcon icon={faArrowLeft} onClick={() => navigate(-1)} />
				</span>
				<div className="deposit-form">
					<div className="deposit-header">
						<h3>DEPOSIT.</h3>
					</div>
					<div className="deposit-form-item">
						<label>Payment Currency</label>
						<input
							type="text"
							value={"Bitcoin"}
							readOnly
							className="readonly"
						/>
					</div>

					<div className="deposit-form-item">
						<label htmlFor="deposit_amount">
							Amount <span className="required">required</span>
						</label>
						<input
							type="number"
							name="deposit_amount"
							placeholder="5000"
							onChange={(e) => dispatch(setDeposit(e.target.value))}
							value={amountToDeposit}
						/>
					</div>
					<Link to="/deposit-contd">
						<div className="deposit-next">PROCEED</div>
					</Link>
				</div>
			</div>
		</div>
	);
}
