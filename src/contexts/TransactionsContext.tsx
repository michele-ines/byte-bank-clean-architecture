import {
  addDoc,
  collection,
  doc,
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
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { db } from "../config/firebaseConfig";
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

      // atualiza estado local
      setTransactions((prev) =>
        prev.map((transaction) =>
          transaction.id === id ? { ...transaction, ...data } : transaction
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

    setTransactions((prev) => [...prev, ...userTransactions]);

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

  const deleteTransactions = async (ids: string[]): Promise<void> => {
    if (!user) {
      console.error("Tentativa de excluir transações sem usuário autenticado.");
      throw new Error("Usuário não autenticado.");
    }

    try {
      // Importar deleteDoc dinamicamente para evitar problemas de import
      const { deleteDoc } = await import("firebase/firestore");
      
      const deletePromises = ids.map(async (id) => {
        const transactionRef = doc(db, "transactions", id);
        return deleteDoc(transactionRef);
      });

      await Promise.all(deletePromises);

      // Atualizar estado local removendo as transações excluídas
      setTransactions((prev) => prev.filter((transaction) => !ids.includes(transaction.id!)));
    } catch (error) {
      console.error("Erro ao excluir transações:", error);
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
