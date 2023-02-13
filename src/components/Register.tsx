import { useState } from 'react';

type InputProps = {
	username: string;
	email: string;
	password: string;
	confirmPassword?: string;
};

interface Props {
	setHaveAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register = ({ setHaveAccount }: Props) => {
	const [loginData, setLoginData] = useState({});
	const [visible, setVisible] = useState(false);
	const [error, setError] = useState('');

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		let newInput = { [e.target.name]: e.target.value };
		setLoginData({ ...loginData, ...newInput });
	};

	const handleRegister = () => {
		const { username, email, password, confirmPassword } =
			loginData as InputProps;

		if (password !== confirmPassword) {
			setError('Passwords do not match');
			return;
		} else {
			setError('');
		}
		// Register to Firebase
	};

	return (
		<div className='login'>
			<div className='login__container'>
				<h1 className='h3'>Register</h1>
				<div className='login__inputs'>
					<label htmlFor='username'>Username</label>
					<input
						type='text'
						name='username'
						className='login__input body-text'
						onChange={handleInput}
					/>

					<label htmlFor='email'>Email</label>
					<input
						type='email'
						name='email'
						className='login__input body-text'
						onChange={handleInput}
					/>
					<label htmlFor='password'>Password</label>
					<input
						type={visible ? 'text' : 'password'}
						name='password'
						className='login__input body-text'
						onChange={handleInput}
					/>
					<label htmlFor='confirmPassword'>Confirm Password</label>
					<input
						type={visible ? 'text' : 'password'}
						name='confirmPassword'
						className='login__input body-text'
						onChange={handleInput}
					/>
					<p className=''>
						<input
							type='checkbox'
							checked={visible}
							onChange={() => setVisible(!visible)}
						/>
						Show Password
					</p>
				</div>
				{error && <p className='error small'>{error}</p>}
				<button
					type='submit'
					className='body-text'
					onClick={handleRegister}
				>
					Register
				</button>
				<p className='small'>
					Already have an account{' '}
					<span
						className='black fw--medium'
						onClick={() => setHaveAccount(true)}
					>
						Login
					</span>{' '}
				</p>
			</div>
		</div>
	);
};

export default Register;
