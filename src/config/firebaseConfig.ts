import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Cole aqui as suas credenciais do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB0vrAljSszWA69V_gWMNh6-r64cfae0EI",
  authDomain: "fiap-tc-3-c846a.firebaseapp.com",
  projectId: "fiap-tc-3-c846a",
  storageBucket: "fiap-tc-3-c846a.firebasestorage.app",
  messagingSenderId: "1020690642850",
  appId: "1:1020690642850:web:f716dc5c8bc572ee08e4fb"
};
// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firebase Authentication e obtém uma referência ao serviço
export const auth = getAuth(app);