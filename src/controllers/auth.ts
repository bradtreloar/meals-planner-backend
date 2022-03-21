import {
  authenticatePassword,
  authenticateToken,
  ExpiredTokenException,
  generateAccessToken,
  generatePasswordResetToken,
  generateRefreshToken,
  InvalidPasswordException,
  InvalidTokenException,
  revokeToken,
  UserNotFoundException,
} from "@app/auth";
import { renderPasswordResetMessage, sendMail } from "@app/mail";
import { User } from "@app/models";
import {
  AsyncController,
  LoginRequest,
  RefreshRequest,
  ResetPasswordRequest,
} from "./types";

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

export const resetPassword: AsyncController = async (
  req: ResetPasswordRequest,
  res
) => {
  const { email } = req.body;
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user !== null) {
    const token = await generatePasswordResetToken(user);
    const url = `mealsplanner://reset-password/${token}`;
    await sendMail(
      user,
      "Reset your password",
      renderPasswordResetMessage({
        url,
      })
    );
    res.status(204);
  } else {
    res.status(422).json({
      error: "No user with this email address",
    });
  }
};
