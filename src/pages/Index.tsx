import { Routes, Route } from 'react-router-dom';
import { Login, MessageContainer, Register } from '../components';
import { PrivateRoute } from '../components';
type Props = {};

const Index = (props: Props) => {
	return (
		<Routes>
			<Route path='/' element={<PrivateRoute />}>
				<Route path='/' element={<MessageContainer />} />
			</Route>
			<Route path='/login' element={<Login />} />
			<Route path='/login' element={<Register />} />
		</Routes>
	);
};

export default Index;
