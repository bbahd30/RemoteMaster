import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import TestPage from "./Pages/TestPage";
import BookingPage from "./Pages/BookingPage";

function App() {
	return (
		<>
			<div className="container">
				<Router>
					<Routes>
						<Route exact path="/" element={<LoginPage />} />
						<Route exact path="/home" element={<HomePage />} />
						<Route exact path="/tests" element={<TestPage />} />
						<Route exact path="/tests" element={<BookingPage />} />
					</Routes>
				</Router>
			</div>
		</>
	);
}

export default App;
