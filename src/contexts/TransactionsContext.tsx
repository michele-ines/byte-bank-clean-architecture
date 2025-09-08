// src/contexts/TransactionsContext.tsx

import {
  addDoc,
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp, // Importa o tipo Timestamp do Firestore
} from "firebase/firestore";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { db } from "../config/firebaseConfig";
import { useAuth } from "./AuthContext";

// =================================================================
// 📌 Tipagem Avançada
// =================================================================

// Define os tipos de transação permitidos para maior segurança de tipo.
export type TransactionType = "deposito" | "cambio" | "transferencia";

// Interface explícita para uma transação, sem depender de `DocumentData`.
export interface ITransaction {
  id: string;
  tipo: TransactionType;
  valor: number;
  description: string;
  createdAt: Timestamp | null; // Tipado para aceitar Timestamp do Firestore ou null
  updateAt: Timestamp | null;
  userId: string;
  anexos: string[];
}

// Tipo para os dados de entrada de uma nova transação.
export interface INewTransactionInput {
  tipo: TransactionType;
  valor: number;
  description: string;
}

interface ITransactionsContextData {
  transactions: ITransaction[];
  addTransaction: (transaction: INewTransactionInput) => Promise<void>;
  loading: boolean;
}

const TransactionsContext = createContext<ITransactionsContextData>(
  {} as ITransactionsContextData
);

export const TransactionsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); 
    if (!user) {
      setTransactions([]);
      setLoading(false);
      return;
    }

    const q = query(collection(db, "transactions"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const docData = doc.data() as DocumentData;
        return {
          ...docData,
          id: doc.id,
        } as ITransaction;
      });
      const userTransactions = data.filter(
        (t): t is ITransaction => t.userId === user.uid
      );

      setTransactions(userTransactions);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const addTransaction = async (transaction: INewTransactionInput) => {
    if (!user) {
      console.error("Tentativa de adicionar transação sem usuário autenticado.");
      throw new Error("Usuário não autenticado.");
    }

    await addDoc(collection(db, "transactions"), {
      ...transaction,
      userId: user.uid,
      anexos: [], 
      createdAt: serverTimestamp(),
      updateAt: serverTimestamp(),
    });
  };

  return (
    <TransactionsContext.Provider
      value={{ transactions, addTransaction, loading }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export function useTransactions(): ITransactionsContextData {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw new Error(
      "useTransactions deve ser usado dentro de um TransactionsProvider"
    );
  }

  return context;
}