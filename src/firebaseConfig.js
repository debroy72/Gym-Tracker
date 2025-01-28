// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAp2fxTolo2dQCCt_RCywu60P6G-ESsr0c",
  authDomain: "gym-tracker-31662.firebaseapp.com",
  projectId: "gym-tracker-31662",
  storageBucket: "gym-tracker-31662.firebasestorage.app",
  messagingSenderId: "733517464892",
  appId: "1:733517464892:web:90bc03d23fc12406a8ca39",
  measurementId: "G-SS9B2X684Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);