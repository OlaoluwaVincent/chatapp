import { memo, useContext, useState, useEffect } from 'react';
import { ChatContext } from '../context/ChatContext';

const ChatBox = memo(function ChatBox({ chat }: any) {
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

	console.log(chat.lastMessage);
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
					<h3 className='body-text'>
						{chat.userInfo.displayName}
						{time && <span className='small'>{time}</span>}
					</h3>
					{chat.lastMessage && (
						<p className='small'>{chat.lastMessage.text}</p>
					)}
				</div>
			</div>
		</div>
	);
});

export default ChatBox;
