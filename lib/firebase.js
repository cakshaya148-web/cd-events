import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGEOg7-7aFqH4CTrZiL2LeP7fq1J70yOs",
  authDomain: "erp-system-158d8.firebaseapp.com",
  projectId: "erp-system-158d8",
  storageBucket: "erp-system-158d8.firebasestorage.app",
  messagingSenderId: "986194496178",
  appId: "1:986194496178:web:3455a2a5f9020b5b31d7ab",
  measurementId: "G-0YT7K7Z55L"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
