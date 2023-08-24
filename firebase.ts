import { initializeApp, getApp, getApps } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAIqQV1Vkk1xsEXiol5bYcxceOVWXGQqdo",
    authDomain: "instagram-clone-fa022.firebaseapp.com",
  projectId: "instagram-clone-fa022",
  storageBucket: "instagram-clone-fa022.appspot.com",
  messagingSenderId: "144755055374",
  appId: "1:144755055374:web:7745601fed31e8fc8e955f",
  measurementId: "G-RT76K7YRSV"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export {app, db, storage};