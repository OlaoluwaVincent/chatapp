import { memo } from 'react';

type Props = {
	userChatId: number;
};

const ChatBox = memo(function ChatBox({ userChatId }: Props) {
	const handleChatClick = () => {};
	return (
		<div className='chatbox-container'>
			<div className='chatbox' onClick={handleChatClick}>
				<div className='chatbox__profile-image'>
					{/* <img src="" alt="" /> */}
				</div>
				<div className='chatbox__profile-name'>
					<h3 className='body-text'>
						UserName <span className='small'>time</span>
					</h3>
					<p className='small'>recent chat</p>
				</div>
			</div>
		</div>
	);
});

export default ChatBox;
