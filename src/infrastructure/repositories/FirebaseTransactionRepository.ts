import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    PartialWithFieldValue,
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

import { AttachmentFile, ITransaction, NewTransactionData } from '@domain/entities/Transaction';
import { TransactionRepository } from '@domain/repositories/TransactionRepository';
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
        const raw = doc.data() as Record<string, any>;
        // Normaliza o campo de usuário: se o documento tiver 'userId' mapeia para 'uuid'
        const normalized = {
          ...raw,
          uuid: raw.uuid ?? raw.userId ?? raw.user_id,
        };
        userTransactions.push({ id: doc.id, ...normalized } as ITransaction);
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
    const uploaderId = (updates as any).userId ?? (updates as any).uuid;
    if (!uploaderId) {
      console.warn("userId do usuário não encontrado ao tentar fazer upload de novos anexos na atualização.");
    }
    newAttachmentUrls = await this.uploadAttachments(uploaderId!, newAttachments);
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