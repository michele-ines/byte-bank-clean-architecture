import type { ITransaction } from './Transaction';

export type NewTransactionData = Omit<ITransaction, 'id' | 'userId' | 'createdAt'>;
export type AttachmentFile = File;
