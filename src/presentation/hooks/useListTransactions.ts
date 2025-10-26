import { useDI } from '@presentation/providers/di';

export function useListTransactions() {
  const { listUserTransactions } = useDI();
  return (userId: string) => listUserTransactions.exec(userId);
}
