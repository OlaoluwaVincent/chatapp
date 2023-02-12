import { useState } from 'react';

type Props = {};

const Login = () => {
	const [loginData, setLoginData] = useState({});

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		let newInput = { [e.target.name]: e.target.value };
		setLoginData({ ...loginData, ...newInput });
	};

	const handleLogin = () => {};

	return (
		<div className='login'>
			<div className='login__container'>
				<h1 className='h3'>Login</h1>
				<div className='login__inputs'>
					<input
						type='text'
						name='email'
						id='email'
						className='login__input body-text'
						placeholder='Enter Email'
						onChange={handleInput}
					/>
					<input
						type='password'
						name='password'
						id='password'
						className='login__input body-text'
						placeholder='Enter Password'
						onChange={handleInput}
					/>
				</div>
				<button
					type='submit'
					className='body-text'
					onClick={handleLogin}
				>
					Login
				</button>
			</div>
		</div>
	);
};

export default Login;
