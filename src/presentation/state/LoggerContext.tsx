import type { ILoggerService } from '@domain/interfaces/log.Interfaces';
import type { JSX, ReactNode } from 'react';
import React, { createContext, useContext } from 'react';
import { ConsoleLoggerService } from '../../infrastructure/services/ConsoleLoggerService';

export const loggerService: ILoggerService = new ConsoleLoggerService();

const LoggerContext = createContext<ILoggerService | undefined>(undefined);

export const LoggerProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <LoggerContext.Provider value={loggerService}>
      {children}
    </LoggerContext.Provider>
  );
};

export const useLogger = (): ILoggerService => {
  const context = useContext(LoggerContext);
  if (!context) {
    throw new Error('useLogger must be used within a LoggerProvider');
  }
  return context;
};