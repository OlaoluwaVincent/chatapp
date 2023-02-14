import { useState } from 'react';
import { ChatBox, ChatListHeader } from './index';

type Props = {};

const ChatContainer = (props: Props) => {
	const [searchValue, setSearchValue] = useState('');

	return (
		<div className='chatcontainer'>
			<ChatListHeader
				searchValue={searchValue}
				setSearchValue={setSearchValue}
			/>
			<ChatBox userChatId={1} />
			<ChatBox userChatId={1} />
			<ChatBox userChatId={1} />
			<ChatBox userChatId={1} />
			<ChatBox userChatId={1} />
			<ChatBox userChatId={1} />
			<ChatBox userChatId={1} />
			<ChatBox userChatId={1} />
			<ChatBox userChatId={1} />
			<ChatBox userChatId={1} />
			<ChatBox userChatId={1} />
			<ChatBox userChatId={1} />
			<ChatBox userChatId={1} />
			<ChatBox userChatId={1} />
			<ChatBox userChatId={1} />
			<ChatBox userChatId={1} />
			<ChatBox userChatId={1} />
			<ChatBox userChatId={1} />
		</div>
	);
};

export default ChatContainer;
