import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAYTgxPXImTVUnrC4630-Fx6hn61nUKQuo",
  authDomain: "chat-app-om-e2a05.firebaseapp.com",
  projectId: "chat-app-om-e2a05",
  storageBucket: "chat-app-om-e2a05.appspot.com",
  messagingSenderId: "656667334894",
  appId: "1:656667334894:web:83312b8e48c122da9bfbff",
  measurementId: "G-TEWN9BBBF7"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();