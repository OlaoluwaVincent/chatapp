import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddUsers } from '../firebase/firebaseUtils';
import {
	DocumentData,
	doc,
	getDoc,
	serverTimestamp,
	setDoc,
	updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseconfig';
import { AuthContext } from '../context/AuthContext';
import { Loading } from '../components';
import { toast } from 'react-toastify';

type Props = {};

const AddUser = (props: Props) => {
	const navigate = useNavigate();

	const [searchUser, setSearchUser] = useState('');
	const [loading, setLoading] = useState(false);
	const [users, setUsers] = useState<DocumentData[]>();
	const { currentUser } = useContext(AuthContext);

	const handlePress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.code === 'Enter') {
			const d = await AddUsers(searchUser);
			setUsers(d);
		}
	};

	const addToUserChat = async (user: DocumentData) => {
		// check if the conversation exists
		let combinedId;
		if (currentUser?.uid) {
			combinedId =
				currentUser?.uid < user.uid
					? currentUser?.uid + user.uid
					: user.uid + currentUser?.uid;
			try {
				const docRef = doc(db, 'chats', combinedId);
				const res = await getDoc(docRef);
				if (!res.exists()) {
					await setDoc(doc(db, 'chats', combinedId), {
						messages: [],
					});
					// my data
					await updateDoc(doc(db, 'userChat', currentUser.uid), {
						[combinedId + '.userInfo']: {
							uid: user.uid,
							displayName: user.displayName,
							email: user.email,
						},
						[combinedId + '.date']: serverTimestamp(),
					});
					//other user
					await updateDoc(doc(db, 'userChat', user.uid), {
						[combinedId + '.userInfo']: {
							uid: currentUser.uid,
							displayName: currentUser.displayName,
							email: currentUser.email,
						},
						[combinedId + '.date']: serverTimestamp(),
					});
					toast.success('Friend Added');
					navigate('/');
				}
			} catch (error: any) {
				console.log(error);
			}
		}
	};

	return (
		<div className='add-users'>
			<input
				type='email'
				value={searchUser}
				className='body-text'
				onKeyDown={handlePress}
				onChange={(e) => setSearchUser(e.target.value)}
			/>
			{users && (
				<i className='small fw--light'>Click to add user to chat</i>
			)}
			{users &&
				users.map((d) => (
					<p
						key={d.email}
						onClick={() => addToUserChat(d)}
						className='body-text fw--light'
					>
						{d.email}
						<br />
						{d.displayName}
					</p>
				))}
		</div>
	);
};

export default AddUser;
