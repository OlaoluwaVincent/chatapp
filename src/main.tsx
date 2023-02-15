import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './scss/styles/styles.min.css';
import { AuthContextProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<AuthContextProvider>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</AuthContextProvider>
);
