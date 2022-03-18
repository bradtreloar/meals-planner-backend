import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Token, User } from "@app/models";
import { DateTime } from "luxon";

export const PASSWORD_SALT_ROUNDS = 10;
export const ACCESS_TOKEN_AGE = 1800; // 15 minutes, in seconds.
export const REFRESH_TOKEN_AGE = 2592000; // 30 days, in seconds.
export const PASSWORD_RESET_TOKEN_AGE = 1800; // 15 minutes, in seconds.

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

export class InvalidTokenException extends Error {
  constructor() {
    super("Invalid token");
  }
}

export class ExpiredTokenException extends Error {
  constructor() {
    super("Expired token");
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
    { expiresIn: `${ACCESS_TOKEN_AGE}s` }
  );
};

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, getSecret()) as JwtPayload;

export const generateRefreshToken = async (user: User) => {
  return await Token.create({
    userID: user.id,
    expiresAt: DateTime.utc().plus({ seconds: REFRESH_TOKEN_AGE }).toJSDate(),
  });
};

export const generatePasswordResetToken = async (user: User) => {
  return await Token.create({
    userID: user.id,
    expiresAt: DateTime.utc()
      .plus({ seconds: PASSWORD_RESET_TOKEN_AGE })
      .toJSDate(),
  });
};

export const authenticateToken = async (
  tokenID: string
): Promise<[Token, User]> => {
  const token = await Token.findByPk(tokenID);
  if (token === null) {
    throw new InvalidTokenException();
  }
  const expiresAt = DateTime.fromJSDate(token.expiresAt);
  if (expiresAt.diffNow().toMillis() < 0) {
    await revokeToken(token);
    throw new ExpiredTokenException();
  }
  const owner = await token.getUser();
  return [token, owner];
};

export const revokeToken = async (token: Token) => {
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
