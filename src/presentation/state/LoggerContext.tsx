import type { ILoggerService, LoggerContextType } from '@/shared/interfaces/log.Interfaces';
import React, { createContext, useContext } from 'react';
import { loggerService } from '../config/loggerService';



const LoggerContext = createContext<LoggerContextType | null>(null);

export const LoggerProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <LoggerContext.Provider value={{ logger: loggerService }}>
      {children}
    </LoggerContext.Provider>
  );
};

export const useLogger = (): ILoggerService => {
  const context = useContext(LoggerContext);
  if (!context) {
    throw new Error('useLogger deve ser usado dentro de um LoggerProvider');
  }
  return context.logger;
};