import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Layout from "./Layout/index";
import Admin from "./Pages/Admin";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />} />
					<Route path="dashboard" element={<Dashboard />} />
					<Route path="Admin" element={<Admin />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
