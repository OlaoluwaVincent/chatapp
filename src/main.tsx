import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './scss/styles/styles.min.css';
import { AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<AuthContextProvider>
		<ChatContextProvider>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</ChatContextProvider>
	</AuthContextProvider>
);
