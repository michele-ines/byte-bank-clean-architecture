import { TransactionsRepository } from '@domain/transactions/TransactionsRepository';
import { Transaction, TransactionId } from '@domain/transactions/Transaction';

// Troque por sua SDK/config real
export class FirebaseTransactionsRepository implements TransactionsRepository {
  async listByUser(userId: string) {
    // TODO: buscar no Firebase/Firestore
    return [];
  }
  async findById(id: TransactionId) {
    return null;
  }
  async create(tx: Transaction) {
    // TODO: persistir no Firebase/Firestore
  }
}
