import { CreateLogUseCase } from '@/domain/use-cases/CreateLogUseCaseFactory';
import type { ILoggerService } from '@/shared/interfaces/log.Interfaces';
import { db } from '@infrastructure/config/firebaseConfig';
import { FirebaseLogRepository } from '@infrastructure/repositories/FirebaseLogRepository';
import { ConsoleLoggerService } from '@infrastructure/services/ConsoleLoggerService';
import { FirebaseLoggerService } from '@infrastructure/services/FirebaseLoggerService';

export const loggerService: ILoggerService = (() => {
  try {
    const logRepository = new FirebaseLogRepository(db);
    const createLogUseCase = new CreateLogUseCase(logRepository);
    return new FirebaseLoggerService(createLogUseCase);
  } catch (error) {
    console.error('Failed to initialize FirebaseLoggerService:', error);
    return new ConsoleLoggerService();
  }
})();