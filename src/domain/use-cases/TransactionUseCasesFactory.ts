import type { ITransaction } from '@domain/entities/Transaction';
import type { AttachmentFile, NewTransactionData } from '@domain/entities/TransactionData';
import type { TransactionRepository } from '@domain/repositories/TransactionRepository';
import { BaseUseCase } from './BaseUseCase';

export class ObserveTransactionsUseCase {
  constructor(private transactionRepository: TransactionRepository) {}

  execute(userId: string, presentationCallback: (transactions: ITransaction[]) => void): () => void {
    
    const repositoryCallback = (transactionsFromRepo: ITransaction[]): void => {
        presentationCallback(transactionsFromRepo);
    };

    return this.transactionRepository.observeTransactions(userId, repositoryCallback);
  }
}

export class AddTransactionUseCase extends BaseUseCase {
  constructor(private transactionRepository: TransactionRepository) {
    super();
  }

  async execute(
    userId: string,
    transactionData: NewTransactionData,
    attachments: AttachmentFile[]
  ): Promise<string> {
    return this._tryExecute(async () => {
      return await this.transactionRepository.addTransaction(
        userId,
        transactionData,
        attachments
      );
    });
  }
}

export class UpdateTransactionUseCase extends BaseUseCase {
  constructor(private transactionRepository: TransactionRepository) {
    super();
  }

  async execute(
    transactionId: string,
    userId: string,
    updates: Partial<ITransaction>,
    currentAttachments: string[],
    newAttachments: AttachmentFile[],
    attachmentsToRemove: string[]
  ): Promise<void> {
    return this._tryExecute(async () => {
      await this.transactionRepository.updateTransaction(
        transactionId,
        userId,
        updates,
        currentAttachments,
        newAttachments,
        attachmentsToRemove
      );
    });
  }
}

export class DeleteTransactionUseCase extends BaseUseCase {
  constructor(private transactionRepository: TransactionRepository) {
    super();
  }

  async execute(transactionId: string, attachmentUrls: string[]): Promise<void> {
    return this._tryExecute(async () => {
      await this.transactionRepository.deleteTransaction(transactionId, attachmentUrls);
    });
  }
}

export class TransactionUseCasesFactory {
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