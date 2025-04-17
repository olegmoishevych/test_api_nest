import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      const log = `[${req.method}] ${req.originalUrl} ${res.statusCode} - ${duration}ms`;

      console.log(log);
    });

    next();
  }
}
