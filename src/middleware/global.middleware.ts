import { Request, Response, NextFunction } from 'express';
import { json } from 'stream/consumers';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request...`, req.body);
  next();
};
