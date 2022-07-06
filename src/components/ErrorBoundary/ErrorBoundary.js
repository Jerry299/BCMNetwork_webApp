import React from "react";
import ErrorPage from "./ErrorPage";
class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: null, errorInfo: null };
	}
	static getDerivedStateFromError = (error) => {
		return { hasError: true };
	};

	componentDidCatch(error, errorInfo) {
		this.setState({
			hasError: true,
			error: error,
			errorInfo: errorInfo,
		});
	}

	render() {
		// console.log(
		// 	this.state.hasError,
		// 	" error here",
		// 	this.state.error,
		// 	"error",
		// 	this.state.errorInfo
		// );
		const { error, errorInfo, hasError } = this.state;
		if (hasError) {
			return <ErrorPage error={error} errorInfo={errorInfo} />;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
