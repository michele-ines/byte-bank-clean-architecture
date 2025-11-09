import { renderHook } from '@testing-library/react-native';
import type { ReactNode } from 'react';
import React from 'react';
import { LoggerProvider, loggerService, useLogger } from './LoggerContext';

describe('LoggerContext', () => {
  it('deve prover a instância do loggerService para o hook useLogger', () => {
    const wrapper = ({
      children,
    }: {
      children: ReactNode;
    }): React.ReactElement => (
      <LoggerProvider>{children}</LoggerProvider>
    );

    const { result } = renderHook(() => useLogger(), { wrapper });

    expect(result.current).toBe(loggerService);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(result.current.info).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(result.current.warn).toBeDefined();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(result.current.error).toBeDefined();
  });

  it('deve disparar um erro se useLogger for chamado fora do LoggerProvider', () => {
    jest.spyOn(console, 'error').mockImplementation(jest.fn());

    let error: Error | null = null;
    try {
      renderHook(() => useLogger());
    } catch (e) {
      error = e as Error;
    }

    expect(error).not.toBeNull();
    expect(error?.message).toBe(
      'useLogger must be used within a LoggerProvider'
    );

    (console.error as jest.Mock).mockRestore();
  });
});