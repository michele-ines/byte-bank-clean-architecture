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
import type { ILoggerService } from '@domain/interfaces/log.Interfaces';
import type { TransactionRepository } from '@domain/repositories/TransactionRepository';
import {
  mapDocumentToTransaction,
  mapNewTransactionToDocument,
  mapUpdateTransactionToDocument
} from '../mappers/transaction.mapper';

export class FirebaseTransactionRepository implements TransactionRepository {

  constructor(
    private readonly db: Firestore,
    private readonly storage: FirebaseStorage,
    private readonly logger: ILoggerService
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
       this.logger.error(
          'Falha ao deletar anexo no storage',
          result.reason as Error,
          {
            url: attachmentUrls[index],
            component: 'FirebaseTransactionRepository.deleteAttachments',
          }
        );
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
    }, (error) => {
        this.logger.error('Erro no observeTransactions', error, { userId });
    });

    return unsubscribe;
  }

 async addTransaction(
    userId: string,
    transactionData: NewTransactionData,
    attachments: AttachmentFile[]
  ): Promise<string> {
    try {
      let attachmentUrls: string[] = [];
      if (attachments && attachments.length > 0) {
        attachmentUrls = await this.uploadAttachments(userId, attachments);
      }

      const newTransaction = mapNewTransactionToDocument(
        userId,
        transactionData,
        attachmentUrls
      );

      const docRef = await addDoc(
        collection(this.db, 'transactions'),
        newTransaction
      );
      return docRef.id;
    } catch (error) {
      this.logger.error(
        'Erro em FirebaseTransactionRepository.addTransaction',
        error as Error,
        { userId }
      );
      throw error; 
    }
  }

 async updateTransaction(
    transactionId: string,
    userId: string,
    updates: Partial<ITransaction>,
    currentAttachments: string[],
    newAttachments: AttachmentFile[],
    attachmentsToRemove: string[]
  ): Promise<void> {
    try {
      if (attachmentsToRemove && attachmentsToRemove.length > 0) {
        await this.deleteAttachments(attachmentsToRemove);
      }

      let newAttachmentUrls: string[] = [];
      if (newAttachments && newAttachments.length > 0) {
        if (userId) {
          newAttachmentUrls = await this.uploadAttachments(
            userId,
            newAttachments
          );
        } else {
          this.logger.warn(
            'UserId não foi fornecido ao tentar fazer upload de novos anexos',
            {
              transactionId,
              component: 'FirebaseTransactionRepository.updateTransaction',
            }
          );
        }
      }

      const finalAttachments = [
        ...currentAttachments.filter((url) => !attachmentsToRemove?.includes(url)),
        ...newAttachmentUrls,
      ];

      const docRef = doc(this.db, 'transactions', transactionId);

      const dataToUpdate = mapUpdateTransactionToDocument(
        updates,
        finalAttachments
      );

      await updateDoc(docRef, dataToUpdate);
    } catch (error) {
      this.logger.error(
        'Erro em FirebaseTransactionRepository.updateTransaction',
        error as Error,
        { transactionId, userId }
      );
      throw error; 
    }
  }

  async deleteTransaction(
    transactionId: string,
    attachmentUrls: string[]
  ): Promise<void> {
    try {
      if (attachmentUrls && attachmentUrls.length > 0) {
        await this.deleteAttachments(attachmentUrls);
      }
      await deleteDoc(doc(this.db, 'transactions', transactionId));
    } catch (error) {
      this.logger.error(
        'Erro em FirebaseTransactionRepository.deleteTransaction',
        error as Error,
        { transactionId }
      );
      throw error; 
    }
  }
}