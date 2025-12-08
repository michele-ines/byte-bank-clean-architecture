import type { Timestamp } from 'firebase/firestore';
import type { TransactionType } from './TransactionData';

export interface ITransaction {
  id: string;
  userId: string;
  descricao: string;
  valor: number;
  tipo: TransactionType
  categoria: string;
  data: Timestamp;
  createdAt: Timestamp;
  attachments?: string[];
}