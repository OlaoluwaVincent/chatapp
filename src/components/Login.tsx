import { useState } from 'react';
import { SignUp } from '../firebase/firebaseUtils';
import { LoginProps } from '../typing';
import { useNavigate } from 'react-router-dom';

interface Props {
	setHaveAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = () => {
	const navigate = useNavigate();
	const [loginData, setLoginData] = useState<LoginProps>({
		email: '',
		password: '',
	});

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		let newInput = { [e.target.name]: e.target.value };
		setLoginData({ ...loginData, ...newInput });
	};

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = await SignUp(loginData);
		if (data) {
			navigate('/');
		}
	};

	return (
		<div className='login'>
			<form className='login__container' onSubmit={handleLogin}>
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
				<button type='submit' className='body-text'>
					Login
				</button>
				<p className='small'>
					Click to
					<span
						className='black'
						onClick={() => navigate('/register')}
					>
						Register
					</span>{' '}
				</p>
			</form>
		</div>
	);
};

export default Login;
