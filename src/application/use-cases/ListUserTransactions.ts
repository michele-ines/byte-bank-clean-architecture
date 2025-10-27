import type { Transaction } from '@domain/transactions/Transaction';
import type { TransactionsRepository } from '@domain/transactions/TransactionsRepository';

export class ListUserTransactions {
  constructor(private readonly repo: TransactionsRepository) {}

  async exec(userId: string): Promise<Transaction[]> {
    return this.repo.listByUser(userId);
  }
}
