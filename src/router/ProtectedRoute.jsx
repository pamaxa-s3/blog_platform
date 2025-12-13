import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/common/LoadingSpinner'


const ProtectedRoute = ({ redirectTo = '/login', children }) => {
	const { isAuthenticated, isLoading } = useAuth();
	const location = useLocation();


	if (isLoading) return <LoadingSpinner />;

	if (!isAuthenticated) {
		return <Navigate to={redirectTo} replace state={{ from: location }} />;
	}


	return children;
};


export default ProtectedRoute;