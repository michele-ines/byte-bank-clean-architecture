import type { Transaction, TransactionId } from './Transaction';

export interface TransactionsRepository {
  listByUser(userId: string): Promise<Transaction[]>;
  findById(id: TransactionId): Promise<Transaction | null>;
  create(tx: Transaction): Promise<void>;
}
