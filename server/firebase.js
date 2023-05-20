// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQQrO3S7Y-PNPV2tqj2AykP5kkQVmDVFs",
  authDomain: "mindbloom-1.firebaseapp.com",
  projectId: "mindbloom-1",
  storageBucket: "mindbloom-1.appspot.com",
  messagingSenderId: "106288622860",
  appId: "1:106288622860:web:209789aa765063eed16d29",
  measurementId: "G-3L862CDKHF",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
