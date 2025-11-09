export type LogLevel = 'info' | 'warn' | 'error';

export interface ILoggerService {
  log(level: LogLevel, message: string, context?: object): void;
  info(message: string, context?: object): void;
  warn(message: string, context?: object): void;
  error(message: string, error?: Error, context?: object): void;
}