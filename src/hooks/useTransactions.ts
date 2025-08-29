import { db, storage } from "@/src/config/firebaseConfig";
import {
  addDoc,
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";

export interface Transaction extends DocumentData {
  id?: string;
  description: string;
  amount: number;
  date: Date;
  receiptUrl?: string;
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const q = query(collection(db, "transactions"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Transaction[];
      setTransactions(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  /** Adiciona transação (opcionalmente com Blob de recibo) */
  const addTransaction = async (
    transaction: Omit<Transaction, "id">,
    receiptFile?: Blob
  ) => {
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

  /** Adiciona transação recebendo direto uma fileUri (ImagePicker/DocumentPicker) */
  const addTransactionWithReceipt = async (
    transaction: Omit<Transaction, "id">,
    fileUri: string
  ) => {
    let receiptUrl: string | undefined;

    if (fileUri) {
      const response = await fetch(fileUri);
      const blob = await response.blob();

      const storageRef = ref(storage, `receipts/${Date.now()}.jpg`);
      const snapshot = await uploadBytes(storageRef, blob);
      receiptUrl = await getDownloadURL(snapshot.ref);
    }

    await addDoc(collection(db, "transactions"), {
      ...transaction,
      receiptUrl,
      date: transaction.date ?? new Date(),
    });
  };

  return { transactions, addTransaction, addTransactionWithReceipt, loading };
}
