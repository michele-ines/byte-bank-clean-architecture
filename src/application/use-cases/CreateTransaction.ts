import { TransactionsRepository } from '@domain/transactions/TransactionsRepository';
import { Transaction } from '@domain/transactions/Transaction';

export class CreateTransaction {
  constructor(private readonly repo: TransactionsRepository) {}
  async exec(input: Transaction) {
    // regras/validações do caso de uso
    if (!input.description?.trim()) throw new Error('Descrição obrigatória');
    await this.repo.create(input);
  }
}
