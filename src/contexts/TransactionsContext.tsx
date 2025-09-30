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
  updateDoc
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
import { db, storage } from "../config/firebaseConfig";
import {
  ITransaction,
  ITransactionsContextData,
} from "../shared/interfaces/auth.interfaces";
import { useAuth } from "./AuthContext";

export type TransactionType = "deposito" | "cambio" | "transferencia";

export interface INewTransactionInput {
  tipo: TransactionType;
  valor: number;
  description: string;
}

const PAGE_SIZE = 5;

const TransactionsContext = createContext<ITransactionsContextData>(
  {} as ITransactionsContextData
);

export const TransactionsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [lastVisible, setLastVisible] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    if (!user) {
      setTransactions([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "transactions"),
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
        };
      }) as ITransaction[];

      const userTransactions = data.filter((t) => t.userId === user.uid);

      setTransactions(userTransactions);
      setLoading(false);

      if (snapshot.docs.length > 0) {
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      }

      setHasMore(snapshot.docs.length >= PAGE_SIZE);
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

  const canLoadMore = (): boolean => {
    return hasMore && !loadingMore && lastVisible !== null;
  };

  const transformDocumentToTransaction = (doc: any): ITransaction => {
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
      ...docData,
      createdAt: convertedCreatedAt,
      updateAt: convertedUpdatedAt,
    } as ITransaction;
  };

  const fetchNextPage = async () => {
    const nextPageQuery = query(
      collection(db, "transactions"),
      orderBy("createdAt", "desc"),
      startAfter(lastVisible),
      limit(PAGE_SIZE)
    );

    const snapshot = await getDocs(nextPageQuery);
    return snapshot;
  };

 const updateTransactionsState = (
    newTransactions: ITransaction[],
    snapshot: any
  ) => {
    const userTransactions = newTransactions.filter(
      (t) => t.userId === user?.uid
    );

    setTransactions((prev) => {
      const combinedTransactions = [...prev, ...userTransactions];
      
      const uniqueTransactions = combinedTransactions.filter(
        (transaction, index, self) =>
          index === self.findIndex((t) => t.id === transaction.id)
      );
      
      return uniqueTransactions;
    });

    if (snapshot.docs.length > 0) {
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    }

    setHasMore(snapshot.docs.length >= PAGE_SIZE);
  };

  const loadMoreTransactions = async (): Promise<void> => {
    if (!canLoadMore()) return;

    setLoadingMore(true);

    try {
      const snapshot = await fetchNextPage();

      if (!snapshot.empty) {
        const newTransactions = snapshot.docs.map(transformDocumentToTransaction);
        updateTransactionsState(newTransactions, snapshot);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Erro ao carregar mais transações:", error);
      setHasMore(false);
    } finally {
      setLoadingMore(false);
    }
  };

  const uploadAttachmentAndUpdateTransaction = async (
    transactionId: string,
    fileUri: string,
    fileName: string
  ): Promise<void> => {
    if (!user) {
      throw new Error("Usuário não autenticado para fazer upload.");
    }

    try {
      const response = await fetch(fileUri);
      const blob = await response.blob();
      const storageRef = ref(storage, `attachments/${Date.now()}-${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, blob);

      await uploadTask;
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      const transactionRef = doc(db, "transactions", transactionId);
      const transactionSnap = await getDoc(transactionRef);
      const existingData = transactionSnap.data();
      const existingAnexos = existingData?.anexos || [];

      await updateDoc(transactionRef, {
        anexos: [...existingAnexos, downloadURL],
        updateAt: serverTimestamp(),
      });

      setTransactions((prev) =>
        prev.map((t) =>
          t.id === transactionId
            ? { ...t, anexos: [...(t.anexos || []), downloadURL] }
            : t
        )
      );
    } catch (error) {
      console.error("Erro ao fazer upload do anexo:", error);
      throw error;
    }
  };

  const deleteAttachment = async (transactionId: string, fileUrl: string) => {
    if (!user) {
      throw new Error("Usuário não autenticado para excluir.");
    }

    try {
      const fileRef = ref(storage, fileUrl);
      await deleteObject(fileRef);

      const transactionRef = doc(db, "transactions", transactionId);
      await updateDoc(transactionRef, {
        anexos: arrayRemove(fileUrl),
      });

      setTransactions((prev) =>
        prev.map((t) => {
          if (t.id === transactionId) {
            const updatedAnexos = t.anexos?.filter((url) => url !== fileUrl);
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
        addTransaction,
        loading,
        loadingMore,
        hasMore,
        loadMoreTransactions,
        updateTransaction,
        uploadAttachmentAndUpdateTransaction,
        deleteAttachment
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
