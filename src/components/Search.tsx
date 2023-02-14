import { MdMenu, MdSearch } from 'react-icons/md';
type Props = {
	searchValue: string;
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

const Search = ({ searchValue, setSearchValue }: Props) => {
	return (
		<div className='search'>
			<MdMenu className='svg__menu' size={30} />

			<form>
				<input
					type='text'
					name='search'
					className='search__input small fw--medium'
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
				<MdSearch className='svg__search' size={25} />
			</form>
		</div>
	);
};

export default Search;
