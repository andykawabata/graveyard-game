import firebase from 'firebase';

const FIREBASE_KEY = process.env.REACT_APP_FIREBASE_KEY

var config = {
    apiKey: FIREBASE_KEY,
    authDomain: "graveyard-game-46d4d.firebaseapp.com",
    projectId: "graveyard-game-46d4d",
    storageBucket: "graveyard-game-46d4d.appspot.com",
    messagingSenderId: "851934010696",
    appId: "1:851934010696:web:2b76bfbe78ea08286a277d",
    measurementId: "G-BCVJGWLW35"
  };

  const firebaseApp=firebase.initializeApp(config);
  const db=firebase.firestore();
  
  export default db;