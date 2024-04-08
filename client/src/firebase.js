// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: 'AIzaSyDOzhlqi9E4EeT4q1yc1xNLFYb7u241Pg0',
    authDomain: "pyq-felix.firebaseapp.com",
    projectId: "pyq-felix",
    storageBucket: "pyq-felix.appspot.com",
    messagingSenderId: "281052621736",
    appId: "1:281052621736:web:adbe4985de20f19f1e0b9d",
    measurementId: "G-RL7D07P4NY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);