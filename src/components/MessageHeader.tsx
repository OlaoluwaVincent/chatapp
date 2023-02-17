import { useState, useContext } from 'react';

import { ChatContext } from '../context/ChatContext';

import { MdSearch, MdCancel, MdArrowBack } from 'react-icons/md';

import Search from './Search';

const MessageHeader = () => {
	const [visible, setVisible] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	const { dispatch, data } = useContext(ChatContext);

	const handleCancel = () => {
		setVisible(false);
		setSearchValue('');
	};

	const handleClick = () => {
		dispatch({
			type: 'CHANGE_USER',
			payload: { uid: '', displayName: '', photoURL: '', email: '' },
		});
	};

	return (
		<div className='message-header'>
			<MdArrowBack size={25} onClick={handleClick} />
			<img className='message-header__profile-image' src='' alt='name' />
			{!visible && (
				<div className='message-header__profile-name'>
					<h3 className='body-text'>{data.user.displayName}</h3>
				</div>
			)}

			{/* {!visible && (
				<MdSearch
					className='svg__search'
					size={25}
					onClick={() => setVisible(true)}
				/>
			)}

			{visible && (
				<div className='visible'>
					<Search
						searchValue={searchValue}
						setSearchValue={setSearchValue}
					/>
					<MdCancel className='close' onClick={handleCancel} />
				</div>
			)} */}
		</div>
	);
};

export default MessageHeader;
