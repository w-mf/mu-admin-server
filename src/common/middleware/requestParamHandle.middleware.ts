import { Request, Response, NextFunction } from 'express';

export function requestParamHandle(req: Request, res: Response, next: NextFunction) {
  if (req.query) {
    Object.keys(req.query).forEach((key) => {
      if (req.query[key] === '' || req.query[key] === null || typeof req.query[key] === 'undefined') {
        delete req.query[key];
      }
    });
  }
  next();
}
