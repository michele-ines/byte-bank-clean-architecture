import { AttachmentFile, ITransaction, NewTransactionData } from '../entities/Transaction';

export interface TransactionRepository {

  /**
   * Observa as transações de um usuário em tempo real.
   * @param userId O ID do usuário.
   * @param callback A função a ser chamada com a lista de transações.
   * @returns Uma função para cancelar a inscrição (unsubscribe).
   */
  observeTransactions(
    userId: string, 
    callback: (transactions: ITransaction[]) => void
  ): () => void;

  /**
   * Adiciona uma nova transação.
   * @param userId O ID do usuário dono da transação.
   * @param transactionData Os dados da transação.
   * @param attachments Os arquivos de anexo.
   * @returns O ID da nova transação criada.
   */
  addTransaction(
    userId: string,
    transactionData: NewTransactionData,
    attachments: AttachmentFile[]
  ): Promise<string>;

  /**
   * Atualiza uma transação existente.
   */
  updateTransaction(
    transactionId: string,
    updates: Partial<ITransaction>, // Dados a atualizar
    currentAttachments: string[], // Lista de URLs de anexos atuais
    newAttachments: AttachmentFile[], // Novos arquivos
    attachmentsToRemove: string[] // URLs a remover
  ): Promise<void>;

   /**
   * Deleta uma transação.
   */
  deleteTransaction(
    transactionId: string,
    attachmentUrls: string[] // URLs dos anexos para deletar do Storage
  ): Promise<void>;
}