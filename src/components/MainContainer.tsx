import React from 'react';
import ChatContainer from './ChatContainer';
import MessageContainer from './MessageContainer';

type Props = {};

const MainContainer = (props: Props) => {
	return (
		<div className='maincontainer'>
			<ChatContainer />
			<MessageContainer />
		</div>
	);
};

export default MainContainer;
