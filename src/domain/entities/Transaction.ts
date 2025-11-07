import type { Timestamp } from 'firebase/firestore';

export interface ITransaction {
  id: string; 
  uuid: string; 
  userId: string; 
  descricao: string;
  valor: number;
  tipo: 'entrada' | 'saida';
  categoria: string;
  data: Timestamp;
  createdAt: Timestamp;
  attachments?: string[];
}