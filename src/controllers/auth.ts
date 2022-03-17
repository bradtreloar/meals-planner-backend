import {
  authenticatePassword,
  generateAccessToken,
  InvalidPasswordException,
  UserNotFoundException,
} from "@app/auth";
import { AsyncController, LoginRequest } from "./types";

export const login: AsyncController = async (req: LoginRequest, res) => {
  const { email, password } = req.body;
  try {
    const user = await authenticatePassword(email, password);
    const refreshToken = await user.createRefreshToken();
    res.status(200).json({
      user: user.toJSON(),
      accessToken: generateAccessToken(user),
      refreshToken: refreshToken.id,
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
