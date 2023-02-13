import { useState } from 'react';
import { SignUp } from '../firebase/firebaseUtils';
import { LoginProps } from '../typing';
import { useNavigate } from 'react-router-dom';

interface Props {
	setHaveAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({ setHaveAccount }: Props) => {
	const navigate = useNavigate();
	const [loginData, setLoginData] = useState<LoginProps>({
		email: '',
		password: '',
	});

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		let newInput = { [e.target.name]: e.target.value };
		setLoginData({ ...loginData, ...newInput });
	};

	const handleLogin = async () => {
		const data = await SignUp(loginData);
		if (data) {
			navigate('/');
		}
	};

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
				<p className='small'>
					Click to
					<span
						className='black'
						onClick={() => setHaveAccount(false)}
					>
						Register
					</span>{' '}
				</p>
			</div>
		</div>
	);
};

export default Login;
