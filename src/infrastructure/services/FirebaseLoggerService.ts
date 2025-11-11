import type { CreateLogUseCase } from '@/domain/use-cases/CreateLogUseCaseFactory';
import type { LogEntry } from '@domain/entities/LogEntry';
import type { ILoggerService, LogLevel } from '@domain/interfaces/log.Interfaces';

export class FirebaseLoggerService implements ILoggerService {
  private readonly createLogUseCase: CreateLogUseCase;

  constructor(createLogUseCase: CreateLogUseCase) {
    this.createLogUseCase = createLogUseCase;
  }

  log(level: LogLevel, message: string, context: object = {}): void {
    const logEntry: Omit<LogEntry, 'id'> = {
      level,
      message,
      context,
      timestamp: new Date(),
    };
    this.createLogUseCase.exec(logEntry as LogEntry).catch(console.error);
  }

  info(message: string, context?: object): void {
    this.log('info', message, context);
  }

  warn(message: string, context?: object): void {
    this.log('warn', message, context);
  }

  error(message: string, error?: Error, context: object = {}): void {
    const errorContext = {
      ...context,
      errorMessage: error?.message,
      stack: error?.stack,
    };

    const logEntry: Omit<LogEntry, 'id'> = {
      level: 'error',
      message,
      context: errorContext,
      timestamp: new Date(),
      errorMessage: error?.message,
      stack: error?.stack,
    };

    this.createLogUseCase.exec(logEntry as LogEntry).catch(console.error);
  }
}