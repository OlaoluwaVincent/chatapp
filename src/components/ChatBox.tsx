import React from 'react';

type Props = {
	userChatId: number;
	handleChatClick: () => void;
};

const ChatBox = (props: Props) => {
	return (
		<div className='chatbox'>
			<div className='chatbox__profile-image'>
				{/* <img src="" alt="" /> */}
			</div>
			<div className='chatbox__profile-name'>
				<h3 className='body-text'>
					UserName <span className='xs'>time</span>
				</h3>
				<p className='small'>recent chat</p>
			</div>
		</div>
	);
};

export default ChatBox;
