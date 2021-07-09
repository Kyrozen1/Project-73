import firebase from 'firebase'
require("@firebase/firestore")

const firebaseConfig = {
    apiKey: "AIzaSyAy0YM3Fsd-smznHprTwPPHfEH6dO5M0k8",
    authDomain: "story-hub-20933.firebaseapp.com",
    projectId: "story-hub-20933",
    storageBucket: "story-hub-20933.appspot.com",
    messagingSenderId: "181682793402",
    appId: "1:181682793402:web:0e308b880766f5307e0b83"
  };

  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore();