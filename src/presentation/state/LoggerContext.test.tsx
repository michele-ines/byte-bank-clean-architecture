import { renderHook } from '@testing-library/react-native';
import React from 'react';
import { loggerService } from '../config/loggerService';
import { LoggerProvider, useLogger } from './LoggerContext';

jest.mock('../config/loggerService', () => ({
  loggerService: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    log: jest.fn(),
  },
}));

const mockedLoggerService = loggerService as jest.Mocked<typeof loggerService>;

describe('presentation/state/LoggerContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('deve retornar o logger service quando usado dentro do LoggerProvider', () => {
    const wrapper = ({
      children,
    }: {
      children: React.ReactNode;
    }): React.ReactElement => <LoggerProvider>{children}</LoggerProvider>;

    const { result } = renderHook(() => useLogger(), { wrapper });

    expect(result.current).toBe(mockedLoggerService);

    result.current.info('Teste de info');
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockedLoggerService.info).toHaveBeenCalledWith('Teste de info');
  });
});