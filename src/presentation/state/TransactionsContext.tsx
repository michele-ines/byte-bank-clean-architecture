import {
  addDoc,
  arrayRemove,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  Timestamp,
  updateDoc,
  where,
  writeBatch
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { db, storage } from "@infrastructure/config/firebaseConfig";
import { IAnexo, INewTransactionInput, ITransaction, ITransactionsContextData } from "@shared/interfaces/auth.interfaces";
import { useAuth } from "./AuthContext";

const PAGE_SIZE = 5;

const TransactionsContext = createContext<ITransactionsContextData>(
  {} as ITransactionsContextData
);

export const TransactionsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [lastVisible, setLastVisible] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      setTransactions([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const q = query(
      collection(db, "transactions"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc"),
      limit(PAGE_SIZE)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const docData = doc.data();
        const createdAtTimestamp = docData.createdAt as Timestamp;
        const updatedAtTimestamp = docData.updateAt as Timestamp;
        const convertedCreatedAt = createdAtTimestamp
          ? createdAtTimestamp.toDate().toLocaleDateString("pt-BR")
          : new Date().toLocaleDateString("pt-BR");
        const convertedUpdatedAt = updatedAtTimestamp
          ? updatedAtTimestamp.toDate().toLocaleDateString("pt-BR")
          : new Date().toLocaleDateString("pt-BR");
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: convertedCreatedAt,
          tipo: docData.tipo,
          updateAt: convertedUpdatedAt,
        } as ITransaction;
      });
      setTransactions(data);
      setLoading(false);
      if (snapshot.docs.length > 0) {
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      }
      setHasMore(snapshot.docs.length >= PAGE_SIZE);
    });
    return () => unsubscribe();
  }, [user]);

  // EFEITO 2: PARA O CÁLCULO DO SALDO TOTAL EM TEMPO REAL
  useEffect(() => {
    if (!user) {
      setBalance(0);
      return;
    }
    const balanceQuery = query(
      collection(db, "transactions"),
      where("userId", "==", user.uid)
    );
    const unsubscribe = onSnapshot(balanceQuery, (snapshot) => {
      const total = snapshot.docs.reduce((acc, doc) => {
        const transaction = doc.data();
        if (transaction.tipo === "transferencia") {
          return acc - transaction.valor;
        }
        return acc + transaction.valor;
      }, 0);
      setBalance(total);
    });
    return () => unsubscribe();
  }, [user]);

  const addTransaction = async (transaction: INewTransactionInput) => {
    if (!user) throw new Error("Usuário não autenticado.");
    await addDoc(collection(db, "transactions"), {
      ...transaction,
      userId: user.uid,
      anexos: [],
      createdAt: serverTimestamp(),
      updateAt: serverTimestamp(),
    });
  };

  const updateTransaction = async (
    id: string,
    data: Partial<ITransaction>
  ): Promise<void> => {
    try {
      const transactionRef = doc(db, "transactions", id);
      await updateDoc(transactionRef, {
        ...data,
        updateAt: serverTimestamp(),
      });
      const updatedDateString = new Date().toLocaleDateString("pt-BR");
      setTransactions((prev) =>
        prev.map((transaction) =>
          transaction.id === id
            ? { ...transaction, ...data, updateAt: updatedDateString }
            : transaction
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar transação:", error);
      throw error;
    }
  };

  const loadMoreTransactions = async (): Promise<void> => {
    if (!user || loadingMore || !hasMore || !lastVisible) return;
    setLoadingMore(true);
    try {
      const nextPageQuery = query(
        collection(db, "transactions"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc"),
        startAfter(lastVisible),
        limit(PAGE_SIZE)
      );
      const snapshot = await getDocs(nextPageQuery);
      if (!snapshot.empty) {
        const newTransactions = snapshot.docs.map((doc) => {
           const docData = doc.data();
           const createdAtTimestamp = docData.createdAt as Timestamp;
           const updatedAtTimestamp = docData.updateAt as Timestamp;
           const convertedCreatedAt = createdAtTimestamp ? createdAtTimestamp.toDate().toLocaleDateString("pt-BR") : new Date().toLocaleDateString("pt-BR");
           const convertedUpdatedAt = updatedAtTimestamp ? updatedAtTimestamp.toDate().toLocaleDateString("pt-BR") : new Date().toLocaleDateString("pt-BR");
           return { id: doc.id, ...docData, createdAt: convertedCreatedAt, updateAt: convertedUpdatedAt } as ITransaction;
        });
        setTransactions((prev) => [...prev, ...newTransactions]);
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        setHasMore(snapshot.docs.length >= PAGE_SIZE);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Erro ao carregar mais transações:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const deleteTransactions = async (ids: string[]): Promise<void> => {
    if (!user) throw new Error("Usuário não autenticado.");
    const batch = writeBatch(db);
    ids.forEach(id => {
      batch.delete(doc(db, "transactions", id));
    });
    await batch.commit();
    setTransactions((prev) => prev.filter((t) => !ids.includes(t.id!)));
  };

  const uploadAttachmentAndUpdateTransaction = async (
    transactionId: string,
    fileUri: string,
    fileName: string
  ): Promise<void> => {
    if (!user) throw new Error("Usuário não autenticado para fazer upload.");
    try {
      const response = await fetch(fileUri);
      const blob = await response.blob();
      const storageRef = ref(storage, `attachments/${Date.now()}-${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, blob);
      await uploadTask;
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      const transactionRef = doc(db, "transactions", transactionId);
      const transactionSnap = await getDoc(transactionRef);
      const existingAnexos = transactionSnap.data()?.anexos || [];
      
      const newAttachment: IAnexo = { name: fileName, url: downloadURL };

      await updateDoc(transactionRef, {
        anexos: [...existingAnexos, newAttachment],
        updateAt: serverTimestamp(),
      });
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === transactionId
            ? { ...t, anexos: [...(t.anexos || []), newAttachment] }
            : t
        )
      );
    } catch (error) {
      console.error("Erro ao fazer upload do anexo:", error);
      throw error;
    }
  };

  const deleteAttachment = async (transactionId: string, attachmentToDelete: IAnexo) => {
    if (!user) throw new Error("Usuário não autenticado para excluir.");
    try {
      const fileRef = ref(storage, attachmentToDelete.url);
      await deleteObject(fileRef);
      const transactionRef = doc(db, "transactions", transactionId);
      await updateDoc(transactionRef, {
        anexos: arrayRemove(attachmentToDelete),
      });
      setTransactions((prev) =>
        prev.map((t) => {
          if (t.id === transactionId) {
            const updatedAnexos = t.anexos?.filter(
              (anexo) => anexo.url !== attachmentToDelete.url
            );
            return { ...t, anexos: updatedAnexos };
          }
          return t;
        })
      );
    } catch (error) {
      console.error("Erro ao excluir anexo:", error);
      throw error;
    }
  };

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        balance,
        addTransaction,
        loading,
        loadingMore,
        hasMore,
        loadMoreTransactions,
        updateTransaction,
        uploadAttachmentAndUpdateTransaction,
        deleteAttachment,
        deleteTransactions,
      }}
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