import type { ITransaction } from '@domain/entities/Transaction';
import type { NewTransactionData } from '@domain/entities/TransactionData';
import type { DocumentData, PartialWithFieldValue } from 'firebase/firestore';
import { serverTimestamp, Timestamp } from 'firebase/firestore';

const isTimestamp = (value: unknown): value is Timestamp => {
    return value instanceof Timestamp;
};

const safeGet = <T>(
  raw: DocumentData, 
  key: string, 
  check: (val: unknown) => val is T, 
  defaultValue: T
): T => {
    const value = raw[key] as unknown; 
    
    return check(value) ? value : defaultValue;
};


export const mapDocumentToTransaction = (id: string, raw: DocumentData): ITransaction => {
    
    const uuid = safeGet(raw, 'uuid', (v): v is string => typeof v === 'string', '');
    const descricao = safeGet(raw, 'descricao', (v): v is string => typeof v === 'string', '');
    const valor = safeGet(raw, 'valor', (v): v is number => typeof v === 'number', 0);
    const tipo = safeGet(raw, 'tipo', (v): v is 'entrada' | 'saida' => v === 'entrada' || v === 'saida', 'saida');
    const categoria = safeGet(raw, 'categoria', (v): v is string => typeof v === 'string', '');
    const data = safeGet(raw, 'data', isTimestamp, Timestamp.now());
    const createdAt = safeGet(raw, 'createdAt', isTimestamp, Timestamp.now());
    const attachments = safeGet(raw, 'attachments', (v): v is string[] => Array.isArray(v), []);

    return {
        id,
        uuid,
        descricao,
        valor,
        tipo,
        categoria,
        data,
        createdAt,
        attachments,
    };
};

export const mapNewTransactionToDocument = (
  uuid: string,
  transactionData: NewTransactionData,
  attachmentUrls: string[]
): Record<string, unknown> => {
  return {
    ...transactionData,
    uuid: uuid, 
    createdAt: serverTimestamp(),
    attachments: attachmentUrls,
  };
};

export const mapUpdateTransactionToDocument = (
    updates: Partial<ITransaction>,
    finalAttachments: string[]
): PartialWithFieldValue<ITransaction> => {
     return {
        ...updates,
        attachments: finalAttachments,
     };
};