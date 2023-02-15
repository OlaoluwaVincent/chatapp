import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import {
	setDoc,
	doc,
	serverTimestamp,
	getDoc,
	getDocs,
	updateDoc,
	onSnapshot,
	query,
	where,
	collection,
	DocumentData,
	QuerySnapshot,
} from 'firebase/firestore';
import { db } from './firebaseconfig';

import { toast } from 'react-toastify';

import { InputProps, LoginProps } from '../typing';

const auth = getAuth();

export const SignIn = (data: LoginProps) => {
	const currentUser = signInWithEmailAndPassword(
		auth,
		data.email,
		data.password
	)
		.then((userCredential) => {
			console.log();
			return userCredential.user;
		})
		.catch((error) => {
			toast.warn('Incorrect email or password');
		});
	return currentUser;
};

export const RegisterUser = async (loginData: InputProps) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			loginData.email,
			loginData.password
		);
		const user = userCredential.user;

		// update username
		if (auth.currentUser) {
			await updateProfile(auth.currentUser, {
				displayName: loginData.username,
			});
		}

		// save user to DB without the password
		const userCopyData = { ...loginData };
		// Extract data without password and confirm password
		const { password, confirmPassword, ...data } = userCopyData;
		// Add timestamp to data
		data.timeStamp = serverTimestamp();

		// Save the user's data to user/user.id
		await setDoc(doc(db, 'users', user.uid), {
			displayName: loginData.username,
			email: loginData.email,
			uid: user.uid,
		});
		await setDoc(doc(db, 'userChat', user.uid), {});

		// if successful
		toast.success('Account created...');
		return user;
	} catch (error: any) {
		const errorMessage = error.message;
		let parts = errorMessage.split('/');
		let errorType = parts[parts.length - 1].slice(0, -2);
		toast.warn(errorType);
	}
};

export const AddUsers = async (
	searchedTerm: string
): Promise<DocumentData[]> => {
	const q = query(
		collection(db, 'users'),
		where('email', '==', searchedTerm)
	);
	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map((doc) => doc.data());
};
