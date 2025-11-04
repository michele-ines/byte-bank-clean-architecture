import type { AttachmentFile, ITransaction, NewTransactionData } from '../entities/Transaction';

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