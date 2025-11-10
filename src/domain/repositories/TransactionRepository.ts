import type { ITransaction } from '@domain/entities/Transaction';
import type { AttachmentFile, NewTransactionData } from '@domain/entities/TransactionData';

export interface TransactionRepository {
  observeTransactions(
    userId: string,
    callback: (transactions: ITransaction[]) => void
  ): () => void;
  
  addTransaction(
    userId: string,
    transactionData: NewTransactionData,
    attachments: AttachmentFile[]
  ): Promise<string>;
  
  updateTransaction(
    transactionId: string,
    userId: string,
    updates: Partial<ITransaction>,
    currentAttachments: string[],
    newAttachments: AttachmentFile[],
    attachmentsToRemove: string[]
  ): Promise<void>;
  
  deleteTransaction(
    transactionId: string,
    attachmentUrls: string[]
  ): Promise<void>;
}