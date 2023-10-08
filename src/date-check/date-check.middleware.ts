import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class DateCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const currentDate = new Date();
    const targetDate = new Date("2024-04-01");

    if (currentDate < targetDate) {
      next(); // Proceed to the next middleware or route handler
    } else {
      // Return an error response or perform some other action
      res
        .status(403)
        .json({
          message: "Access denied: Date is not less than April 1, 2024",
        });
    }
  }
}
