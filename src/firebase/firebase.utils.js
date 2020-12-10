import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAol1ENEZ8Y2aG8l41R6RvXufCHunEqZyM",
    authDomain: "cwn-db-11dd3.firebaseapp.com",
    projectId: "cwn-db-11dd3",
    storageBucket: "cwn-db-11dd3.appspot.com",
    messagingSenderId: "1054078234533",
    appId: "1:1054078234533:web:4ee1ffad5d1852d026c24c",
    measurementId: "G-L437N3EB8G"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const {displayName, email } = userAuth;
    const createdAt = new Date();


    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
}




firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
// We want to always trigger the google popup whenever we use the GoogleAuthProvider
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
