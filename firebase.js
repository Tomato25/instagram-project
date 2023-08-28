import { initializeApp, getApp, getApps } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyAeK4FfrS44Sjans_r3EKROK7VCy_eLlXg",
  authDomain: "instagram-clone-a1dcc.firebaseapp.com",
  projectId: "instagram-clone-a1dcc",
  storageBucket: "instagram-clone-a1dcc.appspot.com",
  messagingSenderId: "315485027510",
  appId: "1:315485027510:web:aa9e7bb625b49e50783a17"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export {app, db, storage};