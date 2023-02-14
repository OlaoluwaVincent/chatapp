import { MdSearch } from 'react-icons/md';
type Props = {
	searchValue: string;
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

const Search = ({ searchValue, setSearchValue }: Props) => {
	return (
		<div className='search'>
			<input
				type='text'
				name='search'
				className='search__input small fw--medium'
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
			/>
			<MdSearch className='svg__search' size={25} />
		</div>
	);
};

export default Search;
