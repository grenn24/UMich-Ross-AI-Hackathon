import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/styles/app.css";

import MainLayout from "./layouts/MainLayout";

import AdvisorDashboard from "./pages/AdvisorDashboard";
import StudentProfile from "./pages/StudentProfile";
import PulseVisualization from "./pages/PulseVisualisation";
import OracleEngine from "./pages/OracleEngine";
import NotFound from "./pages/NotFound";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>

				{/* Layout wrapper */}
				<Route element={<MainLayout />}>

					<Route index element={<AdvisorDashboard />} />
					<Route path="profile" element={<StudentProfile />} />
					<Route path="visualization" element={<PulseVisualization />} />
					<Route path="oracle" element={<OracleEngine />} />

				</Route>

				{/* Missed routes */}
				<Route path="*" element={<NotFound />} />

			</Routes>
		</BrowserRouter>
	);
};

export default App;