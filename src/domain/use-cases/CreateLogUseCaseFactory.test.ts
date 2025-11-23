import type { LogEntry } from '@domain/entities/LogEntry';
import type { ILogRepository } from '@domain/repositories/LogRepository';
import { CreateLogUseCase } from './CreateLogUseCaseFactory';

const mockLogRepository: jest.Mocked<ILogRepository> = {
  saveLog: jest.fn(),
};

const mockLogEntry: LogEntry = {
  level: 'info',
  message: 'Teste de log',
  timestamp: new Date(),
  context: { test: true },
};

describe('domain/use-cases/CreateLogUseCase', () => {
  let createLogUseCase: CreateLogUseCase;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    createLogUseCase = new CreateLogUseCase(mockLogRepository);

    consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('deve chamar logRepository.saveLog com o LogEntry correto', async () => {
    mockLogRepository.saveLog.mockResolvedValue(undefined);

    await createLogUseCase.exec(mockLogEntry);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockLogRepository.saveLog).toHaveBeenCalledTimes(1);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(mockLogEntry);
  });

  it('deve capturar e logar um erro se o repositório falhar', async () => {
    const testError = new Error('Falha no banco de dados');
    mockLogRepository.saveLog.mockRejectedValue(testError);

    await createLogUseCase.exec(mockLogEntry);

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockLogRepository.saveLog).toHaveBeenCalledTimes(1);

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Failed to save log to repository:',
      testError
    );
  });
});