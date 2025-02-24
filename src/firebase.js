import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { collection, addDoc, getDocs } from "firebase/firestore"; 


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDu3fyDt5zRGAvgP_Z1idA3MQnnbUaUkL8",
  authDomain: "portfolio-597db.firebaseapp.com",
  
  projectId: "portfolio-597db",
  storageBucket: "portfolio-597db.firebasestorage.app",
  messagingSenderId: "912327947513",
  appId: "1:912327947513:web:9d9f662cc86ad7c839de28",
  measurementId: "G-B927ST45NQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection,getDocs, addDoc };