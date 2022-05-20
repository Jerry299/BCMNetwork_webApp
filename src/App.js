import "./App.css";
import Landing from "./components/LandingPage/Landing";
import SignIn from "./components/SignIn/SignIn";
import Signup from "./components/SignUp/Signup";
import Signup2 from "./components/SignUp/Signup2";
import { UserProvider } from "./Context/UserRegister";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfile from "./components/Profile/UserProfile";

function App() {
	return (
		<BrowserRouter>
			<UserProvider>
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/signin" element={<SignIn />} />
					<Route path="/register" element={<Signup />} />
					<Route path="/register-contd" element={<Signup2 />} />
					<Route path="/profile" element={<UserProfile />} />
				</Routes>
			</UserProvider>
		</BrowserRouter>
	);
}

export default App;
