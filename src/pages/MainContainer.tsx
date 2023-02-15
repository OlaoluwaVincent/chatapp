import React from 'react';
import ChatContainer from '../components/ChatContainer';
import MessageContainer from '../components/MessageContainer';
import { getAuth } from 'firebase/auth';
type Props = {};

const MainContainer = (props: Props) => {
	// const auth = getAuth();
	// alert(auth.currentUser?.displayName);
	return (
		<div className='maincontainer'>
			<ChatContainer />
			<MessageContainer />
		</div>
	);
};

export default MainContainer;
