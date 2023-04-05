// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyApT5IqQLM4l1vI2yVixgOLc6ETg6rqjDo",
    authDomain: "herbsreact-931fb.firebaseapp.com",
    projectId: "herbsreact-931fb",
    storageBucket: "herbsreact-931fb.appspot.com",
    messagingSenderId: "202573775420",
    appId: "1:202573775420:web:7a8141c61e1bbdba483939"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)