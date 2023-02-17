import { memo, useContext, useState, useEffect } from 'react';
import { ChatContext, ChatState } from '../context/ChatContext';

interface Props {
	chat: {
		date: {
			nanoseconds: number;
			seconds: number;
		};
		userInfo: {
			displayName: string;
			email: string;
			uid: string;
			photoUrl: string;
		};
		lastMessage: {
			text: string;
		};
	};
}

const ChatBox = memo(function ChatBox({ chat }: Props) {
	const [time, setTime] = useState('');
	const { dispatch } = useContext(ChatContext);

	useEffect(() => {
		if (chat?.date?.seconds && chat?.date?.nanoseconds) {
			const date = new Date(
				chat.date.seconds * 1000 + chat.date.nanoseconds / 1000000
			);
			const timeString = date.toLocaleTimeString('en-US', {
				hour: 'numeric',
				minute: 'numeric',
				hour12: true,
			});
			setTime(timeString);
		}
		return () => {};
	}, [chat?.date?.nanoseconds, chat?.date?.seconds]);

	const handleChatClick = () => {
		dispatch({ type: 'CHANGE_USER', payload: chat.userInfo });
	};
	return (
		<div className='chatbox-container'>
			<div className='chatbox' onClick={handleChatClick}>
				<div className='chatbox__profile-image'>
					{/* <img src="" alt="" /> */}
				</div>
				<div className='chatbox__profile-name'>
					<div className='name__time'>
						<h3 className='body-text'>
							{chat.userInfo.displayName}
						</h3>
						{time && <span className='small'>{time}</span>}
					</div>
					{chat.lastMessage && (
						<p className='small'>{chat.lastMessage.text}</p>
					)}
				</div>
			</div>
		</div>
	);
});

export default ChatBox;
