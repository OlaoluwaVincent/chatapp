import { useState, useEffect, useContext } from 'react';
import { ChatBox, ChatListHeader } from './index';
import { onSnapshot, doc, DocumentData } from 'firebase/firestore';
import { db } from '../firebase/firebaseconfig';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { ChatContext } from '../context/ChatContext';

type Props = {};

const ChatContainer = (props: Props) => {
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
			<Link to={'/add-users'} style={LinkStyle}>
				Add Chat
			</Link>

			{chats &&
				Object.entries(chats)
					?.sort((a, b) => b[1].date - a[1].date)
					.map((chat) => <ChatBox key={chat[0]} chat={chat[1]} />)}
		</div>
	);
};

export default ChatContainer;

const LinkStyle = {
	textDecoration: 'none',
	textAlign: 'center',
	color: 'darkblue',
	padding: '10px 0',
	fontWeight: 'lighter',
	backgroundColor: 'khaki',
} as React.CSSProperties;
