// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDhu-AxKiwEtLWwWCZnVs5znwkHiaLxUdQ",
    authDomain: "zhangship-c6537.firebaseapp.com",
    projectId: "zhangship-c6537",
    storageBucket: "zhangship-c6537.appspot.com",
    messagingSenderId: "891586477613",
    appId: "1:891586477613:web:0767515d06cc0feae482a4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const ORDERS = 'orders';
