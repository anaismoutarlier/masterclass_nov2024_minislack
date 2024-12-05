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
import {
  getFirestore,
  addDoc,
  collection,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { firebaseConfig } from "@/firebase/firebaseConfig";
import { FirebaseContext } from "@/firebase/context";

const googleProvider = new GoogleAuthProvider();

export default function App({ Component, pageProps }) {
  const [auth, setAuth] = useState(null);
  const [db, setDb] = useState(null);
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    setAuth(getAuth(app));
    setDb(getFirestore(app));
  }, []);

  useEffect(() => {
    if (auth) {
      // CREATE LISTENER
      const unsubscribe = auth.onAuthStateChanged(authUser => {
        setUser(authUser);
      });

      // DESTROY LISTENER
      return () => {
        unsubscribe();
      };
    }
  }, [auth]);

  useEffect(() => {
    if (db) {
      const q = query(collection(db, "messages"), orderBy("sentAt"));

      const unsubscribe = onSnapshot(q, data => {
        const messages = data.docs.map(doc => {
          const data = doc.data();
          data.id = doc.id;
          data.sentAt = data.sentAt.toDate();
          return data;
        });
        setMessages(messages);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [db]);

  const signin = async () => signInWithPopup(auth, googleProvider);

  const signout = async () => signOut(auth);

  const newMessage = async content => {
    if (!content || !user || !db) return;
    const message = {
      content,
      user: {
        id: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      },
      sentAt: new Date(),
    };
    await addDoc(collection(db, "messages"), message);
  };
  return (
    <FirebaseContext.Provider
      value={{ signin, signout, user, newMessage, messages }}
    >
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
}
