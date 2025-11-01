
import type { Timestamp } from 'firebase/firestore';

export interface ITransaction {
  id: string; // Document ID
  uuid: string; // User ID
  descricao: string;
  valor: number;
  tipo: 'entrada' | 'saida';
  categoria: string;
  data: Timestamp; // Data da transação (definida pelo usuário)
  createdAt: Timestamp;
  attachments?: string[];
}

export type NewTransactionData = Omit<ITransaction, 'id' | 'uuid' | 'createdAt'>;


export type AttachmentFile = File;