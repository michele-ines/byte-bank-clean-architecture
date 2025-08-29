import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB0vrAljSszWA69V_gWMNh6-r64cfae0EI",
  authDomain: "fiap-tc-3-c846a.firebaseapp.com",
  projectId: "fiap-tc-3-c846a",
  storageBucket: "fiap-tc-3-c846a.firebasestorage.app",
  messagingSenderId: "1020690642850",
  appId: "1:1020690642850:web:f716dc5c8bc572ee08e4fb",
};

const app: FirebaseApp = initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app); // sem persistência no Expo Go
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);
