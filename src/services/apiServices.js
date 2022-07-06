import axios from "axios";
import {
	loginUrl,
	registerUrl,
	getUser,
	uploadProofUrl,
	depositUrl,
	withdrawUrl,
} from "./urls";

export const registerUser = async (data) => {
	let response = await axios({
		method: "POST",
		url: registerUrl,
		data,
	});
	return response.data;
};

export const loginUser = async (data) => {
	let response = await axios({
		method: "POST",
		url: loginUrl,
		data,
	});
	return response.data;
};

export const fetchUser = async (email, token) => {
	let response = await axios({
		method: "GET",
		url: `${getUser}${email}`,
		headers: { Authorization: `Bearer ${token}` },
	});
	return response.data;
};

export const uploadDepositProof = async (file) => {
	let response = await axios({
		method: "POST",
		url: uploadProofUrl,
		file,
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	return response.data;
};

export const deposit = async (data) => {
	let response = await axios({
		method: "POST",
		url: depositUrl,
		data,
	});
	return response.data;
};
export const withdrawal = async (data, token) => {
	let response = await axios({
		method: "POST",
		url: withdrawUrl,
		data,
		headers: { Authorization: `Bearer ${token}` },
	});
	return response.data;
};
