import {
  authenticatePassword,
  authenticateToken,
  ExpiredTokenException,
  generateAccessToken,
  generateRefreshToken,
  InvalidPasswordException,
  InvalidTokenException,
  revokeToken,
  UserNotFoundException,
} from "@app/auth";
import { AsyncController, LoginRequest, RefreshRequest } from "./types";

export const login: AsyncController = async (req: LoginRequest, res) => {
  const { email, password } = req.body;
  try {
    const user = await authenticatePassword(email, password);
    const refreshToken = await generateRefreshToken(user);
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

export const refresh: AsyncController = async (req: RefreshRequest, res) => {
  const { refreshToken: refreshTokenID } = req.body;
  try {
    const [refreshToken, user] = await authenticateToken(refreshTokenID);
    revokeToken(refreshToken);
    const newRefreshToken = await generateRefreshToken(user);
    res.status(200).json({
      accessToken: generateAccessToken(user),
      refreshToken: newRefreshToken.id,
    });
  } catch (error) {
    if (
      error instanceof ExpiredTokenException ||
      error instanceof InvalidTokenException
    ) {
      res.status(401).json({
        error: "Invalid token",
      });
    }
  }
};
