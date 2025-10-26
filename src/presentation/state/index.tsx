import React, { ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { TransactionsProvider } from './TransactionsContext';

export const GlobalContextProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  return (
    <AuthProvider>
      <TransactionsProvider>
        {children}
      </TransactionsProvider>
    </AuthProvider>
  );
};