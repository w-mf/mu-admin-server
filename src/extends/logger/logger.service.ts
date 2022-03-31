import 'winston-daily-rotate-file';
import { LoggerService, Injectable } from '@nestjs/common';
import { Logform, Logger, createLogger, format, LoggerOptions, transports } from 'winston';
import { ConfigService } from '@nestjs/config';
import { DailyRotateFile } from 'winston/lib/winston/transports';

@Injectable()
export class WinstonService implements LoggerService {
  private readonly instance: Logger;
  constructor(private readonly configService: ConfigService) {
    this.instance = createLogger(this.initOptions());
  }

  // 格式化输出样式
  private format(info: Logform.TransformableInfo): string {
    const env = this.configService.get('env');
    const message = info.message;
    const timestamp = info.timestamp;
    const level = info.level.toLocaleUpperCase();
    return `${timestamp} [${env}] ${level}: ${message}`;
  }
  initOptions(): LoggerOptions {
    let consoleLogger: any = new transports.Console({
      level: 'log',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf((message) => this.format(message)),
        format.colorize({ all: true }),
      ),
    });
    let stdoutLogger: any = new transports.Console({
      level: 'info',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf((message) => this.format(message)),
        format.colorize({ all: true }),
      ),
    });

    let stderrLogger: any = new transports.Console({
      level: 'error',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf((message) => this.format(message)),
        format.colorize({ all: true }),
      ),
    });
    if (this.configService.get('env') === 'prod') {
      const dirname = 'logs';
      consoleLogger = new DailyRotateFile({
        dirname,
        level: 'log',
        filename: '%DATE%-log.log',
        datePattern: `YYYY-MM-DD-HH`,
        zippedArchive: true,
        format: format.combine(
          format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          format.printf((message) => this.format(message)),
        ),
      });
      stdoutLogger = new DailyRotateFile({
        dirname,
        level: 'info',
        filename: '%DATE%-info.log',
        datePattern: `YYYY-MM-DD-HH`,
        zippedArchive: true,
        format: format.combine(
          format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          format.printf((message) => this.format(message)),
        ),
      });

      stderrLogger = new DailyRotateFile({
        dirname,
        level: 'error',
        filename: '%DATE%-error.log',
        datePattern: `YYYY-MM-DD-HH`,
        zippedArchive: true,
        format: format.combine(
          format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          format.printf((message) => this.format(message)),
        ),
      });
    }

    return {
      exitOnError: false,
      handleExceptions: true,
      exceptionHandlers: stderrLogger,
      transports: [consoleLogger, stdoutLogger, stderrLogger],
    };
  }

  log(trace: string, meta?: any) {
    const data = meta ? { trace, meta, type: 'LOG' } : trace;
    this.instance.info(JSON.stringify(data));
  }
  info(trace: string, meta?: any) {
    const data = meta ? { trace, meta, type: 'INFO' } : trace;
    this.instance.info(JSON.stringify(data));
  }
  error(error: Error, trace: string, meta?: any) {
    const exception = {
      error: error.message,
      stack: error.stack,
      name: error.name,
      type: 'ERROR',
      trace,
    };

    const data = meta ? { meta, ...exception } : exception;
    this.instance.error(JSON.stringify(data));
  }

  warn(trace: string, meta?: any) {
    const data = meta ? { trace, meta, type: 'WARN' } : trace;
    this.instance.warn(JSON.stringify(data));
  }
  http(trace: string, meta?: any) {
    const data = meta ? { trace, meta, type: 'HTTP' } : trace;
    this.instance.warn(JSON.stringify(data));
  }

  debug(trace: string) {
    console.log('debug', trace);
  }

  verbose(trace: string) {
    console.log('verbose', trace);
  }
}
