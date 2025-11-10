/* eslint-disable @typescript-eslint/unbound-method */
import type { ITransaction } from '@domain/entities/Transaction';
import type { AttachmentFile, NewTransactionData } from '@domain/entities/TransactionData';
import type { TransactionRepository } from '@domain/repositories/TransactionRepository';
import type { Timestamp } from 'firebase/firestore';
import {
  AddTransactionUseCase,
  DeleteTransactionUseCase,
  UpdateTransactionUseCase,
} from './TransactionUseCasesFactory';

const mockTimestamp: Timestamp = {
  toDate: () => new Date(),
  seconds: Math.floor(Date.now() / 1000),
  nanoseconds: 0,
} as Timestamp;

const mockTransactionRepository: jest.Mocked<TransactionRepository> = {
  observeTransactions: jest.fn(),
  addTransaction: jest.fn(),
  updateTransaction: jest.fn(),
  deleteTransaction: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('AddTransactionUseCase', () => {
  it('should call repository.addTransaction and return the new ID', async () => {
    const useCase = new AddTransactionUseCase(mockTransactionRepository);
    const mockUserId = 'user-123';

    const mockTransactionData: NewTransactionData = {
      tipo: 'saida',
      valor: 100,
      data: mockTimestamp,
      descricao: 'Teste',
      categoria: 'Test',
    };

    const mockAttachments: AttachmentFile[] = [];
    const expectedNewId = 'new-transaction-id-456';

    mockTransactionRepository.addTransaction.mockResolvedValue(expectedNewId);

    const result = await useCase.execute(mockUserId, mockTransactionData, mockAttachments);

    expect(result).toBe(expectedNewId);
    expect(mockTransactionRepository.addTransaction).toHaveBeenCalledTimes(1);
    expect(mockTransactionRepository.addTransaction).toHaveBeenCalledWith(
      mockUserId,
      mockTransactionData,
      mockAttachments,
    );
  });
});

describe('UpdateTransactionUseCase', () => {
  const originalConsoleError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });
  afterAll(() => {
    console.error = originalConsoleError;
  });

  it('should call repository.updateTransaction with all parameters', async () => {
    const useCase = new UpdateTransactionUseCase(mockTransactionRepository);
    const mockTxId = 'tx-789';
    const mockUserId = 'user-123';
    const mockUpdates: Partial<ITransaction> = { descricao: 'Updated Desc' };
    const mockCurrentAttachments = ['url1'];
    const mockNewAttachments: AttachmentFile[] = [];
    const mockAttachmentsToRemove = ['url1'];

    mockTransactionRepository.updateTransaction.mockResolvedValue(undefined);

    await useCase.execute(
      mockTxId,
      mockUserId,
      mockUpdates,
      mockCurrentAttachments,
      mockNewAttachments,
      mockAttachmentsToRemove,
    );

    expect(mockTransactionRepository.updateTransaction).toHaveBeenCalledTimes(1);
    expect(mockTransactionRepository.updateTransaction).toHaveBeenCalledWith(
      mockTxId,
      mockUserId,
      mockUpdates,
      mockCurrentAttachments,
      mockNewAttachments,
      mockAttachmentsToRemove,
    );
  });

  it('should throw an error if the repository throws', async () => {
    const useCase = new UpdateTransactionUseCase(mockTransactionRepository);
    const mockError = new Error('Database write failed');

    mockTransactionRepository.updateTransaction.mockRejectedValue(mockError);

    await expect(
      useCase.execute('tx-id', 'user-123', {}, [], [], []),
    ).rejects.toThrow(mockError);

    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('Erro no UpdateTransactionUseCase:'),
      mockError,
    );
  });
});

describe('DeleteTransactionUseCase', () => {
  it('should call repository.deleteTransaction with transactionId and attachmentUrls', async () => {
    const useCase = new DeleteTransactionUseCase(mockTransactionRepository);
    const mockTxId = 'tx-to-delete';
    const mockUrls = ['url1.jpg', 'url2.pdf'];

    mockTransactionRepository.deleteTransaction.mockResolvedValue(undefined);

    await useCase.execute(mockTxId, mockUrls);

    expect(mockTransactionRepository.deleteTransaction).toHaveBeenCalledTimes(1);
    expect(mockTransactionRepository.deleteTransaction).toHaveBeenCalledWith(mockTxId, mockUrls);
  });
});
