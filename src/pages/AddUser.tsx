import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	DocumentData,
	collection,
	doc,
	getDoc,
	getDocs,
	serverTimestamp,
	setDoc,
	updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseconfig';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { User } from 'firebase/auth';
import { Loading } from '../components';

type Props = {};

const AddUser = (props: Props) => {
	const [allUsers, setAllUsers] = useState<DocumentData>([]);
	const [loading, setLoading] = useState(false);
	const { currentUser } = useContext(AuthContext);

	useEffect(() => {
		const GetAllUsers = async () => {
			const querySnapshot = await getDocs(collection(db, 'users'));
			if (!querySnapshot.empty) {
				const data = querySnapshot.docs;

				const res = data.map((doc) => doc.data());
				setAllUsers(res);
			}
		};
		return () => {
			GetAllUsers();
		};
	}, []);

	const addToUserChat = async (user: DocumentData) => {
		// check if the conversation exists
		setLoading(true);
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
					setLoading(false);
					toast.success('Friend Added');
				} else {
					toast.info('Already your friend');
					setLoading(false);
				}
			} catch (error: any) {
				console.log(error);
			}
		}
	};

	return (
		<div className='add-users'>
			<Link to='/'>Chat</Link>
			<h1 className='h3'>Add Users</h1>
			<div className='all__users'>
				{allUsers &&
					allUsers?.length > 0 &&
					allUsers.map((user: User) => (
						<div className='users' key={user.uid}>
							<div className='user'>
								<p className='body-text'>{user.displayName}</p>
								<p className='small'>{user.email}</p>
							</div>
							<button
								type='button'
								onClick={() => addToUserChat(user)}
							>
								{loading ? (
									<Loading height='25' width='25' />
								) : (
									'Add User'
								)}
							</button>
						</div>
					))}
			</div>
			{allUsers.length < 1 && <Loading />}
		</div>
	);
};

export default AddUser;
