import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
import { serverTimestamp } from 'firebase/firestore';
import { setDoc, doc } from 'firebase/firestore';
import { db } from './firebaseconfig';

import { toast } from 'react-toastify';

import { InputProps } from '../typing';

export const RegisterUser = (loginData: InputProps) => {
	const auth = getAuth();
	createUserWithEmailAndPassword(auth, loginData.email, loginData.password)
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
		})
		.catch((error) => {
			const errorMessage = error.message;
			let parts = errorMessage.split('/');
			let errorType = parts[parts.length - 1].slice(0, -2);
			toast.warn(errorType);
		});
};
