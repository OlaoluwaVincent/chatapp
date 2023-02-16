import { useContext, useEffect } from 'react';
import MessageBox from './MessageBox';
import MessageHeader from './MessageHeader';
import MessageInput from './MessageInput';
import { ChatContext } from '../context/ChatContext';

type Props = {};

const MessageContainer = (props: Props) => {
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
