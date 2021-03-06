import { Request, Response } from "express";

export type AsyncController = (req: Request, res: Response) => Promise<void>;

export interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export interface RefreshRequest extends Request {
  body: {
    refreshToken: string;
  };
}

export interface ResetPasswordRequest extends Request {
  body: {
    email: string;
  };
}
