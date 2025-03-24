import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "AIzaSyAd4cqLrNHNfel_3Yf8yIXNhJguM9d5s1k",
  authDomain: "proyecto-laboratorio-7eba8.firebaseapp.com",
  projectId: "proyecto-laboratorio-7eba8",
  storageBucket: "proyecto-laboratorio-7eba8.firebasestorage.app",
  messagingSenderId: "1056117155382",
  appId: "1:1056117155382:web:de28987b92c8d7b364da97",
  measurementId: "G-3KRNPCYX5J"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);