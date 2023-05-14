import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyApT5IqQLM4l1vI2yVixgOLc6ETg6rqjDo",
    authDomain: "herbsreact-931fb.firebaseapp.com",
    projectId: "herbsreact-931fb",
    storageBucket: "herbsreact-931fb.appspot.com",
    messagingSenderId: "202573775420",
    appId: "1:202573775420:web:7a8141c61e1bbdba483939"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)