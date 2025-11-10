import type { ITransaction } from '@domain/entities/Transaction';
import { useDI } from '@presentation/providers/di';

export function useCreateTransaction() {
  const { createTransaction } = useDI();
  return (tx: ITransaction) => createTransaction.exec(tx);
}
