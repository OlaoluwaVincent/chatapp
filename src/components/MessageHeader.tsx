import { useState } from 'react';
import { MdSearch, MdCancel } from 'react-icons/md';
import Search from './Search';
import { getAuth, signOut } from 'firebase/auth';

type Props = {};

const MessageHeader = (props: Props) => {
	const [visible, setVisible] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	const auth = getAuth();

	const handleCancel = () => {
		setVisible(false);
		setSearchValue('');
	};

	return (
		<div className='message-header'>
			<img className='message-header__profile-image' src='' alt='name' />
			{!visible && (
				<div className='message-header__profile-name'>
					<h3 className='body-text'>UserName</h3>
					<p className='small'>recent chat</p>
				</div>
			)}

			{!visible && (
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
			)}
			<p onClick={() => signOut(auth)}>SignOut</p>
		</div>
	);
};

export default MessageHeader;
