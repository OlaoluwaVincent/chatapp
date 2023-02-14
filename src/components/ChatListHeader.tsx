import React from 'react';
import Search from './Search';
import { MdMenu } from 'react-icons/md';

type Props = {
	searchValue: string;
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

const ChatListHeader = ({ searchValue, setSearchValue }: Props) => {
	return (
		<div className='chatlistheader'>
			<MdMenu size={30} />
			<Search searchValue={searchValue} setSearchValue={setSearchValue} />
		</div>
	);
};

export default ChatListHeader;
