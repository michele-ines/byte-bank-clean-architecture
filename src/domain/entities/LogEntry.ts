import type { LogLevel } from '@domain/interfaces/log.Interfaces';

export interface LogEntry {
  id?: string;
  timestamp: Date;
  level: LogLevel;
  message: string;
  context?: object;
  errorMessage?: string;
  stack?: string;
}