import type { Transaction } from '@domain/transactions/Transaction';
import type { TransactionsRepository } from '@domain/transactions/TransactionsRepository';

export class CreateTransaction {
  constructor(private readonly repo: TransactionsRepository) {}

  async exec(input: Transaction): Promise<void> {
    // regras/validações do caso de uso
    if (!input.description?.trim()) {
      throw new Error('Descrição obrigatória');
    }

    await this.repo.create(input);
  }
}
