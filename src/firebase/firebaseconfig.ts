// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: import.meta.env.VITE_APIKEY,
	authDomain: import.meta.env.VITE_AUTHDOMAIN,
	projectId: import.meta.env.VITE_PROJECTID,
	storageBucket: 'chatapp-820fc.appspot.com',
	messagingSenderId: '208032322563',
	appId: '1:208032322563:web:0dd6c0de2f0c49d9b92a36',
	measurementId: 'G-7XJ5KE4W7F',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
const analytics = getAnalytics(app);
