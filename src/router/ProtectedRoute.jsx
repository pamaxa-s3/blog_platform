// ProtectedRoute.jsx

import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated, redirectTo = '/login', children }) => {
	const location = useLocation();

	if (!isAuthenticated) {
		return <Navigate to={redirectTo} replace state={{ from: location }} />;
	}

	return children;
};

export default ProtectedRoute;