import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { AuthContext } from './AuthContext';

interface ChatContext {
	data: ChatState;
	dispatch: React.Dispatch<ChatAction>;
}

export interface ChatState {
	chatId: string;
	user: {
		uid: string;
		displayName: string;
		photoURL?: string;
		email: string;
	};
}

interface ChangeUserAction {
	type: 'CHANGE_USER';
	payload: {
		uid: string;
		displayName: string;
		photoURL?: string;
		email: string;
	};
}

type ChatAction = ChangeUserAction;

export const ChatContext = createContext<ChatContext>({
	data: {
		chatId: '',
		user: {
			uid: '',
			displayName: '',
			email: '',
		},
	},
	dispatch: () => {},
});

export const ChatContextProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const { currentUser } = useContext(AuthContext);

	const INITIAL_STATE: ChatState = {
		chatId: '',
		user: {
			uid: '',
			displayName: '',
			photoURL: '',
			email: '',
		},
	};

	const chatReducer = (state: ChatState, action: ChatAction) => {
		if (currentUser?.uid) {
			switch (action.type) {
				case 'CHANGE_USER':
					return {
						user: action.payload,
						chatId:
							currentUser?.uid < action.payload.uid
								? currentUser?.uid + action.payload.uid
								: action.payload.uid + currentUser?.uid,
					};
				default:
					return state;
			}
		}
		return state;
	};

	const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

	return (
		<ChatContext.Provider value={{ data: state, dispatch }}>
			{children}
		</ChatContext.Provider>
	);
};
