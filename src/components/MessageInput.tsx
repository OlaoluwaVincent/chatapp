import { MdOutlineEmojiEmotions, MdSend } from 'react-icons/md';

type Props = {};

const MessageInput = (props: Props) => {
	return (
		<form className='message-input'>
			<MdOutlineEmojiEmotions
				color='#707991'
				size={25}
				className='input__svg'
			/>
			<input type='text' />
			<button type='submit'>
				<MdSend color='#707991' size={30} className='input__svg' />
			</button>
		</form>
	);
};

export default MessageInput;
