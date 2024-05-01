import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyB9uMv2ii1C53p1yiST6kTIDwHRhdN8T2o",
  authDomain: "inspire-ubaidullah.firebaseapp.com",
  projectId: "inspire-ubaidullah",
  storageBucket: "inspire-ubaidullah.appspot.com",
  messagingSenderId: "806978500096",
  appId: "1:806978500096:web:eee96a5945f563e0de8ae5",
  measurementId: "G-3E1XSWW3E3"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()
export const storage = getStorage(app)
export const db = getFirestore(app)