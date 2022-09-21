import "./App.css";
import Landing from "./components/LandingPage/Landing";
import SignIn from "./components/SignIn/SignIn";
import Signup from "./components/SignUp/Signup";
import Signup2 from "./components/SignUp/Signup2";
import { UserProvider } from "./Context/UserRegister";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfile from "./components/Profile/UserProfile";
import EmailConfirm from "./components/EmailConfirm/EmailConfirm";
import Deposit from "./components/Profile/ProfileBody/Deposit";
import Deposit2 from "./components/Profile/ProfileBody/Deposit2";
import Withdraw from "./components/Profile/ProfileBody/Withdraw";
import { DepositProvider } from "./Context/UserDeposit";
import ProtectedRoute from "./components/Profile/ProtectedRoute/ProtectedRoute";
import BigScreen from "./components/Big Screen/BigScreen";
import useWindowSize from "./utils/useWindowSize";
import Spinner from "./TestSpin/Spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

function App() {
	const { width } = useWindowSize();
	if (width > 500) {
		return <BigScreen />;
	}
	return (
		<BrowserRouter>
			<ErrorBoundary>
				<UserProvider>
					<DepositProvider>
						<Routes>
							<Route path="/" element={<Landing />} />
							<Route path="/signin" element={<SignIn />} />
							<Route path="/register" element={<Signup />} />
							<Route path="/register-contd" element={<Signup2 />} />
							<Route path="/confirmation" element={<EmailConfirm />} />
							<Route path="/test" element={<Spinner />} />
							<Route element={<ProtectedRoute />}>
								<Route path="/profile" element={<UserProfile />} />
								<Route path="/deposit" element={<Deposit />} />
								<Route path="/deposit-contd" element={<Deposit2 />} />
								<Route path="/withdraw" element={<Withdraw />} />
							</Route>
						</Routes>
						<ToastContainer limit={2} pauseOnFocusLoss={false} />
					</DepositProvider>
				</UserProvider>
			</ErrorBoundary>
		</BrowserRouter>
	);
}

export default App;
