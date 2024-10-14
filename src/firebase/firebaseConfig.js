
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyk7-GBTAJsVw8r1FXgY_xBkYmF-Lsu6k",
  authDomain: "fir-demo-29adc.firebaseapp.com",
  projectId: "fir-demo-29adc",
  storageBucket: "fir-demo-29adc.appspot.com",
  messagingSenderId: "699956502830",
  appId: "1:699956502830:web:48d16d2b5f3ab6e5995abf",
  measurementId: "G-F9RFTNBJWD"
};


const app = initializeApp(firebaseConfig);
export const db =getFirestore(app)
const analytics = getAnalytics(app);

export const auth=getAuth(app)
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export default analytics