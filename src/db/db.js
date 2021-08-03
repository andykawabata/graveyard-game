import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDebdYTrUI_sFxLFM_I0p62TFFh9CVFkXw",
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