// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZ1DBY_SB7Anz_o5YbFCdpA5TErqTtsvU",
  authDomain: "sdsd-702ae.firebaseapp.com",
  projectId: "sdsd-702ae",
  storageBucket: "sdsd-702ae.appspot.com",
  messagingSenderId: "83731965921",
  appId: "1:83731965921:web:66b1381553539595be14a0",
  measurementId: "G-4YC582V2X2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
