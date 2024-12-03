import "@/styles/globals.css";
import "sanitize.css";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { firebaseConfig } from "@/firebase/firebaseConfig";
import { FirebaseContext } from "@/firebase/context";

const googleProvider = new GoogleAuthProvider();

export default function App({ Component, pageProps }) {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    console.log(app);
    setAuth(getAuth(app));
  }, []);

  useEffect(() => {
    if (auth) {
      // CREATE LISTENER
      const unsubscribe = auth.onAuthStateChanged(authUser => {
        console.log(authUser);
        setUser(authUser);
      });

      // DESTROY LISTENER
      return () => {
        unsubscribe();
      };
    }
  }, [auth]);

  const signin = async () => signInWithPopup(auth, googleProvider);

  const signout = async () => signOut(auth);
  return (
    <FirebaseContext.Provider value={{ signin, signout, user }}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
}
