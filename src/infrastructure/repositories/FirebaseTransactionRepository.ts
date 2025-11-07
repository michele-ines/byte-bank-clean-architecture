import type { Firestore } from 'firebase/firestore';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import type { FirebaseStorage } from 'firebase/storage';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';

import type { ITransaction } from '@domain/entities/Transaction';
import type { AttachmentFile, NewTransactionData } from '@domain/entities/TransactionData';
import type { TransactionRepository } from '@domain/repositories/TransactionRepository';
import {
  mapDocumentToTransaction,
  mapNewTransactionToDocument,
  mapUpdateTransactionToDocument
} from '../mappers/transaction.mapper';

export class FirebaseTransactionRepository implements TransactionRepository {

  constructor(
    private readonly db: Firestore,
    private readonly storage: FirebaseStorage
  ) {}

  private async uploadAttachments(
    userId: string, 
    attachments: AttachmentFile[]
  ): Promise<string[]> {
    const uploadPromises = attachments.map(async (file) => {
      const storageRef = ref(
        this.storage,
        `attachments/${userId}/${Date.now()}_${file.name}`
      );
      await uploadBytes(storageRef, file);
      return getDownloadURL(storageRef);
    });
    
    return Promise.all(uploadPromises);
  }

  private async deleteAttachments(attachmentUrls: string[]): Promise<void> {
    const deletePromises = attachmentUrls.map((url) => {
      const storageRef = ref(this.storage, url);
      return deleteObject(storageRef);
    });
    
    const results = await Promise.allSettled(deletePromises);

    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(`Falha ao deletar anexo: ${attachmentUrls[index]}`, result.reason);
      }
    });
  }

  observeTransactions(
    userId: string,
    callback: (transactions: ITransaction[]) => void
  ): () => void {
    const transactionsQuery = query(
      collection(this.db, 'transactions'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(transactionsQuery, (snapshot) => {
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

    const docRef = await addDoc(collection(this.db, 'transactions'), newTransaction);
    return docRef.id;
  }

  async updateTransaction(
    transactionId: string,
    userId: string,
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
      if (userId) {
        newAttachmentUrls = await this.uploadAttachments(userId, newAttachments);
      } else {
        console.warn("userId do usuário não foi fornecido ao tentar fazer upload de novos anexos.");
      }
    }

    const finalAttachments = [
      ...currentAttachments.filter(url => !attachmentsToRemove?.includes(url)),
      ...newAttachmentUrls
    ];

    const docRef = doc(this.db, 'transactions', transactionId);
    
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
    await deleteDoc(doc(this.db, 'transactions', transactionId));
  }
}