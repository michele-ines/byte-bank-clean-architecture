import React, { type ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { LoggerProvider } from './LoggerContext';
import { TransactionsProvider } from './TransactionsContext';

export const GlobalContextProvider = ({ children }: { children: ReactNode }): React.JSX.Element => {
  return (
 
    <LoggerProvider>
      <AuthProvider>
        <TransactionsProvider>
          {children}
        </TransactionsProvider>
      </AuthProvider>
    </LoggerProvider>
  );
};