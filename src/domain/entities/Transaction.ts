import type { IAnexo, INewTransactionInput } from '@/shared/interfaces/auth.interfaces';
import type { Timestamp } from 'firebase/firestore';
import type { AttachmentFile, NewTransactionData, TransactionType } from './TransactionData';

export interface ITransaction {
  id: string;
  userId: string;
  descricao: string;
  valor: number;
  tipo: TransactionType
  categoria: string;
  data: Timestamp;
  createdAt: Timestamp;
  attachments?: string[];
}

export interface TransactionsProviderProps {
  children: React.ReactNode;
}

export interface TransactionsContextData {
  transactions: ITransaction[];
  loading: boolean;
  startLoading: () => void;
  addTransaction: {
    (
      transactionData: NewTransactionData,
      attachments: AttachmentFile[]
    ): Promise<string>;
    (transaction: INewTransactionInput): Promise<void>;
  };
  updateTransaction: {
    (
      id: string,
      updatedTransaction: Partial<ITransaction>,
      newAttachments: AttachmentFile[],
      attachmentsToRemove: string[]
    ): Promise<void>;
    (id: string, updatedTransaction: Partial<ITransaction>): Promise<void>;
  };
  deleteTransaction: (id: string, attachments?: string[]) => Promise<void>;
  balance: number | null;
  loadingMore: boolean;
  hasMore: boolean;
  loadMoreTransactions: () => Promise<void>;
  uploadAttachmentAndUpdateTransaction: (
    transactionId: string,
    fileUri: string,
    fileName: string
  ) => Promise<void>;
  deleteAttachment: (
    transactionId: string,
    attachmentToDelete: IAnexo
  ) => Promise<void>;
  deleteTransactions: (ids: string[]) => Promise<void>;
}