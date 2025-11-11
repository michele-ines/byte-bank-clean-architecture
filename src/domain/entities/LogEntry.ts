import type { LogLevel } from '@/shared/interfaces/log.Interfaces';

export interface LogEntry {
  id?: string;
  timestamp: Date;
  level: LogLevel;
  message: string;
  context?: object;
  errorMessage?: string;
  stack?: string;
}