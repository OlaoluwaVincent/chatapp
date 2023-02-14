import { getAuth } from 'firebase/auth';
import MessageBox from './MessageBox';
import MessageHeader from './MessageHeader';
import MessageInput from './MessageInput';

type Props = {};

const MessageContainer = (props: Props) => {
	return (
		<div className='messagecontainer'>
			<MessageHeader />

			<MessageBox />
			<MessageBox />
			<MessageBox />
			<MessageBox />

			<div className='messagecontainer__input'>
				<MessageInput />
			</div>
		</div>
	);
};

export default MessageContainer;
