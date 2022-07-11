import { Button } from "antd";
import "./ErrorPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceGrimace } from "@fortawesome/free-solid-svg-icons";

const ErrorPage = ({ error, errorInfo }) => {
	return (
		<div className="error-container">
			<div className="error-row">
				<h3 style={{ textAlign: "center" }}>Whooops, We have a problem</h3>
				<p style={{ textAlign: "center" }}>
					{" "}
					<FontAwesomeIcon icon={faFaceGrimace} size="2x" id="icon" />
				</p>
				<h4 style={{ textAlign: "center" }}>
					We are fixing the problem, Please Log In.
				</h4>
				<div className="btn-ctn">
					{/* <Button
						type="primary"
						className="error-btn"
						onClick={() => (window.location.href = "/")}
					>
						Refresh Page
					</Button> */}
					<Button
						className="error-btn"
						onClick={() => window.location.replace("/signin")}
					>Log In</Button>
				</div>
			</div>
		</div>
	);
};
export default ErrorPage;
