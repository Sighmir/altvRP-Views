export enum LogLevel {
  ERROR,
  WARN,
  INFO,
  DEBUG,
}

export interface Logger {
  debug: (...text: any[]) => void;
  info: (...text: any[]) => void;
  warn: (...text: any[]) => void;
  error: (...text: any[]) => void;
}

export const getLogger = (name: string, level: LogLevel = LogLevel.DEBUG): Logger => {
  const log = (text: any[], logLevel: LogLevel) => {
    if (level >= logLevel) {
      console.log(`[${LogLevel[logLevel]}] [${name}]`, ...text);
    }
  };
  return {
    debug: (...text: any[]) => log(text, LogLevel.DEBUG),
    info: (...text: any[]) => log(text, LogLevel.INFO),
    warn: (...text: any[]) => log(text, LogLevel.WARN),
    error: (...text: any[]) => log(text, LogLevel.ERROR),
  };
};
