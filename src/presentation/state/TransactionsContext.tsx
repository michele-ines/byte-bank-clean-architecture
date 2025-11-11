import type { ReactNode } from 'react';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { IAnexo, INewTransactionInput } from '@/domain/interfaces/auth.interfaces';
import { TransactionUseCasesFactory } from '@/domain/use-cases/TransactionUseCasesFactory';
import type { ITransaction } from '@domain/entities/Transaction';
import type { AttachmentFile, NewTransactionData } from '@domain/entities/TransactionData';
import { db, storage } from '@infrastructure/config/firebaseConfig';
import { FirebaseTransactionRepository } from '@infrastructure/repositories/FirebaseTransactionRepository';
import { useAuth } from '@presentation/state/AuthContext';
import { Timestamp } from 'firebase/firestore';
import { loggerService } from '../config/loggerService';



interface TransactionsContextData {
  transactions: ITransaction[];
  loading: boolean;
  addTransaction: {
    (transactionData: NewTransactionData, attachments: AttachmentFile[]): Promise<string>;
    (transaction: INewTransactionInput): Promise<void>;
  };
  updateTransaction: {
    (id: string, updatedTransaction: Partial<ITransaction>, newAttachments: AttachmentFile[], attachmentsToRemove: string[]): Promise<void>;
    (id: string, updatedTransaction: Partial<ITransaction>): Promise<void>;
  };
  deleteTransaction: (
    id: string,
    attachments?: string[]
  ) => Promise<void>;
  balance: number | null;
  loadingMore: boolean;
  hasMore: boolean;
  loadMoreTransactions: () => Promise<void>;
  uploadAttachmentAndUpdateTransaction: (
    transactionId: string,
    fileUri: string,
    fileName: string
  ) => Promise<void>;
  deleteAttachment: (transactionId: string, attachmentToDelete: IAnexo) => Promise<void>;
  deleteTransactions: (ids: string[]) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export const TransactionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const transactionUseCases = useMemo(() => {
    const transactionRepository = new FirebaseTransactionRepository(
      db,
      storage,
      loggerService 
    );
    return new TransactionUseCasesFactory(transactionRepository);
  }, []); 

  useEffect(() => {
    if (!user) {
      setTransactions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const unsubscribe = transactionUseCases.observe.execute(
      user.uid,
      (userTransactions): void => {
        setTransactions(userTransactions);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user, transactionUseCases]); 

  const handleAddTransaction = useCallback(
    async (
      transactionData: NewTransactionData,
      attachments: AttachmentFile[]
    ) => {
      if (!user) throw new Error('Usuário não autenticado');

      return await transactionUseCases.add.execute(
        user.uid,
        transactionData,
        attachments
      );
    },
    [user, transactionUseCases] 
  );

  const addTransactionWrapper = useCallback(
    async (...args: [NewTransactionData, AttachmentFile[]] | [INewTransactionInput]): Promise<void | string> => {
      if (args.length === 2) {
        return await handleAddTransaction(args[0], args[1]);
      }

      const legacy = args[0];
      const mapToDomainType = (t: INewTransactionInput['tipo'] | undefined): 'entrada' | 'saida' => {
        if (t === 'deposito') return 'entrada';
        return 'saida';
      };

      const domainTx: NewTransactionData = {
        descricao: legacy.description,
        valor: legacy.valor,
        tipo: mapToDomainType(legacy.tipo),
        categoria: '',
        data: Timestamp.now(),
      };

      await handleAddTransaction(domainTx, []);
      return;
    },
    [handleAddTransaction]
  );

  const handleUpdateTransaction = useCallback(
    async (
      id: string,
      updatedTransaction: Partial<ITransaction>,
      newAttachments: AttachmentFile[],
      attachmentsToRemove: string[]
    ) => {
      if (!user) throw new Error('Usuário não autenticado');

      const currentTx = transactions.find(t => t.id === id);
      const currentAttachments = currentTx?.attachments ?? [];

      await transactionUseCases.update.execute(
        id,
        user.uid,
        updatedTransaction,
        currentAttachments,
        newAttachments,
        attachmentsToRemove
      );
    },
    [user, transactions, transactionUseCases] 
  );

    const updateTransactionWrapper = useCallback(async (
      ...args: [string, Partial<ITransaction>] | [string, Partial<ITransaction>, AttachmentFile[], string[]]
    ) => {
      if (args.length === 2) {
        const [id, updatedTransaction] = args;
        return await handleUpdateTransaction(id, updatedTransaction, [], []);
      }
      const [id, updatedTransaction, newAttachments, attachmentsToRemove] = args;
      return await handleUpdateTransaction(id, updatedTransaction, newAttachments, attachmentsToRemove);
    }, [handleUpdateTransaction]);

  const handleDeleteTransaction = useCallback(
    async (id: string, attachments?: string[]) => {
      if (!user) throw new Error('Usuário não autenticado');

      const urlsToDelete = attachments ?? transactions.find(t => t.id === id)?.attachments ?? [];

      await transactionUseCases.delete.execute(id, urlsToDelete);
    },
    [user, transactions, transactionUseCases] 
  );

  const deleteTransactionsLegacy = useCallback(async (ids: string[]) => {
    await Promise.all(ids.map(id => handleDeleteTransaction(id)));
  }, [handleDeleteTransaction]);

  const uploadAttachmentAndUpdateTransactionLegacy = useCallback(async (transactionId: string, fileUri: string, fileName: string) => {
    const response = await fetch(fileUri);
    const blob = await response.blob();
    const attachment = Object.assign(blob, { name: fileName }) as unknown as AttachmentFile;
    await handleUpdateTransaction(transactionId, {}, [attachment], []);
  }, [handleUpdateTransaction]);

  const deleteAttachmentLegacy = useCallback(async (transactionId: string, attachmentToDelete: IAnexo) => {
    await handleUpdateTransaction(transactionId, {}, [], [attachmentToDelete.url]);
  }, [handleUpdateTransaction]);

  const loadMoreTransactionsLegacy = useCallback(async () => {
    return Promise.resolve();
  }, []);

  const loadingMore = false;
  const hasMore = false;

  const contextValue = useMemo(
    () => ({
      transactions,
      loading,
      addTransaction: addTransactionWrapper as unknown as TransactionsContextData['addTransaction'],
      updateTransaction: updateTransactionWrapper as unknown as TransactionsContextData['updateTransaction'],
      deleteTransaction: handleDeleteTransaction,
      balance: transactions.reduce((acc, t) => (t.tipo === 'entrada' ? acc + (t.valor ?? 0) : acc - (t.valor ?? 0)), 0),
      loadingMore,
      hasMore,
      loadMoreTransactions: loadMoreTransactionsLegacy,
      uploadAttachmentAndUpdateTransaction: uploadAttachmentAndUpdateTransactionLegacy,
      deleteAttachment: deleteAttachmentLegacy,
      deleteTransactions: deleteTransactionsLegacy,
    }),
    [
      transactions,
      loading,
      addTransactionWrapper,
      updateTransactionWrapper,
      loadingMore,
      hasMore,
      handleDeleteTransaction,
      loadMoreTransactionsLegacy,
      uploadAttachmentAndUpdateTransactionLegacy,
      deleteAttachmentLegacy,
      deleteTransactionsLegacy,
    ]
  );

  return (
    <TransactionsContext.Provider value={contextValue}>
      {children}
    </TransactionsContext.Provider>
  );
};

export function useTransactions(): TransactionsContextData {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error('useTransactions deve ser usado dentro de um TransactionsProvider');
  }
  return context;
}