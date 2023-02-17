import { useState, useEffect, useContext } from 'react';
import { onSnapshot, doc, DocumentData } from 'firebase/firestore';
import { Link } from 'react-router-dom';

import { db } from '../firebase/firebaseconfig';

import { ChatBox, ChatListHeader } from './index';

import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const ChatContainer = () => {
	const [searchValue, setSearchValue] = useState('');
	const [chats, setChats] = useState<DocumentData | undefined>([]);

	const { currentUser } = useContext(AuthContext);
	const { data } = useContext(ChatContext);

	useEffect(() => {
		if (currentUser?.uid) {
			const unsub = onSnapshot(
				doc(db, 'userChat', currentUser.uid),
				(doc) => {
					setChats(doc.data());
				}
			);

			return () => {
				unsub();
			};
		}
	}, [currentUser]);

	return (
		<div
			className={`chatcontainer ${
				data.user.displayName ? 'display--none' : 'display'
			}`}
		>
			<ChatListHeader
				searchValue={searchValue}
				setSearchValue={setSearchValue}
			/>
			<div className='chatcontainer__holder'>
				<Link to={'/add-users'} style={LinkStyle}>
					Add Chat
				</Link>

				{chats &&
					Object.entries(chats)
						?.sort((a, b) => b[1].date - a[1].date)
						.map((chat) => (
							<ChatBox key={chat[0]} chat={chat[1]} />
						))}
			</div>
		</div>
	);
};

export default ChatContainer;

const LinkStyle = {
	textDecoration: 'none',
	display: 'block',
	textAlign: 'center',
	color: 'darkblue',
	padding: '10px 0',
	backgroundColor: 'khaki',
	width: '100%',
} as React.CSSProperties;
