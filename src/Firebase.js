// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDfAiCWPpxKI4UQIYVYTRSDp0n4cL6ykX8",
    authDomain: "whats-app-clone-2ce37.firebaseapp.com",
    projectId: "whats-app-clone-2ce37",
    storageBucket: "whats-app-clone-2ce37.appspot.com",
    messagingSenderId: "639079449882",
    appId: "1:639079449882:web:bdd4664b7172fb709b58a3",
    measurementId: "G-0BZLH6ZNVY"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider};
  export default db;