import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login, MainContainer, Register, AddUser } from '../components';
import { AuthContext } from '../context/AuthContext';

const Index = () => {
	const { currentUser } = useContext(AuthContext);

	const ProtectedRoutes = ({ children }: React.PropsWithChildren<{}>) => {
		if (!currentUser) {
			return <Navigate to='/login' />;
		}
		return <>{children}</>;
	};

	return (
		<Routes>
			<Route
				path='/'
				element={
					<ProtectedRoutes>
						<MainContainer />
					</ProtectedRoutes>
				}
			/>

			<Route path='/add-users' element={<AddUser />} />

			<Route path='/login' element={<Login />} />

			<Route path='/register' element={<Register />} />
		</Routes>
	);
};

export default Index;
