/* eslint-disable @typescript-eslint/unbound-method */
import type { ITransaction } from '@domain/entities/Transaction';
import type { AttachmentFile, NewTransactionData } from '@domain/entities/TransactionData';
import type { TransactionRepository } from '@domain/repositories/TransactionRepository';
import {
  AddTransactionUseCase,
  DeleteTransactionUseCase,
  UpdateTransactionUseCase
} from './TransactionUseCasesFactory';

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
      type: 'expense',
      amount: 100,
      date: new Date(),
      description: 'Teste',
      category: 'Test',
    };
    const mockAttachments: AttachmentFile[] = [];
    const expectedNewId = 'new-transaction-id-456';

    mockTransactionRepository.addTransaction.mockResolvedValue(expectedNewId);

    // ACT (Execução)
    const result = await useCase.execute(mockUserId, mockTransactionData, mockAttachments);

    expect(result).toBe(expectedNewId); 
    expect(mockTransactionRepository.addTransaction).toHaveBeenCalledTimes(1);
    expect(mockTransactionRepository.addTransaction).toHaveBeenCalledWith(
      mockUserId,
      mockTransactionData,
      mockAttachments
    );
  });
});


describe('UpdateTransactionUseCase', () => {
  
  it('should call repository.updateTransaction with all parameters', async () => {
    // ARRANGE
    const useCase = new UpdateTransactionUseCase(mockTransactionRepository);
    const mockTxId = 'tx-789';
    const mockUpdates: Partial<ITransaction> = { description: 'Updated Desc' };
    const mockCurrentAttachments = ['url1'];
    const mockNewAttachments: AttachmentFile[] = [];
    const mockAttachmentsToRemove = ['url1'];
    
    mockTransactionRepository.updateTransaction.mockResolvedValue(undefined);

    await useCase.execute(
        mockTxId, 
        mockUpdates, 
        mockCurrentAttachments, 
        mockNewAttachments, 
        mockAttachmentsToRemove
    );

    expect(mockTransactionRepository.updateTransaction).toHaveBeenCalledTimes(1); 
    expect(mockTransactionRepository.updateTransaction).toHaveBeenCalledWith( 
        mockTxId,
        mockUpdates,
        mockCurrentAttachments,
        mockNewAttachments,
        mockAttachmentsToRemove,
        undefined
    );
  });

  it('should throw an error if the repository throws', async () => {
    // ARRANGE
    const useCase = new UpdateTransactionUseCase(mockTransactionRepository);
    const mockError = new Error('Database write failed');

    mockTransactionRepository.updateTransaction.mockRejectedValue(mockError);


    await expect(
      useCase.execute('tx-id', {}, [], [], [])
    ).rejects.toThrow(mockError);
  });
});


describe('DeleteTransactionUseCase', () => {

  it('should call repository.deleteTransaction with transactionId and attachmentUrls', async () => {
    // ARRANGE
    const useCase = new DeleteTransactionUseCase(mockTransactionRepository);
    const mockTxId = 'tx-to-delete';
    const mockUrls = ['url1.jpg', 'url2.pdf'];

    mockTransactionRepository.deleteTransaction.mockResolvedValue(undefined);

    await useCase.execute(mockTxId, mockUrls);

    expect(mockTransactionRepository.deleteTransaction).toHaveBeenCalledTimes(1);
    expect(mockTransactionRepository.deleteTransaction).toHaveBeenCalledWith( 
      mockTxId, 
      mockUrls
    );
  });
});