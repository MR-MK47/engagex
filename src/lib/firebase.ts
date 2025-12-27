import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBdAazKKIZkDOq3gUPieG4GHrTXmPRZl8g",
    authDomain: "engagex-274f2.firebaseapp.com",
    projectId: "engagex-274f2",
    storageBucket: "engagex-274f2.firebasestorage.app",
    messagingSenderId: "1078630500254",
    appId: "1:1078630500254:web:542635df08ef77cd9bf88f",
    measurementId: "G-NXD9LBVHHV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
