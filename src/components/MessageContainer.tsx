import { useContext } from 'react';

import { MessageBox, MessageHeader, MessageInput } from './index';

import { ChatContext, ChatState } from '../context/ChatContext';

const MessageContainer = () => {
	const { data } = useContext(ChatContext);

	return (
		<div
			className={`messagecontainer ${
				data.user.displayName ? 'display' : 'display--none'
			}`}
		>
			<MessageHeader />
			<MessageBox />

			<div className='messagecontainer__input'>
				<MessageInput />
			</div>
		</div>
	);
};

export default MessageContainer;
