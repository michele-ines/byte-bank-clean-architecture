import type { LogEntry } from '@domain/entities/LogEntry';
import type { ILogRepository } from '@domain/repositories/LogRepository';

export class CreateLogUseCase {
  private readonly logRepository: ILogRepository;

  constructor(logRepository: ILogRepository) {
    this.logRepository = logRepository;
  }

  public async exec(logEntry: LogEntry): Promise<void> {
    try {
      await this.logRepository.saveLog(logEntry);
    } catch (error) {
      console.error('Failed to save log to repository:', error);
    }
  }
}