import { TransactionsRepository } from '@domain/transactions/TransactionsRepository';
import { Transaction } from '@domain/transactions/Transaction';

export class ListUserTransactions {
  constructor(private readonly repo: TransactionsRepository) {}
  async exec(userId: string): Promise<Transaction[]> {
    return this.repo.listByUser(userId);
  }
}
