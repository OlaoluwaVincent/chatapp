import React from 'react';
import { ChatContainer, MessageContainer } from '../components';
import { getAuth } from 'firebase/auth';
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
