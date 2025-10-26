import { Transaction, Money } from '@domain/transactions/Transaction';
export const fromDoc = (doc: any): Transaction =>
  new Transaction(doc.id, doc.userId, new Money(doc.amount), doc.description, new Date(doc.createdAt));
export const toDoc = (tx: Transaction) => ({
  id: tx.id, userId: tx.userId, amount: tx.amount.value, description: tx.description, createdAt: tx.createdAt.toISOString()
});
