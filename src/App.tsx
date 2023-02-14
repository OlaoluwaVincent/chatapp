import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Index from './pages/Index';

type Props = {};

const App = (props: Props) => {
	return (
		<BrowserRouter>
			<Index />

			<ToastContainer />
		</BrowserRouter>
	);
};

export default App;
