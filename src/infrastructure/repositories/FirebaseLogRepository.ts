import type { LogEntry } from '@domain/entities/LogEntry';
import type { ILogRepository } from '@domain/repositories/LogRepository';
import { addDoc, collection, type Firestore } from 'firebase/firestore';

export class FirebaseLogRepository implements ILogRepository {
  private readonly db: Firestore;
  private readonly collectionName = 'logs';

  constructor(db: Firestore) {
    this.db = db;
  }

  async saveLog(logEntry: LogEntry): Promise<void> {
    try {
      const logData = {
        ...logEntry,
        timestamp: logEntry.timestamp.toISOString(),
      };
      await addDoc(collection(this.db, this.collectionName), logData);
    } catch (error) {
      console.error('Firebase Error: Failed to save log.', error);
    }
  }
}