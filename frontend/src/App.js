import "./App.css";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from "react-router-dom";

import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import TestPage from "./Pages/TestPage";
import BookingPage from "./Pages/BookingPage";

import Sidebar from "./Components/Sidebar";
import Navigation from "./Components/Navigation";
import ParameterPage from "./Pages/ParameterPage";
import PatientPage from "./Pages/PatientPage";

function App() {
	return (
		<Router>
			<AppContent />
		</Router>
	);
}

function AppContent() {
	const location = useLocation();
	const showSidebarAndNavbar = !["/", "/login"].includes(location.pathname);

	return (
		<div className="app" style={{ display: "flex" }}>
			{showSidebarAndNavbar && <Sidebar />}
			<div
				style={{ flex: 1, paddingLeft: showSidebarAndNavbar ? 280 : 0 }}
			>
				{showSidebarAndNavbar && <Navigation />}
				<div style={{ padding: 16 }}>
					<Routes>
						<Route exact path="/" element={<LoginPage />} />
						<Route exact path="/tests" element={<TestPage />} />
						<Route
							exact
							path="/patients"
							element={<PatientPage />}
						/>

						<Route
							exact
							path="/parameters"
							element={<ParameterPage />}
						/>
						<Route
							exact
							path="/bookings"
							element={<BookingPage />}
						/>
					</Routes>
				</div>
			</div>
		</div>
	);
}

export default App;
