import type { ReactNode } from 'react';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { TransactionUseCases } from '@/application/use-cases/TransactionUseCases';
import type { AttachmentFile, ITransaction, NewTransactionData } from '@domain/entities/Transaction';
import { FirebaseTransactionRepository } from '@infrastructure/repositories/FirebaseTransactionRepository';
import { useAuth } from '@presentation/state/AuthContext';
import type { IAnexo, INewTransactionInput } from '@shared/interfaces/auth.interfaces';
import { Timestamp } from 'firebase/firestore';

const transactionRepository = new FirebaseTransactionRepository();
const transactionUseCases = new TransactionUseCases(transactionRepository);

// --- Interface do Contexto ---
interface TransactionsContextData {
  transactions: ITransaction[];
  loading: boolean;

  // Suporta sobrecarga: chamada nova (domínio) e chamada legada (UI/tests)
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

  // Campos e métodos legados para compatibilidade com código / testes antigos
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

// --- Provider ---
export const TransactionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // Pega o usuário logado

  // Efeito para observar transações
  useEffect(() => {
    if (!user) {
      setTransactions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    // Chama o Caso de Uso para observar
    const unsubscribe = transactionUseCases.observe.execute(
      user.uid,
      (userTransactions) => {
        setTransactions(userTransactions);
        setLoading(false);
      }
    );

    // Retorna a função de unsubscribe para limpar o listener
    return () => unsubscribe();
  }, [user]); // Depende do 'user'

  // --- Funções de Ação (agora delegam para os Casos de Uso) ---

  const handleAddTransaction = useCallback(
    async (
      transactionData: NewTransactionData,
      attachments: AttachmentFile[]
    ) => {
      if (!user) throw new Error('Usuário não autenticado');

      // Chama o Caso de Uso 'add'
      return await transactionUseCases.add.execute(
        user.uid,
        transactionData,
        attachments
      );
    },
    [user] // Depende do 'user' para injetar o 'user.uid'
  );

  // Wrapper compatível com a API legada usada por alguns consumidores/tests
  const addTransactionWrapper = useCallback(
    async (...args: [NewTransactionData, AttachmentFile[]] | [INewTransactionInput]): Promise<void | string> => {
      // assinatura nova: (transactionData, attachments)
      if (args.length === 2) {
        return await handleAddTransaction(args[0], args[1]);
      }

      // assinatura legada: (INewTransactionInput)
      const legacy = args[0];
      // Mapear para NewTransactionData do domínio
      const mapToDomainType = (t: INewTransactionInput['tipo'] | undefined): 'entrada' | 'saida' => {
        if (t === 'deposito') return 'entrada';
        return 'saida';
      };

      const domainTx: NewTransactionData = {
        descricao: legacy.description,
        valor: legacy.valor,
        tipo: mapToDomainType(legacy.tipo),
        categoria: '',
        // usar Timestamp.now() para compatibilidade com o domínio
        data: Timestamp.now(),
      };

      // Chama a implementação existente sem anexos
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

      // Pega a lista de anexos atuais da transação
      const currentTx = transactions.find(t => t.id === id);
  const currentAttachments = currentTx?.attachments ?? [];

      // Adiciona o 'userId' do usuário aos dados de update,
      // pois o repositório precisa dele para uploads
      const updatesWithUserId = {
          ...updatedTransaction,
          userId: user.uid,
      };

      // Chama o Caso de Uso 'update'
      await transactionUseCases.update.execute(
        id,
        updatesWithUserId,
        currentAttachments,
        newAttachments,
        attachmentsToRemove
      );
    },
    [user, transactions] // Depende do 'user' e da lista de 'transactions'
  );

    // Compatibilidade: aceitar chamada legada updateTransaction(id, updatedTransaction)
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

      // Pega os anexos da transação se não forem passados
      const urlsToDelete = attachments ?? transactions.find(t => t.id === id)?.attachments ?? [];

      // Chama o Caso de Uso 'delete'
      await transactionUseCases.delete.execute(id, urlsToDelete);
    },
    [user, transactions] // Depende do 'user' e da lista de 'transactions'
  );

  // --- Métodos legados para compatibilidade ---
  const deleteTransactionsLegacy = useCallback(async (ids: string[]) => {
    await Promise.all(ids.map(id => handleDeleteTransaction(id)));
  }, [handleDeleteTransaction]);

  const uploadAttachmentAndUpdateTransactionLegacy = useCallback(async (transactionId: string, fileUri: string, fileName: string) => {
    // Converte URI para blob e chama update
    const response = await fetch(fileUri);
    const blob = await response.blob();
    const attachment = Object.assign(blob, { name: fileName }) as unknown as AttachmentFile;
    await handleUpdateTransaction(transactionId, {}, [attachment], []);
  }, [handleUpdateTransaction]);

  const deleteAttachmentLegacy = useCallback(async (transactionId: string, attachmentToDelete: IAnexo) => {
    await handleUpdateTransaction(transactionId, {}, [], [attachmentToDelete.url]);
  }, [handleUpdateTransaction]);

  const loadMoreTransactionsLegacy = useCallback(async () => {
    // funcionalidade de paginação removida — placeholder noop
    return Promise.resolve();
  }, []);

  const loadingMore = false;
  const hasMore = false;

  // --- Valor do Contexto ---
  const contextValue = useMemo(
    () => ({
      transactions,
      loading,
    addTransaction: addTransactionWrapper as unknown as TransactionsContextData['addTransaction'],
    updateTransaction: updateTransactionWrapper as unknown as TransactionsContextData['updateTransaction'],
      deleteTransaction: handleDeleteTransaction,
      // legados
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

// --- Hook ---
export function useTransactions(): TransactionsContextData {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error('useTransactions deve ser usado dentro de um TransactionsProvider');
  }
  return context;
}
