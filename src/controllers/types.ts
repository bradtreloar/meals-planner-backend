import { Request, Response } from "express";

export type AsyncController = (req: Request, res: Response) => Promise<void>;

export interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}
