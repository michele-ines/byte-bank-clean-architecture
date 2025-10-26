export type TransactionId = string;

export class Money {
  constructor(public readonly value: number) {
    if (!Number.isFinite(value)) throw new Error('Money inválido');
  }
}

export class Transaction {
  constructor(
    public readonly id: TransactionId,
    public readonly userId: string,
    public readonly amount: Money,
    public readonly description: string,
    public readonly createdAt: Date
  ) {}
}
