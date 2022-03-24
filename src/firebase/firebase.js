import { initializeApp } from "firebase/app";

import 'firebase/firestore';
import 'firebase/auth';

import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDdZ73-R0R8T83k5Mzt68s8TnY7gHN4UXg",
  authDomain: "dailytasks-45c26.firebaseapp.com",
  projectId: "dailytasks-45c26",
  storageBucket: "dailytasks-45c26.appspot.com",
  messagingSenderId: "966988209170",
  appId: "1:966988209170:web:6b6bb818311a22a89d0ccb"
};

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

export {
    db,
    auth,
}