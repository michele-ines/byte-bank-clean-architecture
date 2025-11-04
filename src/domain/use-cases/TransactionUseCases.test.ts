/* eslint-disable @typescript-eslint/unbound-method */
import type { ITransaction } from '@domain/entities/Transaction';
import type { AttachmentFile, NewTransactionData } from '@domain/entities/TransactionData';
import type { TransactionRepository } from '@domain/repositories/TransactionRepository';
import {
  AddTransactionUseCase,
  DeleteTransactionUseCase,
  UpdateTransactionUseCase
} from './TransactionUseCasesFactory';

// 1. MOCK (Simulação) DO REPOSITÓRIO
// Criamos um objeto 'fake' que implementa a interface do TransactionRepository
// Usamos jest.Mocked para ter tipagem completa
const mockTransactionRepository: jest.Mocked<TransactionRepository> = {
  // Mockamos apenas as funções que vamos testar
  observeTransactions: jest.fn(),
  addTransaction: jest.fn(),
  updateTransaction: jest.fn(),
  deleteTransaction: jest.fn(),
};

// 2. CONFIGURAÇÃO DOS TESTES
// Limpa os mocks antes de cada teste para que um teste não interfira no outro
beforeEach(() => {
  jest.clearAllMocks();
});


// 3. SUÍTE DE TESTES PARA OS USE CASES DE TRANSAÇÃO

// --- Teste para AddTransactionUseCase ---
describe('AddTransactionUseCase', () => {
  
  // Teste sugerido: "deve propagar o ID retornado."
  it('should call repository.addTransaction and return the new ID', async () => {
    // ARRANGE (Preparação)
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

    // Configuramos o mock para retornar o ID esperado quando for chamado
    mockTransactionRepository.addTransaction.mockResolvedValue(expectedNewId);

    // ACT (Execução)
    const result = await useCase.execute(mockUserId, mockTransactionData, mockAttachments);

    // ASSERT (Verificação)
    expect(result).toBe(expectedNewId); // 1. Verifica se propagou o ID (sugestão do PR)
    expect(mockTransactionRepository.addTransaction).toHaveBeenCalledTimes(1); // 2. Garante que o repo foi chamado
    expect(mockTransactionRepository.addTransaction).toHaveBeenCalledWith( // 3. Garante que foi chamado com os dados corretos
      mockUserId,
      mockTransactionData,
      mockAttachments
    );
  });
});


// --- Teste para UpdateTransactionUseCase ---
describe('UpdateTransactionUseCase', () => {
  
  // Teste sugerido: "deve confirmar execução"
  it('should call repository.updateTransaction with all parameters', async () => {
    // ARRANGE
    const useCase = new UpdateTransactionUseCase(mockTransactionRepository);
    const mockTxId = 'tx-789';
    const mockUpdates: Partial<ITransaction> = { description: 'Updated Desc' };
    const mockCurrentAttachments = ['url1'];
    const mockNewAttachments: AttachmentFile[] = [];
    const mockAttachmentsToRemove = ['url1'];
    
    // Configuramos o mock para resolver com sucesso (void)
    mockTransactionRepository.updateTransaction.mockResolvedValue(undefined);

    // ACT
    await useCase.execute(
        mockTxId, 
        mockUpdates, 
        mockCurrentAttachments, 
        mockNewAttachments, 
        mockAttachmentsToRemove
    );

    // ASSERT
    expect(mockTransactionRepository.updateTransaction).toHaveBeenCalledTimes(1); // 1. Confirma execução
    expect(mockTransactionRepository.updateTransaction).toHaveBeenCalledWith( // 2. Confirma os parâmetros
        mockTxId,
        mockUpdates,
        mockCurrentAttachments,
        mockNewAttachments,
        mockAttachmentsToRemove
    );
  });

  // Teste sugerido: "lançar erro corretamente" (Validando nosso BaseUseCase!)
  it('should throw an error if the repository throws', async () => {
    // ARRANGE
    const useCase = new UpdateTransactionUseCase(mockTransactionRepository);
    const mockError = new Error('Database write failed');

    // Configuramos o mock para REJEITAR com um erro
    mockTransactionRepository.updateTransaction.mockRejectedValue(mockError);

    // ACT & ASSERT
    // Verificamos se a execução do UseCase rejeita a Promise com o mesmo erro
    await expect(
      useCase.execute('tx-id', {}, [], [], [])
    ).rejects.toThrow(mockError);
  });
});


// --- Teste para DeleteTransactionUseCase ---
describe('DeleteTransactionUseCase', () => {

  // Teste sugerido: "deve garantir que attachments são removidos."
  it('should call repository.deleteTransaction with transactionId and attachmentUrls', async () => {
    // ARRANGE
    const useCase = new DeleteTransactionUseCase(mockTransactionRepository);
    const mockTxId = 'tx-to-delete';
    const mockUrls = ['url1.jpg', 'url2.pdf'];

    // Configuramos o mock para resolver com sucesso (void)
    mockTransactionRepository.deleteTransaction.mockResolvedValue(undefined);

    // ACT
    await useCase.execute(mockTxId, mockUrls);

    // ASSERT
    expect(mockTransactionRepository.deleteTransaction).toHaveBeenCalledTimes(1);
    expect(mockTransactionRepository.deleteTransaction).toHaveBeenCalledWith( // 1. Garante que as URLs foram passadas
      mockTxId, 
      mockUrls
    );
  });
});