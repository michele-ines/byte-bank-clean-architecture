// src/contexts/TransactionsContext.tsx
import {
  addDoc,
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { db } from "../config/firebaseConfig";
import { ITransaction } from "../interfaces/ITransaction";
import { useAuth } from "./AuthContext";

export interface Transaction extends DocumentData {
  id?: string;
  tipo: string;
  valor: number;
  description: string;
  createdAt: Date;
  updateAt: Date;
  userId: string;
  anexos: string[];
}

interface TransactionsContextData {
  transactions: Transaction[];
  addTransaction: (transaction: { tipo: string; valor: number, description: string }) => Promise<void>;
  loading: boolean;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export const TransactionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setTransactions([]);
      setLoading(false);
      return;
    }

    const q = query(collection(db, "transactions"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((t: any) => t.userId === user.uid) as Transaction[];
      setTransactions(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const addTransaction = async (transaction: ITransaction) => {
    if (!user) {
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
    <TransactionsContext.Provider value={{ transactions, addTransaction, loading }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export function useTransactions(): TransactionsContextData {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw new Error("useTransactions deve ser usado dentro de um TransactionsProvider");
  }

  return context;
}