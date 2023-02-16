import { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MdSend, MdAttachFile } from 'react-icons/md';
import { AuthContext } from '../context/AuthContext';
import { ChatContext, ChatState } from '../context/ChatContext';
import {
	updateDoc,
	doc,
	arrayUnion,
	Timestamp,
	serverTimestamp,
} from 'firebase/firestore';
import { db, storage } from '../firebase/firebaseconfig';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { User } from 'firebase/auth';

// type Props = {
// 	file: File | undefined;
// };

const MessageInput = () => {
	const [text, setText] = useState('');
	const [file, setFile] = useState<File | undefined>();

	const { data } = useContext(ChatContext);
	const { currentUser } = useContext(AuthContext);
	const uuid = uuidv4();

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setFile(e.target.files[0]);
		} else {
			setFile(undefined);
		}
	};
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (file) {
			const storageRef = ref(storage, uuid);
			const uploadTask = uploadBytesResumable(storageRef, file);
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					// Observe state change events such as progress, pause, and resume
					// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log('Upload is ' + progress + '% done');
					switch (snapshot.state) {
						case 'paused':
							console.log('Upload is paused');
							break;
						case 'running':
							console.log('Upload is running');
							break;
					}
				},
				(error) => {
					// Handle unsuccessful uploads
					console.log(error);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(
						async (downloadUrl) => {
							await updateDoc(doc(db, 'chats', data.chatId), {
								messages: arrayUnion({
									id: uuid,
									text,
									senderId: currentUser?.uid,
									date: Timestamp.now(),
									img: downloadUrl,
								}),
							});
						}
					);
				}
			);
			UpdateLastMessage('file(img)', data, currentUser);
			setFile(undefined);
			setText('');
		} else {
			let lastMessage = text;
			await updateDoc(doc(db, 'chats', data.chatId), {
				messages: arrayUnion({
					id: uuid,
					text,
					senderId: currentUser?.uid,
					date: Timestamp.now(),
				}),
			});
			setText('');

			UpdateLastMessage(text, data, currentUser);
		}
	};
	return (
		<form className='message-input' onSubmit={handleSubmit}>
			<div>
				<label htmlFor='file'>
					<MdAttachFile
						color='#707991'
						size={30}
						className='input__svg'
					/>
				</label>
				<input
					type='file'
					id='file'
					style={{ display: 'none' }}
					accept='image/jpeg, image,jpg, image/png, image/gif'
					onChange={handleFileChange}
				/>
			</div>
			<input
				type='text'
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>

			<button type='submit'>
				<MdSend color='#707991' size={30} className='input__svg' />
			</button>
		</form>
	);
};

export default MessageInput;

const UpdateLastMessage = async (
	lastMessage: string,
	data: ChatState,
	currentUser: User | null
) => {
	if (currentUser) {
		await updateDoc(doc(db, 'userChat', currentUser.uid), {
			[data.chatId + '.lastMessage']: {
				text: lastMessage,
			},
			[data.chatId + '.date']: serverTimestamp(),
		});
		await updateDoc(doc(db, 'userChat', data.user.uid), {
			[data.chatId + '.lastMessage']: {
				text: lastMessage,
			},
			[data.chatId + '.date']: serverTimestamp(),
		});
	}
};
