// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeDwFWJSEG_OVnFpMQfv-DkXdE-b8ALmY",
  authDomain: "inventory-management-6170c.firebaseapp.com",
  projectId: "inventory-management-6170c",
  storageBucket: "inventory-management-6170c.appspot.com",
  messagingSenderId: "430224757155",
  appId: "1:430224757155:web:975e52fd4619aad69aca16",
  measurementId: "G-8M0NNGR1NN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export {firestore}