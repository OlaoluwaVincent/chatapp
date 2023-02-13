import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { serverTimestamp } from 'firebase/firestore';
import { setDoc, doc } from 'firebase/firestore';
import { db } from './firebaseconfig';

import { toast } from 'react-toastify';

import { InputProps, LoginProps } from '../typing';

const auth = getAuth();

export const RegisterUser = (loginData: InputProps) => {
	const userDetails = createUserWithEmailAndPassword(
		auth,
		loginData.email,
		loginData.password
	)
		.then((userCredential) => {
			// Signed in
			const user = userCredential.user;
			// update username
			if (auth.currentUser) {
				updateProfile(auth.currentUser, {
					displayName: loginData.username,
				});
			}
			// save user to DB without the password
			const userCopyData = { ...loginData };
			// Extract data without password and confirm password
			const { password, confirmPassword, ...data } = userCopyData;

			// Add timestamp to data
			data.timeStamp = serverTimestamp();
			/**Save the users data to
			 * user/user.id
			 * db just refers to firestore database
			 */
			setDoc(doc(db, 'users', user.uid), data)
				.then(() => toast.success('Account created...'))

				.catch((error) => console.log(error));
			// ...
			return user;
		})
		.catch((error) => {
			const errorMessage = error.message;
			let parts = errorMessage.split('/');
			let errorType = parts[parts.length - 1].slice(0, -2);
			toast.warn(errorType);
		});
	return userDetails;
};

export const SignUp = (data: LoginProps) => {
	const currentUser = signInWithEmailAndPassword(
		auth,
		data.email,
		data.password
	)
		.then((userCredential) => {
			return userCredential.user;
		})
		.catch((error) => {
			toast.warn('Incorrect email or password');
		});
	return currentUser;
};
