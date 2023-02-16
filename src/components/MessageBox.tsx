import { useContext, useEffect, useState, useRef } from 'react';
import { RiCheckLine, RiCheckDoubleLine } from 'react-icons/ri';
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
	const [prevMessagesLength, setPrevMessagesLength] = useState(0);

	useEffect(() => {
		if (data.chatId) {
			const unsub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
				if (doc.exists()) {
					const chatData = doc.data();
					if (chatData) {
						setMessages(chatData.messages);
						setPrevMessagesLength(chatData.messages.length);
					}
				}
			});

			return () => {
				unsub();
			};
		}
	}, [data.chatId]);

	// We use the useEffect hook to run our code whenever the "messages" state changes
	useEffect(() => {
		// Check if new messages have been added since the last render
		if (messages.length > prevMessagesLength) {
			// If new messages have been added, scroll to the bottom of the messages list
			messagesRef.current?.scrollIntoView({ behavior: 'smooth' });
			// Update the "prevMessagesLength" variable to the current number of messages
			setPrevMessagesLength(messages.length);
		}
	}, [messages, prevMessagesLength, messagesRef]);

	return (
		<div className='messageBox__holder'>
			{messages.map((message: Messages, index) => (
				<div
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
			<div ref={messagesRef} />
		</div>
	);
};

export default MessageBox;
