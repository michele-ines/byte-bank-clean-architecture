import { useDI } from '@presentation/providers/di';
import type { Transaction } from '@domain/transactions/Transaction';

export function useCreateTransaction() {
  const { createTransaction } = useDI();
  return (tx: Transaction) => createTransaction.exec(tx);
}
