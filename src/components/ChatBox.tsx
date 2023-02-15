import { memo } from 'react';

type Props = {
	chat: any;
};

const ChatBox = memo(function ChatBox({ chat }: Props) {
	const date = new Date(
		chat[1].date.seconds * 1000 + chat[1].date.nanoseconds / 1000000
	);
	const timeString = date.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	});

	// console.log(timeString);
	const handleChatClick = () => {};
	return (
		<div className='chatbox-container'>
			<div className='chatbox' onClick={handleChatClick}>
				<div className='chatbox__profile-image'>
					{/* <img src="" alt="" /> */}
				</div>
				<div className='chatbox__profile-name'>
					<h3 className='body-text'>
						{chat[1].userInfo.displayName}
						<span className='small'>{timeString}</span>
					</h3>
					<p className='small'>recent chat</p>
				</div>
			</div>
		</div>
	);
});

export default ChatBox;
