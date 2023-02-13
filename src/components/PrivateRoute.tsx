import useAuthStatus from '../hooks/useAuthStatus';
import { Navigate, Outlet } from 'react-router-dom';
import Loading from './Loading';

const PrivateRoute = () => {
	const { loggedIn, checkingUser } = useAuthStatus();

	if (checkingUser) {
		return <Loading />;
	}

	return loggedIn ? <Outlet /> : <Navigate to={'/'} />;
};

export default PrivateRoute;
