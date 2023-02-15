import { useState, useEffect, useContext } from 'react';
import { ChatBox, ChatListHeader } from './index';
import { onSnapshot, doc, DocumentData } from 'firebase/firestore';
import { db } from '../firebase/firebaseconfig';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

type Props = {};

const ChatContainer = (props: Props) => {
	const [searchValue, setSearchValue] = useState('');
	const [chats, setChats] = useState<DocumentData | undefined>([]);

	const { currentUser } = useContext(AuthContext);

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

	if (chats) console.log(Object.entries(chats));

	return (
		<div className='chatcontainer'>
			<ChatListHeader
				searchValue={searchValue}
				setSearchValue={setSearchValue}
			/>
			<Link to={'/add-users'} style={LinkStyle}>
				Add Chat
			</Link>

			{chats &&
				Object.entries(chats).map((chat) => (
					<ChatBox key={chat[0]} chat={chat} />
				))}
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
