// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAv29ohLvBSlkq6vNTRF7dv0xGfQaiJRl0",
  authDomain: "fokus-fc926.firebaseapp.com",
  projectId: "fokus-fc926",
  storageBucket: "fokus-fc926.appspot.com",
  messagingSenderId: "1015698897857",
  appId: "1:1015698897857:web:7f4b623a095f4c93058d40"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 