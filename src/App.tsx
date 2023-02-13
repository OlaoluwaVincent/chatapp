import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Accounts } from './components';

type Props = {};

const App = (props: Props) => {
	return (
		<div className='App'>
			<Accounts />
			<ToastContainer />
		</div>
	);
};

export default App;
