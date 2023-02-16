import React from 'react';
import Search from './Search';
import { MdMenu } from 'react-icons/md';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseconfig';

type Props = {
	searchValue: string;
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

const ChatListHeader = ({ searchValue, setSearchValue }: Props) => {
	return (
		<div className='chatlistheader'>
			{/* <MdMenu size={30} /> */}
			<p onClick={() => signOut(auth)}>SignOut</p>
			<Search searchValue={searchValue} setSearchValue={setSearchValue} />
		</div>
	);
};

export default ChatListHeader;
