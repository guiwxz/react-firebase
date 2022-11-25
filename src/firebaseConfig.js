// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { GoogleAuthProvider, getAuth, signInWithPopup, signOut }
from "firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc }
from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiWmxIyIPZKsUTYRCdpvnFl1ApmeJlAsE",
  authDomain: "fir-lpe.firebaseapp.com",
  projectId: "fir-lpe",
  storageBucket: "fir-lpe.appspot.com",
  messagingSenderId: "737626228549",
  appId: "1:737626228549:web:567e53c9a4f8226c4f202c"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);


const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(
      collection(db, "users"),
      where("uid", "==", "user.uid")
    );

    const docs = await getDocs(q);

    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email
      });
    }

  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

const logout = () => {
  signOut(auth);
}

export {
  auth,
  db,
  signInWithGoogle,
  logout
}

