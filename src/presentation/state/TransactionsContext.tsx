import type { DocumentData, QueryDocumentSnapshot, Timestamp } from "firebase/firestore";
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
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import type { ReactNode } from "react";
import React, { createContext, useContext, useEffect, useState } from "react";

import { db, storage } from "@infrastructure/config/firebaseConfig";
import type {
  IAnexo,
  INewTransactionInput,
  ITransaction,
  ITransactionsContextData,
} from "@shared/interfaces/auth.interfaces";
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
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);

  // 🔹 Efeito 1: Ouve as transações em tempo real
  useEffect((): (() => void) => {
    if (!user) {
      setTransactions([]);
      setLoading(false);
      return () => undefined;
    }

    setLoading(true);
    const q = query(
      collection(db, "transactions"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc"),
      limit(PAGE_SIZE)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: ITransaction[] = snapshot.docs.map((docSnap) => {
        const docData = docSnap.data() as ITransaction;

        // ✅ Conversão segura para Timestamp
        const createdAtTimestamp =
          typeof docData.createdAt === "object" &&
          docData.createdAt !== null &&
          "toDate" in docData.createdAt
            ? (docData.createdAt as Timestamp)
            : undefined;

        const updatedAtTimestamp =
          typeof docData.updateAt === "object" &&
          docData.updateAt !== null &&
          "toDate" in docData.updateAt
            ? (docData.updateAt as Timestamp)
            : undefined;

        const convertedCreatedAt = createdAtTimestamp
          ? createdAtTimestamp.toDate().toLocaleDateString("pt-BR")
          : new Date().toLocaleDateString("pt-BR");

        const convertedUpdatedAt = updatedAtTimestamp
          ? updatedAtTimestamp.toDate().toLocaleDateString("pt-BR")
          : new Date().toLocaleDateString("pt-BR");

        return {
          ...docData,
          id: docSnap.id,
          createdAt: convertedCreatedAt,
          updateAt: convertedUpdatedAt,
        };
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

  // 🔹 Efeito 2: Calcula saldo total em tempo real
  useEffect((): (() => void) => {
    if (!user) {
      setBalance(0);
      return () => undefined;
    }

    const balanceQuery = query(
      collection(db, "transactions"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(balanceQuery, (snapshot) => {
      const total = snapshot.docs.reduce((acc, docSnap) => {
        const transaction = docSnap.data() as ITransaction;
        if (transaction.tipo === "transferencia") {
          return acc - transaction.valor;
        }
        return acc + transaction.valor;
      }, 0);
      setBalance(total);
    });

    return () => unsubscribe();
  }, [user]);

  // 🔹 Adiciona nova transação
  const addTransaction = async (transaction: INewTransactionInput): Promise<void> => {
    if (!user) throw new Error("Usuário não autenticado.");
    await addDoc(collection(db, "transactions"), {
      ...transaction,
      userId: user.uid,
      anexos: [],
      createdAt: serverTimestamp(),
      updateAt: serverTimestamp(),
    });
  };

  // 🔹 Atualiza transação existente
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

  // 🔹 Carrega mais transações (paginação)
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
        const newTransactions: ITransaction[] = snapshot.docs.map((docSnap) => {
          const docData = docSnap.data() as ITransaction;

          const createdAtTimestamp =
            typeof docData.createdAt === "object" &&
            docData.createdAt !== null &&
            "toDate" in docData.createdAt
              ? (docData.createdAt as Timestamp)
              : undefined;

          const updatedAtTimestamp =
            typeof docData.updateAt === "object" &&
            docData.updateAt !== null &&
            "toDate" in docData.updateAt
              ? (docData.updateAt as Timestamp)
              : undefined;

          const convertedCreatedAt = createdAtTimestamp
            ? createdAtTimestamp.toDate().toLocaleDateString("pt-BR")
            : new Date().toLocaleDateString("pt-BR");

          const convertedUpdatedAt = updatedAtTimestamp
            ? updatedAtTimestamp.toDate().toLocaleDateString("pt-BR")
            : new Date().toLocaleDateString("pt-BR");

          return {
            ...docData,
            id: docSnap.id,
            createdAt: convertedCreatedAt,
            updateAt: convertedUpdatedAt,
          };
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

  // 🔹 Exclui múltiplas transações
  const deleteTransactions = async (ids: string[]): Promise<void> => {
    if (!user) throw new Error("Usuário não autenticado.");
    const batch = writeBatch(db);
    ids.forEach((id) => {
      batch.delete(doc(db, "transactions", id));
    });
    await batch.commit();
    setTransactions((prev) => prev.filter((t) => !ids.includes(t.id!)));
  };

  // 🔹 Upload de anexo e atualização da transação
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

      // ✅ Tipagem segura para eliminar o erro no-unsafe-assignment
      const transactionData = transactionSnap.data() as { anexos?: IAnexo[] } | undefined;
      const existingAnexos: IAnexo[] = transactionData?.anexos ?? [];

      const newAttachment: IAnexo = { name: fileName, url: downloadURL };

      await updateDoc(transactionRef, {
        anexos: [...existingAnexos, newAttachment],
        updateAt: serverTimestamp(),
      });

      setTransactions((prev) =>
        prev.map((t) =>
          t.id === transactionId
            ? { ...t, anexos: [...(t.anexos ?? []), newAttachment] }
            : t
        )
      );
    } catch (error) {
      console.error("Erro ao fazer upload do anexo:", error);
      throw error;
    }
  };

  // 🔹 Exclui anexo
  const deleteAttachment = async (
    transactionId: string,
    attachmentToDelete: IAnexo
  ): Promise<void> => {
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

// 🔹 Hook de consumo do contexto
export function useTransactions(): ITransactionsContextData {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error(
      "useTransactions deve ser usado dentro de um TransactionsProvider"
    );
  }
  return context;
}
