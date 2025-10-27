import type { Transaction, TransactionId } from '@domain/transactions/Transaction';
import type { TransactionsRepository } from '@domain/transactions/TransactionsRepository';
export class FirebaseTransactionsRepository implements TransactionsRepository {
  listByUser(userId: string): Promise<Transaction[]> {
    return Promise.resolve([]);
  }

  findById(id: TransactionId): Promise<Transaction | null> {
    return Promise.resolve(null);
  }

  create(tx: Transaction): Promise<void> {
    return Promise.resolve();
  }
}
