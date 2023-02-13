import { useState } from 'react';
import { Register, Login } from '../components';

// type Props = {};

const Accounts = () => {
	const [haveAccount, setHaveAccount] = useState(true);
	return (
		<div>
			{haveAccount ? (
				<Login setHaveAccount={setHaveAccount} />
			) : (
				<Register setHaveAccount={setHaveAccount} />
			)}
		</div>
	);
};

export default Accounts;
