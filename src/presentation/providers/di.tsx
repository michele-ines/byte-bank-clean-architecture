import { CreateLogUseCase } from '@/domain/use-cases/CreateLogUseCaseFactory';
import type { DI } from '@/shared/ProfileStyles/profile.styles.types';
import type { ILoggerService } from '@/shared/interfaces/log.Interfaces';
import { db } from '@infrastructure/config/firebaseConfig';
import { FirebaseLogRepository } from '@infrastructure/repositories/FirebaseLogRepository';
import { ConsoleLoggerService } from '@infrastructure/services/ConsoleLoggerService';
import { FirebaseLoggerService } from '@infrastructure/services/FirebaseLoggerService';
import React, { createContext, useContext, useMemo } from 'react';

const DIContext = createContext<DI | null>(null);

export const DIProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const value = useMemo<DI>(() => {
    const logger: ILoggerService = (() => {
      try {
        const logRepository = new FirebaseLogRepository(db);
        const createLogUseCase = new CreateLogUseCase(logRepository);
        return new FirebaseLoggerService(createLogUseCase);
      } catch (error) {
        console.error('Failed to initialize FirebaseLoggerService:', error);
        return new ConsoleLoggerService();
      }
    })();

    return {
      logger,
      createTransaction: {
        exec: (_tx: unknown) => {
          logger.info('Executing createTransaction');
          return Promise.resolve();
        },
      },
      listUserTransactions: {
        exec: (_userId: string) => {
          logger.info('Executing listUserTransactions');
          return () => undefined;
        },
      },
    };
  }, []);

  return <DIContext.Provider value={value}>{children}</DIContext.Provider>;
};

export const useDI = (): DI => {
  const ctx = useContext(DIContext);
  if (!ctx) throw new Error('useDI deve ser usado dentro de DIProvider');
  return ctx;
};