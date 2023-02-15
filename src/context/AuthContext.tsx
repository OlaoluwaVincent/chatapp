import { User, onAuthStateChanged } from 'firebase/auth';
import { createContext, useState, useEffect, FC, ReactNode } from 'react';
import { auth } from '../firebase/firebaseconfig';

interface AuthContextProps {
	currentUser: User | null;
}

export const AuthContext = createContext<AuthContextProps>({
	currentUser: null,
});

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	useEffect(() => {
		const sub = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
		});

		return () => {
			sub();
		};
	}, []);

	return (
		<AuthContext.Provider value={{ currentUser }}>
			{children}
		</AuthContext.Provider>
	);
};
