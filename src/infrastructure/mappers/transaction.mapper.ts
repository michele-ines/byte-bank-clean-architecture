import { Money, Transaction } from '@domain/transactions/Transaction';
interface TransactionDoc {
  id: string;
  userId: string;
  amount: number;
  description: string;
  createdAt: string; 
}

export const fromDoc = (doc: TransactionDoc): Transaction =>
  new Transaction(
    doc.id,
    doc.userId,
    new Money(doc.amount),
    doc.description,
    new Date(doc.createdAt)
  );

export const toDoc = (tx: Transaction): Record<string, unknown> => ({
  id: tx.id,
  userId: tx.userId,
  amount: tx.amount.value,
  description: tx.description,
  createdAt: tx.createdAt.toISOString(),
});
