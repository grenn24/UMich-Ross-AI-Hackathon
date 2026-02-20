import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../pages/Loading";

const ProtectedRoutes = () => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
		null
	);

	useEffect(() => {
		if (sessionStorage.getItem("X-Access-Token")) {
			setIsAuthenticated(true);
		} else {
			// runs once every component mount only
			setIsAuthenticated(false);
		}
	}, []);

	if (isAuthenticated === null) {
		return <Loading />;
	}
	return isAuthenticated ? <Outlet /> : <Navigate replace to="/" />;
};

export default ProtectedRoutes;
