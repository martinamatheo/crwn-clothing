import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCEzELCyTA3P4rnJKa9_0Y9ER_7AuBk6UU",
  authDomain: "react-app-e-commerce-project.firebaseapp.com",
  databaseURL: "https://react-app-e-commerce-project.firebaseio.com",
  projectId: "react-app-e-commerce-project",
  storageBucket: "react-app-e-commerce-project.appspot.com",
  messagingSenderId: "570332802295",
  appId: "1:570332802295:web:8cf4968379a0e24e0e77f2",
  measurementId: "G-EE5LHLEYX6"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;