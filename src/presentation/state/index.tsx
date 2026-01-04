import React, { type ReactNode } from 'react';
import { AuthProvider } from './AuthContext';
import { LoggerProvider } from './LoggerContext';

export const GlobalContextProvider = ({ children }: { children: ReactNode }): React.JSX.Element => {
  return (
    <LoggerProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </LoggerProvider>
  );
};