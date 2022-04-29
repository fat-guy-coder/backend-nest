import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

//express 中间件
@Injectable()
export class MiddlewareService implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req.url, 'Request...');
    next();
  }
}
