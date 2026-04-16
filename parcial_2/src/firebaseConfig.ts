// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWXhblcV4TSNBKCpCeM_ZzZkZM4RhYn_4",
  authDomain: "parcial-2-dcae7.firebaseapp.com",
  databaseURL: "https://parcial-2-dcae7-default-rtdb.firebaseio.com",
  projectId: "parcial-2-dcae7",
  storageBucket: "parcial-2-dcae7.firebasestorage.app",
  messagingSenderId: "204231965606",
  appId: "1:204231965606:web:ea23b2706ef29421a5ad67",
  measurementId: "G-2P5V3JQZR8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database, app, analytics };
