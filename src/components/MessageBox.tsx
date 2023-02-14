import { RiCheckLine, RiCheckDoubleLine } from 'react-icons/ri';

type Props = {};

const MessageBox = (props: Props) => {
	return (
		<div className='message incoming'>
			<p className='message__text body-text'>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Totam
				itaque error aliquam blanditiis iusto necessitatibus debitis non
				nisi voluptate quam quos, odio corporis esse vero doloremque
				ipsum eos dolorum consequatur quasi eius. Cumque exercitationem,
				quas possimus illo debitis quidem libero!
				<span className='message__time'>
					time <RiCheckDoubleLine className='message__svg' />
				</span>
			</p>
		</div>
	);
};

export default MessageBox;
