// src/contexts/TransactionsContext.tsx
import {
  addDoc,
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { db, storage } from "../config/firebaseConfig";

interface Transaction extends DocumentData {
  id?: string;
  description: string;
  amount: number;
  date: Date;
  receiptUrl?: string;
}

interface TransactionsContextData {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id">, receiptFile?: Blob) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export const TransactionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const q = query(collection(db, "transactions"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Transaction[];
      setTransactions(data);
    });

    return () => unsubscribe();
  }, []);

  const addTransaction = async (transaction: Omit<Transaction, "id">, receiptFile?: Blob) => {
    let receiptUrl: string | undefined;

    if (receiptFile) {
      const storageRef = ref(storage, `receipts/${Date.now()}.jpg`);
      const snapshot = await uploadBytes(storageRef, receiptFile);
      receiptUrl = await getDownloadURL(snapshot.ref);
    }

    await addDoc(collection(db, "transactions"), {
      ...transaction,
      receiptUrl,
      date: transaction.date ?? new Date(),
    });
  };

  return (
    <TransactionsContext.Provider value={{ transactions, addTransaction }}>
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
