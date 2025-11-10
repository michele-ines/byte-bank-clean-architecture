import type { EncryptionService } from '@domain/security/EncryptionService';
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
    private readonly storage: FirebaseStorage,
    private readonly encryptionService: EncryptionService
  ) {}

  private isEncryptedString(value: string): boolean {
    if (!value || typeof value !== 'string') return false;
    return value.length % 4 === 0 && value.length > 20;
  }

  private isEncryptedNumber(value: unknown): boolean {
    if (typeof value === 'number') return false;
    if (typeof value === 'string') {
    return this.isEncryptedString(value);
  }
    return false;
  }

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

    const unsubscribe = onSnapshot(transactionsQuery, async (snapshot) => {
      const userTransactions: ITransaction[] = [];
      
      for (const docSnap of snapshot.docs) {
        const data = docSnap.data();
        const transaction = mapDocumentToTransaction(docSnap.id, data);
        
        try {
          const decryptedTransaction: ITransaction = {
            ...transaction,
            descricao: this.isEncryptedString(transaction.descricao)
              ? await this.encryptionService.decrypt(transaction.descricao)
              : transaction.descricao,
            valor: this.isEncryptedNumber(transaction.valor)
              ? await this.encryptionService.decryptNumber(String(transaction.valor))
              : transaction.valor,
            categoria: this.isEncryptedString(transaction.categoria)
              ? await this.encryptionService.decrypt(transaction.categoria)
              : transaction.categoria,
          };

          userTransactions.push(decryptedTransaction);
        } catch (error) {
          console.error('Erro ao descriptografar transação:', error);
          userTransactions.push(transaction);
        }
      }
      
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

    const encryptedTransaction = {
      ...newTransaction,
      descricao: await this.encryptionService.encrypt(newTransaction.descricao as string),
      valor: await this.encryptionService.encryptNumber(newTransaction.valor as number),
      categoria: await this.encryptionService.encrypt(newTransaction.categoria as string),
    };

    const docRef = await addDoc(collection(this.db, 'transactions'), encryptedTransaction);
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

    const encryptedUpdates: Partial<ITransaction> = { ...updates };
    
    if (updates.descricao) {
      encryptedUpdates.descricao = await this.encryptionService.encrypt(updates.descricao);
    }
    if (updates.valor !== undefined) {
      encryptedUpdates.valor = await this.encryptionService.encryptNumber(updates.valor) as unknown as number;
    }
    if (updates.categoria) {
      encryptedUpdates.categoria = await this.encryptionService.encrypt(updates.categoria);
    }
    
    const docRef = doc(this.db, 'transactions', transactionId);
    
    const dataToUpdate = mapUpdateTransactionToDocument(
        encryptedUpdates, 
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
