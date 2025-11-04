import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where
} from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';

import type { AttachmentFile, NewTransactionData } from '@/domain/entities/TransactionData';
import type { ITransaction } from '@domain/entities/Transaction';
import type { TransactionRepository } from '@domain/repositories/TransactionRepository';
import { db, storage } from '../config/firebaseConfig';
import {
  mapDocumentToTransaction,
  mapNewTransactionToDocument,
  mapUpdateTransactionToDocument
} from '../mappers/transaction.mapper';

export class FirebaseTransactionRepository implements TransactionRepository {

  private async uploadAttachments(
    userId: string, 
    attachments: AttachmentFile[]
  ): Promise<string[]> {
    const urls: string[] = [];
    for (const file of attachments) {
      const storageRef = ref(
        storage,
        `attachments/${userId}/${Date.now()}_${file.name}`
      );
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      urls.push(url);
    }
    return urls;
  }

  private async deleteAttachments(attachmentUrls: string[]): Promise<void> {
    const deletePromises = attachmentUrls.map((url) => {
      const storageRef = ref(storage, url);
      return deleteObject(storageRef);
    });
    await Promise.all(deletePromises);
  }

  observeTransactions(
    userId: string,
    callback: (transactions: ITransaction[]) => void
  ): () => void {
    const q = query(
      collection(db, 'transactions'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userTransactions: ITransaction[] = [];
      snapshot.forEach((doc) => {
        userTransactions.push(mapDocumentToTransaction(doc.id, doc.data()));
      });
      callback(userTransactions);
    });

    return unsubscribe;
  }

  async addTransaction(
    userId: string,
    transactionData: NewTransactionData,
    attachments: AttachmentFile[]
  ): Promise<string> {
    let attachmentUrls: string[] = [];
    if (attachments && attachments.length > 0) {
      attachmentUrls = await this.uploadAttachments(userId, attachments);
    }

    const newTransaction = mapNewTransactionToDocument(
        userId, 
        transactionData, 
        attachmentUrls
    );

    const docRef = await addDoc(collection(db, 'transactions'), newTransaction);
    return docRef.id;
  }

  async updateTransaction(
    transactionId: string,
    updates: Partial<ITransaction>,
    currentAttachments: string[],
    newAttachments: AttachmentFile[],
    attachmentsToRemove: string[]
  ): Promise<void> {
    if (attachmentsToRemove && attachmentsToRemove.length > 0) {
      await this.deleteAttachments(attachmentsToRemove);
    }

    let newAttachmentUrls: string[] = [];
    if (newAttachments && newAttachments.length > 0) {
      const getUserIdFromUpdates = (u: Partial<ITransaction>): string | undefined => {
        const candidate = (u as unknown as { userId?: string; uuid?: string }).userId ?? (u as unknown as { userId?: string; uuid?: string }).uuid;
        return typeof candidate === 'string' ? candidate : undefined;
      };

      const uploaderId = getUserIdFromUpdates(updates);
      if (uploaderId) {
        newAttachmentUrls = await this.uploadAttachments(uploaderId, newAttachments);
      }
    }

    const finalAttachments = [
      ...currentAttachments.filter(url => !attachmentsToRemove?.includes(url)),
      ...newAttachmentUrls
    ];

    const docRef = doc(db, 'transactions', transactionId);
    
    const dataToUpdate = mapUpdateTransactionToDocument(
        updates, 
        finalAttachments
    );

    await updateDoc(docRef, dataToUpdate);
  }

  async deleteTransaction(
    transactionId: string,
    attachmentUrls: string[]
  ): Promise<void> {
    if (attachmentUrls && attachmentUrls.length > 0) {
      await this.deleteAttachments(attachmentUrls);
    }
    await deleteDoc(doc(db, 'transactions', transactionId));
  }
}