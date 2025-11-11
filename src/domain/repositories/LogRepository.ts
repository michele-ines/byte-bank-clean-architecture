import type { LogEntry } from '@domain/entities/LogEntry';

export interface ILogRepository {
  saveLog(logEntry: LogEntry): Promise<void>;
}