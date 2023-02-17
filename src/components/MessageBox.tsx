import { useContext, useEffect, useState, useRef } from 'react';
import { RiCheckDoubleLine } from 'react-icons/ri';
import { ChatContext } from '../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebaseconfig';

type Messages = {
	text: string;
	id: string;
	senderId: string;
	img?: string;
	date: {
		nanoseconds: any;
		seconds: any;
	};
};

const MessageBox = () => {
	const { data } = useContext(ChatContext);
	const messagesRef = useRef<HTMLDivElement>(null);
	const [messages, setMessages] = useState<Messages[]>([]);

	useEffect(() => {
		setMessages([]);
		if (data.user.displayName) {
			const unsub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
				if (doc.exists()) {
					const chatData = doc.data();
					if (chatData) {
						setMessages(chatData.messages);
					}
				}
			});

			return () => {
				unsub();
			};
		}
	}, [data?.user.displayName]);

	useEffect(() => {
		messagesRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	return (
		<div className='messageBox__holder'>
			{messages.length > 0 &&
				messages.map((message: Messages, index) => (
					<div
						ref={messagesRef}
						key={index}
						className={`message ${
							message.senderId == data.user.uid
								? 'incoming'
								: 'outgoing'
						}`}
					>
						{message.img && (
							<div className='message__img'>
								<img src={message.img} alt={message.senderId} />
							</div>
						)}
						<p className='message__text body-text'>
							{message.text}
							{message.date && (
								<span className='message__time'>
									{new Date(
										message.date.seconds * 1000 +
											message.date.nanoseconds / 1000000
									).toLocaleTimeString('en-US', {
										hour: 'numeric',
										minute: 'numeric',
										hour12: true,
									})}{' '}
									<RiCheckDoubleLine className='message__svg' />
								</span>
							)}
						</p>
					</div>
				))}
		</div>
	);
};

export default MessageBox;
