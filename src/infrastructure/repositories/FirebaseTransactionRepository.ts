import type { PartialWithFieldValue } from 'firebase/firestore';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
    where,
} from 'firebase/firestore';
import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytes,
} from 'firebase/storage';

import type { AttachmentFile, ITransaction, NewTransactionData } from '@domain/entities/Transaction';
import type { TransactionRepository } from '@domain/repositories/TransactionRepository';
import { db, storage } from '../config/firebaseConfig';
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
      await uploadBytes(storageRef, file); // Faz o upload
      const url = await getDownloadURL(storageRef); // Pega a URL
      urls.push(url);
    }
    return urls;
  }

  private async deleteAttachments(attachmentUrls: string[]): Promise<void> {
    // Itera sobre as URLs e deleta cada uma
    const deletePromises = attachmentUrls.map((url) => {
      const storageRef = ref(storage, url);
      return deleteObject(storageRef);
    });
    await Promise.all(deletePromises);
  }

  // --- Implementação dos Métodos Públicos do Contrato ---

  observeTransactions(
    userId: string,
    callback: (transactions: ITransaction[]) => void
  ): () => void {
    // Lógica do Firestore que estava no useEffect
    const q = query(
      collection(db, 'transactions'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userTransactions: ITransaction[] = [];
      snapshot.forEach((doc) => {
        const raw = doc.data() as Record<string, unknown>;
        // Helper para ler campos possivelmente presentes no documento
        const readStringField = (obj: Record<string, unknown>, key: string): string | undefined => {
          const v = obj[key];
          return typeof v === 'string' ? v : undefined;
        };

        // Normaliza o campo de usuário: se o documento tiver 'userId' mapeia para 'uuid'
        const normalized = {
          ...raw,
          uuid: readStringField(raw, 'uuid') ?? readStringField(raw, 'userId') ?? readStringField(raw, 'user_id'),
        } as Record<string, unknown>;

  userTransactions.push({ id: doc.id, ...(normalized as Partial<ITransaction>) } as ITransaction);
      });
      callback(userTransactions); // Envia os dados para o callback
    });

    return unsubscribe; // Retorna a função de unsubscribe
  }

  async addTransaction(
    userId: string,
    transactionData: NewTransactionData,
    attachments: AttachmentFile[]
  ): Promise<string> {
    // 1. Faz upload dos anexos, se existirem
    let attachmentUrls: string[] = [];
    if (attachments && attachments.length > 0) {
      attachmentUrls = await this.uploadAttachments(userId, attachments);
    }

    // 2. Prepara o objeto da transação
    const newTransaction = {
      ...transactionData,
      userId: userId,
      createdAt: serverTimestamp(), // Pega a data/hora do servidor
      attachments: attachmentUrls,
    };

    // 3. Adiciona ao Firestore
    const docRef = await addDoc(collection(db, 'transactions'), newTransaction);
    return docRef.id; // Retorna o ID do novo documento
  }

  async updateTransaction(
    transactionId: string,
    updates: Partial<ITransaction>,
    currentAttachments: string[],
    newAttachments: AttachmentFile[],
    attachmentsToRemove: string[]
  ): Promise<void> {
    // 1. Deleta os anexos marcados para remoção
    if (attachmentsToRemove && attachmentsToRemove.length > 0) {
      await this.deleteAttachments(attachmentsToRemove);
    }

    // 2. Faz upload dos novos anexos
    let newAttachmentUrls: string[] = [];
  if (newAttachments && newAttachments.length > 0) {
      // Precisamos do 'userId', mas não recebemos. 
      // Idealmente, o 'updates' conteria o 'uuid' ou o 'userId' seria passado.
      // Por agora, vamos assumir que 'updates.uuid' existe ou é pego de forma estática.
      // Vamos simplificar: o 'updates' deve conter o 'uuid' do usuário.
    // O repositório precisa do userId para criar paths nos uploads
    const getUserIdFromUpdates = (u: Partial<ITransaction>): string | undefined => {
      const candidate = (u as unknown as { userId?: string; uuid?: string }).userId ?? (u as unknown as { userId?: string; uuid?: string }).uuid;
      return typeof candidate === 'string' ? candidate : undefined;
    };

    const uploaderId = getUserIdFromUpdates(updates);
    if (!uploaderId) {
      console.warn("userId do usuário não encontrado ao tentar fazer upload de novos anexos na atualização.");
    }
    if (uploaderId) {
      newAttachmentUrls = await this.uploadAttachments(uploaderId, newAttachments);
    }
    }

    // 3. Calcula a lista final de anexos
    const finalAttachments = [
      ...currentAttachments.filter(url => !attachmentsToRemove?.includes(url)),
      ...newAttachmentUrls
    ];

    // 4. Prepara o objeto de atualização
    const docRef = doc(db, 'transactions', transactionId);
    const dataToUpdate: PartialWithFieldValue<ITransaction> = {
        ...updates,
        attachments: finalAttachments,
    };

    // 5. Atualiza o documento no Firestore
    await updateDoc(docRef, dataToUpdate);
  }

  async deleteTransaction(
    transactionId: string,
    attachmentUrls: string[]
  ): Promise<void> {
    // 1. Deleta os anexos do Storage
    if (attachmentUrls && attachmentUrls.length > 0) {
      await this.deleteAttachments(attachmentUrls);
    }

    // 2. Deleta o documento do Firestore
    await deleteDoc(doc(db, 'transactions', transactionId));
  }
}