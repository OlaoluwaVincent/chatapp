import { Routes, Route } from 'react-router-dom';
import { Login, MainContainer, Register } from '../components';
import { PrivateRoute } from '../components';
type Props = {};

const Index = (props: Props) => {
	return (
		<Routes>
			<Route path='/' element={<PrivateRoute />}>
				<Route path='/' element={<MainContainer />} />
			</Route>
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />
		</Routes>
	);
};

export default Index;
