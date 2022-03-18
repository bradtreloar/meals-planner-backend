import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PasswordResetToken, RefreshToken, User } from "@app/models";
import { DateTime } from "luxon";

export const PASSWORD_SALT_ROUNDS = 10;
export const ACCESS_TOKEN_EXPIRES_IN = 1800; // 15 minutes, in seconds.
export const REFRESH_TOKEN_EXPIRES_IN = 2592000; // 30 days, in seconds.
export const PASSWORD_RESET_TOKEN_EXPIRES_IN = 1800; // 15 minutes, in seconds.

export class UserNotFoundException extends Error {
  constructor() {
    super("User not found");
  }
}

export class InvalidPasswordException extends Error {
  constructor() {
    super("Invalid password");
  }
}

export class InvalidRefreshTokenException extends Error {
  constructor() {
    super("Invalid refresh token");
  }
}

export class InvalidPasswordResetTokenException extends Error {
  constructor() {
    super("Invalid password reset token");
  }
}

export class ExpiredRefreshTokenException extends Error {
  constructor() {
    super("Expired refresh token");
  }
}

export class ExpiredPasswordResetTokenException extends Error {
  constructor() {
    super("Expired password reset token");
  }
}

export const authenticatePassword = async (email: string, password: string) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user === null) {
    throw new UserNotFoundException();
  }
  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    throw new InvalidPasswordException();
  }
  return (await User.scope("public").findByPk(user.id)) as User;
};

export const generateAccessToken = (user: User) => {
  return jwt.sign(
    {
      user: {
        id: user.id,
        email: user.email,
      },
    },
    getSecret(),
    { expiresIn: `${ACCESS_TOKEN_EXPIRES_IN}s` }
  );
};

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, getSecret()) as JwtPayload;

export const generateRefreshToken = async (user: User) => {
  const { id } = await user.createRefreshToken();
  return (await RefreshToken.findByPk(id)) as RefreshToken;
};

export const authenticateRefreshToken = async (
  tokenID: string
): Promise<[RefreshToken, User]> => {
  const token = await RefreshToken.findByPk(tokenID);
  if (token === null) {
    throw new InvalidRefreshTokenException();
  }
  const tokenDate = DateTime.fromJSDate(token.createdAt);
  const tokenAge = Math.abs(tokenDate.diffNow().as("seconds"));
  if (tokenAge > REFRESH_TOKEN_EXPIRES_IN) {
    await revokeRefreshToken(token);
    throw new ExpiredRefreshTokenException();
  }
  const owner = await token.getUser();
  return [token, owner];
};

export const revokeRefreshToken = async (token: RefreshToken) => {
  await token.destroy();
};

export const hashPassword = (password: string) =>
  bcrypt.hash(password, PASSWORD_SALT_ROUNDS);

export const getSecret = () => {
  const secret = process.env.SECRET;
  if (secret === undefined) {
    throw new Error("SECRET not set in environment");
  }
  return secret;
};

export const generatePasswordResetToken = async (user: User) => {
  const token = await user.createPasswordResetToken();
  return token;
};

export const authenticatePasswordResetToken = async (
  tokenID: string
): Promise<[PasswordResetToken, User]> => {
  const token = await PasswordResetToken.findByPk(tokenID);
  if (token === null) {
    throw new InvalidPasswordResetTokenException();
  }
  const tokenDate = DateTime.fromJSDate(token.createdAt);
  const tokenAge = Math.abs(tokenDate.diffNow().as("seconds"));
  if (tokenAge > PASSWORD_RESET_TOKEN_EXPIRES_IN) {
    await revokePasswordResetToken(token);
    throw new ExpiredPasswordResetTokenException();
  }
  const owner = await token.getUser();
  return [token, owner];
};

export const revokePasswordResetToken = async (token: PasswordResetToken) => {
  await token.destroy();
};
