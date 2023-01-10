import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDD1EeWw1JbcvVo4MnEjDCecSq0Sp2_AE4",
  authDomain: "quranapp-6c59f.firebaseapp.com",
  projectId: "quranapp-6c59f",
  storageBucket: "quranapp-6c59f.appspot.com",
  messagingSenderId: "759713666202",
  appId: "1:759713666202:web:f8a15ae5d76f1a996d7b23",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const realtime = getDatabase(app);
const auth = firebase.auth();

export { db, auth, realtime };
