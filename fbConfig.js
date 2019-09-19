import firebase from 'firebase/app';
import "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBcTwtksFGmfpescsbuxC2G0gWzI0xc3Kw",
    authDomain: "js-school-final-project-api.firebaseapp.com",
    databaseURL: "https://js-school-final-project-api.firebaseio.com",
    projectId: "js-school-final-project-api",
    storageBucket: "js-school-final-project-api.appspot.com",
    messagingSenderId: "887956200232",
    appId: "1:887956200232:web:1b477b003278c7e9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
export const database = firebase.database();