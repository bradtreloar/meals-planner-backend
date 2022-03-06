import {
  authenticatePassword,
  generateAccessToken,
  InvalidPasswordException,
  UserNotFoundException,
} from "@app/auth";
import { Request } from "express";
import { Controller } from "./types";

export interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export const login: Controller = async (req: LoginRequest, res) => {
  const { email, password } = req.body;
  try {
    const user = await authenticatePassword(email, password);
    res.status(200).json({
      user: user.toJSON(),
      accessToken: generateAccessToken(user),
    });
  } catch (error) {
    if (
      error instanceof UserNotFoundException ||
      error instanceof InvalidPasswordException
    ) {
      res.status(401).json({
        error: "Invalid email or password",
      });
    }
  }
};
