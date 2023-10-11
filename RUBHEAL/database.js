// Import the functions you need from the SDKs you need
import * as firebase from "firebase/compat";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';
import {getReactNativePersistence, initializeAuth} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAntBvPrT4awK1npBI6MTP_SgqLlklp9AM",
  authDomain: "register-4c2f6.firebaseapp.com",
  projectId: "register-4c2f6",
  storageBucket: "register-4c2f6.appspot.com",
  messagingSenderId: "941507859358",
  appId: "1:941507859358:web:fc7396bb6714af63fcbc8f",
  measurementId: "G-LFFENYB9NY"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}
export const auth1 = initializeAuth(firebase, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const auth = firebase.auth()
const firestore = getFirestore(app);

export { auth, firebase, firestore };







