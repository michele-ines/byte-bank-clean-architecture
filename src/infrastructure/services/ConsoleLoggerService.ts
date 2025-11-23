import type { ILoggerService } from "@/shared/interfaces/log.Interfaces";
import type { LogLevel } from "firebase/firestore";


export class ConsoleLoggerService implements ILoggerService {
  log(level: LogLevel, message: string, context: object = {}): void {
    const timestamp = new Date().toISOString();
    const logEntry = { timestamp, level, message, ...context };

    switch (level) {
      case 'info':
        console.info(JSON.stringify(logEntry, null, 2));
        break;
      case 'warn':
        console.warn(JSON.stringify(logEntry, null, 2));
        break;
      case 'error':
        console.error(JSON.stringify(logEntry, null, 2));
        break;
      default:
        console.log(JSON.stringify(logEntry, null, 2));
    }
  }

  info(message: string, context?: object): void {
    this.log('info', message, context);
  }

  warn(message: string, context?: object): void {
    this.log('warn', message, context);
  }

  error(message: string, error?: Error, context: object = {}): void {
    const errorContext = {
      ...context,
      errorMessage: error?.message,
      stack: error?.stack,
    };
    this.log('error', message, errorContext);
  }
}