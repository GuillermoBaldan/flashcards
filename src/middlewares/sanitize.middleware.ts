import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as sanitizeHtml from 'sanitize-html';

@Injectable()
export class SanitizeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.body) {
      if (req.body.front) {
        req.body.front = sanitizeHtml(req.body.front);
      }
      if (req.body.back) {
        req.body.back = sanitizeHtml(req.body.back);
      }
      if (req.body.gameOptions?.incorrectAnswers) {
        req.body.gameOptions.incorrectAnswers =
          req.body.gameOptions.incorrectAnswers.map((answer: string) =>
            sanitizeHtml(answer),
          );
      }
    }
    next();
  }
}
