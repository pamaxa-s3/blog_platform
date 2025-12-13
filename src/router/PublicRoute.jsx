import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/common/LoadingSpinner';

const PublicRoute = ({ redirectTo = '/dashboard', children }) => {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) {
		return <LoadingSpinner />;
	}

	if (isAuthenticated) {
		return <Navigate to={redirectTo} replace />;
	}

	return children;
};

export default PublicRoute;
