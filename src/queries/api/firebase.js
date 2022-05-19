import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { useEffect, useState } from 'react';
// import { firebase } from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCpgBVYUP6CaACUvnH7J5D6DIi4g0MZFW4",
  authDomain: "shopping-online-16b07.firebaseapp.com",
  projectId: "shopping-online-16b07",
  storageBucket: "shopping-online-16b07.appspot.com",
  messagingSenderId: "265853563527",
  appId: "1:265853563527:web:b3a7140039b86bd1c27e22",

};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const signup = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
  //   .then((res) =>
  //     sessionStorage.setItem('Auth Token', res._tokenResponse.refresh)
  //   );
};
export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};
export const logout = (email, password) => {
  return signOut(auth);
};
export const useAuth = (email, password) => {
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const state = onAuthStateChanged(auth, (user) => {
      if(user){
        setCurrentUser(user)
      }
    });
    return state;
  }, []);
  return currentUser;
};


