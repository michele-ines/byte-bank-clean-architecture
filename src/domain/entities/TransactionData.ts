import type { ITransaction } from './Transaction';

export type NewTransactionData = Omit<ITransaction, 'id' | 'uuid' | 'createdAt'>;
export type AttachmentFile = File;