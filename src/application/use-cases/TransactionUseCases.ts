// src/application/usecases/TransactionUseCases.ts
import type { AttachmentFile, ITransaction, NewTransactionData } from '@domain/entities/Transaction';
import type { TransactionRepository } from '@domain/repositories/TransactionRepository';

// --- Caso de Uso para Observar Transações ---
export class ObserveTransactionsUseCase {
  constructor(private transactionRepository: TransactionRepository) {}

  execute(userId: string, callback: (transactions: ITransaction[]) => void): () => void {
    return this.transactionRepository.observeTransactions(userId, callback);
  }
}

// --- Caso de Uso para Adicionar Transação ---
export class AddTransactionUseCase {
  constructor(private transactionRepository: TransactionRepository) {}

  async execute(
    userId: string,
    transactionData: NewTransactionData,
    attachments: AttachmentFile[]
  ): Promise<string> {
    // Aqui poderia ter lógica de negócio, ex: verificar limite, etc.
    try {
      return await this.transactionRepository.addTransaction(
        userId,
        transactionData,
        attachments
      );
    } catch (error) {
      console.error("Erro no AddTransactionUseCase:", error);
      throw error;
    }
  }
}

// --- Caso de Uso para Atualizar Transação ---
export class UpdateTransactionUseCase {
  constructor(private transactionRepository: TransactionRepository) {}

  async execute(
    transactionId: string,
    updates: Partial<ITransaction>,
    currentAttachments: string[],
    newAttachments: AttachmentFile[],
    attachmentsToRemove: string[]
  ): Promise<void> {
    try {
      await this.transactionRepository.updateTransaction(
        transactionId,
        updates,
        currentAttachments,
        newAttachments,
        attachmentsToRemove
      );
    } catch (error) {
      console.error("Erro no UpdateTransactionUseCase:", error);
      throw error;
    }
  }
}

// --- Caso de Uso para Deletar Transação ---
export class DeleteTransactionUseCase {
  constructor(private transactionRepository: TransactionRepository) {}

  async execute(transactionId: string, attachmentUrls: string[]): Promise<void> {
    try {
      await this.transactionRepository.deleteTransaction(transactionId, attachmentUrls);
    } catch (error) {
      console.error("Erro no DeleteTransactionUseCase:", error);
      throw error;
    }
  }
}

// --- Agregador de Casos de Uso (opcional, mas útil) ---
export class TransactionUseCases {
  observe: ObserveTransactionsUseCase;
  add: AddTransactionUseCase;
  update: UpdateTransactionUseCase;
  delete: DeleteTransactionUseCase;

  constructor(repository: TransactionRepository) {
    this.observe = new ObserveTransactionsUseCase(repository);
    this.add = new AddTransactionUseCase(repository);
    this.update = new UpdateTransactionUseCase(repository);
    this.delete = new DeleteTransactionUseCase(repository);
  }
}