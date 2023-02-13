import { useState } from 'react';
import { Register, Login } from '../components';

type Props = {};

const Accounts = (props: Props) => {
	const [haveAccount, setHaveAccount] = useState(true);
	return (
		<div className='accounts'>
			{haveAccount ? (
				<Login setHaveAccount={setHaveAccount} />
			) : (
				<Register setHaveAccount={setHaveAccount} />
			)}
		</div>
	);
};

export default Accounts;
