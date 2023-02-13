import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Index from './pages/Index';
import { Loading } from './components';

type Props = {};

const App = (props: Props) => {
	return (
		<BrowserRouter>
			<div>
				<Index />
				<ToastContainer />
			</div>
		</BrowserRouter>
	);
};

export default App;
